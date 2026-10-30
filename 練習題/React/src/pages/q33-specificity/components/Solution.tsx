import { CodeBlock } from '../../../components/CodeBlock'

// Specificity 計算（由高到低）：!important > 內聯 style > id 選擇器 > class/屬性/偽類 > 元素/偽元素。
// 同一層級比較「數量」，數量相同才比源碼順序（後面蓋前面）。
// 實務建議：盡量只用 class 選擇器，避免 id 選擇器和 !important——這也是 Tailwind 等 utility-first
// 方案受歡迎的原因之一：所有 class 都是同一個 specificity 層級，不用猜誰蓋誰，只需要管源碼/CSS layer 順序。
const specificityCode = `/* specificity 分數 (id, class, element) */
#header          → (1,0,0)
.nav             → (0,1,0)
.nav.active      → (0,2,0)
div.nav          → (0,1,1)
button           → (0,0,1)

/* 想贏過某個規則但不想提升 specificity？用同樣選擇器 + CSS layer，或乾脆改掉舊的規則，
   不要用 !important 硬壓，那會讓之後的人更難蓋掉你這條規則。 */`

export function Solution() {
  return (
    <div className="space-y-2 text-sm">
      <p>
        把剛剛的 id 選擇器拿掉、兩條規則都改成 class，specificity 打平後，源碼順序才會生效（後面蓋前面）：
      </p>
      <CodeBlock code={specificityCode} />
    </div>
  )
}
