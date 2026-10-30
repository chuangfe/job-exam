// Q37（題目版）
//
// 任務：這頁用 `export const dynamic = 'force-dynamic'`。重新整理這頁幾次，
// 觀察下面的時間戳記——它會不會變？多久變一次？為什麼？
// 想清楚答案、也想過「如果拿掉 force-dynamic 會怎樣」之後，
// 再去看 solution/page.tsx（裡面有完整的 7 點解析：Server/Client Components、
// 四種渲染策略、四層快取、Route Segment Config、Edge vs Node runtime、
// bundle 拆分、與 Pages Router 的對照）。

export const dynamic = 'force-dynamic'

export default function Page() {
  const now = new Date().toISOString()

  return (
    <main>
      <p>
        <a href="/">← 回題目列表</a>
      </p>
      <h1>Q37（題目）</h1>
      <p>重新整理這頁，觀察時間戳記的變化：</p>
      <p>
        <code>{now}</code>
      </p>
      <p>
        想清楚後對照 <a href="/q37-nextjs-rendering/solution">答案版</a>。
      </p>
    </main>
  )
}
