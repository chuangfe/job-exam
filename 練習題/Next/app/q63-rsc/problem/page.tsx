// Q63（題目版）
//
// 任務：page.tsx 沒有 'use client'，所以是 Server Component；PriceDisplay 有 'use client'，
// 是 Client Component。下面把 `formatPrice` 這個函式當 prop 從 page.tsx 傳給 PriceDisplay。
// 不要看答案，先想：這樣可以嗎？Server → Client 的 props 有什麼限制？
// 打開這頁會發生什麼事？如果會出錯，猜猜看是什麼樣的錯誤訊息。
// 想清楚後打開這頁驗證（錯誤會被 error.tsx 接住顯示出來），再對照 solution/page.tsx。

import { PriceDisplay } from './PriceDisplay'

export const dynamic = 'force-dynamic'

function formatPrice(cents: number): string {
  return `NT$${(cents / 100).toFixed(0)}`
}

export default function Page() {
  return (
    <main>
      <p>
        <a href="/">← 回題目列表</a>
      </p>
      <h1>Q63（題目）</h1>
      <PriceDisplay formatPrice={formatPrice} cents={1999} />
      <p>
        想清楚後對照 <a href="/q63-rsc/solution">答案版</a>。
      </p>
    </main>
  )
}
