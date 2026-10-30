// Q63（答案版）— 兩條 RSC 邊界規則的正確示範
//
// 規則 1（序列化邊界）：Server → Client 的 props 只能是可序列化的值。
// 下面 PriceDisplay 只收 `cents: number`，格式化邏輯搬進 Client Component 自己做
// （對照 problem/page.tsx 那種直接傳函式會爆炸的寫法）。
//
// 規則 2（組合方式）：Client Component 不能直接 import 一個 Server Component來 render，
// 但可以把 Server Component 當 children 傳進 Client Component——下面的
// ClientAccordion（Client）包著 ServerInfoPanel（Server）就是這個模式。
//
// 這也是為什麼 Server Component 能從根本上減少 client bundle：ServerInfoPanel 的程式碼
// 永遠不會下載到瀏覽器，只有 ClientAccordion/PriceDisplay 的 JS 會。

import { ClientAccordion } from './ClientAccordion'
import { PriceDisplay } from './PriceDisplay'
import { ServerInfoPanel } from './ServerInfoPanel'

export default function Page() {
  return (
    <main>
      <p>
        <a href="/">← 回題目列表</a>
      </p>
      <h1>Q63（答案）：可序列化 props + children 組合</h1>

      <section>
        <h2>規則 1：只傳可序列化資料</h2>
        <PriceDisplay cents={1999} />
      </section>

      <section>
        <h2>規則 2：Server Component 當 children 傳進 Client Component</h2>
        <ClientAccordion title="展開看 Server Component 算出來的內容">
          <ServerInfoPanel />
        </ClientAccordion>
      </section>

      <p>
        對照 <a href="/q63-rsc/problem">題目版（直接傳函式，會噴序列化錯誤）</a>。
      </p>
    </main>
  )
}
