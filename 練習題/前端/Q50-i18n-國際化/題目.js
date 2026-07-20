/*
【題目】手寫 mini i18n 函式（國際化核心機制）

說明：
實作 createI18n({ locale, messages }) 回傳 { t, setLocale, n, d }。
這是 next-intl / react-i18next 這類函式庫的核心概念濃縮版。

需求：
1. t(key, params)
   - 依 key 取訊息，支援「巢狀 key」用點號存取，例如 'user.greeting'。
   - 支援 {name} 佔位符內插，params 提供對應值。
2. 複數（pluralization）
   - 當訊息值為物件（如 { one: '{count} item', other: '{count} items' }）
     且 params 帶有 count 時，用 Intl.PluralRules(locale) 選 zero/one/other 分支，
     選到的分支字串再做內插（{count} 會被換成實際數字）。
3. 找不到 key 時，回傳 key 本身（fallback），不要拋錯。
4. setLocale(locale) 切換語系，之後 t/n/d 依新語系運作。
5. 數字/日期小工具：
   - n(value)：用 Intl.NumberFormat(locale) 格式化數字。
   - d(value)：用 Intl.DateTimeFormat(locale) 格式化日期。

messages 結構範例：
  const messages = {
    en: {
      hello: 'Hello, {name}!',
      user: { greeting: 'Welcome back, {name}' },
      cart: { items: { one: '{count} item', other: '{count} items' } },
    },
    zh: {
      hello: '哈囉，{name}！',
      user: { greeting: '歡迎回來，{name}' },
      cart: { items: { other: '{count} 件商品' } },
    },
  };

使用範例：
  const i18n = createI18n({ locale: 'en', messages });
  i18n.t('hello', { name: 'Amy' });            // 'Hello, Amy!'
  i18n.t('user.greeting', { name: 'Amy' });    // 'Welcome back, Amy'
  i18n.t('missing.key');                        // 'missing.key'（fallback）
  i18n.t('cart.items', { count: 1 });          // '1 item'
  i18n.t('cart.items', { count: 5 });          // '5 items'
  i18n.setLocale('zh');
  i18n.t('cart.items', { count: 5 });          // '5 件商品'
  i18n.n(1234567.89);                           // 依 locale 格式化的數字字串

提示：
  - 巢狀取值：key.split('.') 後用 reduce 逐層鑽入 messages[locale]。
  - 內插：str.replace(/\{(\w+)\}/g, (_, k) => params[k]) 。
  - 複數分支名稱：new Intl.PluralRules(locale).select(count) 會回傳
    'zero' | 'one' | 'two' | 'few' | 'many' | 'other'，取不到分支時退回 'other'。
*/

// createI18n：回傳 { t, setLocale, n, d }
function createI18n({ locale, messages }) {
  throw new Error("尚未實作");
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
