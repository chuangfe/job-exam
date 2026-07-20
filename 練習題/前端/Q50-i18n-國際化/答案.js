/*
【答案】手寫 mini i18n 函式（國際化核心機制）

重點：i18n 核心 = 「訊息查找 + 內插 + 複數 + locale 感知格式化」。
本題把這四件事濃縮成 createI18n，實務上 next-intl / react-i18next 都建立在同一組概念上。

── 核心機制拆解 ──
1. 訊息查找（message lookup）
   - 訊息用巢狀物件組織，t('user.greeting') 以點號路徑鑽入。
   - 找不到就 fallback 回 key 本身，方便開發時看出漏翻譯。
2. 內插（interpolation）
   - {name} 佔位符 → 用 params 對應值取代。
3. 複數（pluralization）
   - 不同語言的複數規則不同（en 有 one/other；zh 只有 other；ru/pl 有 few/many）。
   - 用 Intl.PluralRules(locale).select(count) 取得分支名，再取對應訊息。
4. locale 感知格式化
   - 數字、日期、貨幣交給 Intl.NumberFormat / Intl.DateTimeFormat，
     它們內建各地慣例（千分位、日期順序、貨幣符號）。

── 對照 next-intl / react-i18next 的實務做法 ──
・訊息組織 / 命名空間（namespace）
   - 大型專案把訊息依「頁面 / 功能」拆成 namespace（如 common、checkout、profile），
     避免單一巨大 JSON。react-i18next 用 useTranslation('checkout')；
     next-intl 用 useTranslations('Checkout') 取得帶前綴的 t。
・Lazy load（按需載入）
   - 只載入目前 locale + 目前用到的 namespace，減少 bundle。
     react-i18next 常搭配 i18next-http-backend 動態抓 JSON；
     next-intl 在 Server Component 端依 locale 載入對應 messages。
・Locale routing（語系路由）
   - next-intl 走 App Router 的 [locale] 動態區段（/en/..., /zh/...），
     用 middleware 依 Accept-Language / cookie 導向，並產生 hreflang。
・ICU MessageFormat
   - 業界標準訊息語法，支援 plural / select / 巢狀與數字日期格式：
     '{count, plural, one {# item} other {# items}}'
     '{gender, select, male {他} female {她} other {它}}'
   - next-intl 原生用 ICU；react-i18next 可透過 i18next-icu 外掛支援。
   - 本題用「訊息物件 { one, other } + Intl.PluralRules」是同概念的簡化版。
・RTL（由右至左）
   - ar、he 等語系需要 dir="rtl"。實務上依 locale 設 <html dir> 與
     CSS 邏輯屬性（margin-inline-start 取代 margin-left）、Intl.Locale 的
     textInfo.direction 判斷方向。
・其他：翻譯缺漏偵測（missing key handler）、複數/性別、命名空間 fallback 鏈、
   伺服器端 vs 客戶端 hydration 一致性，都是正式函式庫額外處理的細節。
*/

// createI18n：回傳 { t, setLocale, n, d }
function createI18n({ locale, messages }) {
  let current = locale;

  // 依點號路徑鑽入巢狀物件；取不到回傳 undefined
  const resolve = (obj, key) =>
    key.split(".").reduce((acc, part) => (acc == null ? acc : acc[part]), obj);

  // {placeholder} 內插
  const interpolate = (str, params = {}) =>
    str.replace(/\{(\w+)\}/g, (match, name) =>
      Object.prototype.hasOwnProperty.call(params, name) ? String(params[name]) : match
    );

  function t(key, params = {}) {
    let value = resolve(messages[current], key);

    // 找不到 → fallback 回 key 本身
    if (value == null) return key;

    // 複數：value 是物件且有 count → 用 Intl.PluralRules 選分支
    if (typeof value === "object") {
      if (params.count != null) {
        const category = new Intl.PluralRules(current).select(params.count);
        // 選到的分支若不存在，退回 other
        value = value[category] != null ? value[category] : value.other;
      }
      // 仍非字串（例如沒有 count 卻指到物件節點）→ fallback
      if (typeof value !== "string") return key;
    }

    return interpolate(value, params);
  }

  function setLocale(next) {
    current = next;
  }

  // locale 感知的數字 / 日期格式化
  const n = (value, options) => new Intl.NumberFormat(current, options).format(value);
  const d = (value, options) => new Intl.DateTimeFormat(current, options).format(value);

  return { t, setLocale, n, d };
}

// ===== 測試 =====
const assert = require("node:assert");

const messages = {
  en: {
    hello: "Hello, {name}!",
    user: { greeting: "Welcome back, {name}" },
    cart: { items: { one: "{count} item", other: "{count} items" } },
  },
  zh: {
    hello: "哈囉，{name}！",
    user: { greeting: "歡迎回來，{name}" },
    cart: { items: { other: "{count} 件商品" } },
  },
};

const i18n = createI18n({ locale: "en", messages });

// 1) 基本內插
assert.strictEqual(i18n.t("hello", { name: "Amy" }), "Hello, Amy!");

// 2) 巢狀 key
assert.strictEqual(i18n.t("user.greeting", { name: "Amy" }), "Welcome back, Amy");

// 3) 缺 key fallback（回傳 key 本身）
assert.strictEqual(i18n.t("missing.key"), "missing.key");
assert.strictEqual(i18n.t("user.nope"), "user.nope");

// 4) en 複數：one / other 選擇正確，且 {count} 有內插
assert.strictEqual(i18n.t("cart.items", { count: 1 }), "1 item");
assert.strictEqual(i18n.t("cart.items", { count: 5 }), "5 items");
assert.strictEqual(i18n.t("cart.items", { count: 0 }), "0 items");

// 5) 切換 locale 後輸出改變
i18n.setLocale("zh");
assert.strictEqual(i18n.t("hello", { name: "小明" }), "哈囉，小明！");
// zh 只有 other 分支，count=1 也走 other
assert.strictEqual(i18n.t("cart.items", { count: 5 }), "5 件商品");
assert.strictEqual(i18n.t("cart.items", { count: 1 }), "1 件商品");

// 6) Intl.NumberFormat 依 locale 產出（用包含子字串避免環境差異）
i18n.setLocale("en");
const nEn = i18n.n(1234567.89);
assert.ok(nEn.includes("1,234,567"), `en 數字格式應含千分位: ${nEn}`);

// 7) Intl.DateTimeFormat 產出字串（確定性：只驗證為非空字串）
const dStr = i18n.d(new Date(Date.UTC(2026, 0, 15)));
assert.ok(typeof dStr === "string" && dStr.length > 0, `d 應回傳非空字串: ${dStr}`);

console.log("✅ 通過");
