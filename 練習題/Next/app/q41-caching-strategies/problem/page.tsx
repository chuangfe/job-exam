// Q41（題目版）
//
// 任務：這頁用 fetch(url, { cache: 'no-store' }) 打 /api/q41-time。
// 重新整理這頁幾次，觀察下面的時間——它會不會變？這代表 fetch 的回應有沒有被快取？
// 跟 Q37 的 force-dynamic 有什麼不一樣（force-dynamic 是整個 route，這裡只是單一 fetch 呼叫）？
// 想清楚後對照 solution/page.tsx（裡面有完整的四層快取整理）。
import { headers } from 'next/headers'

async function getTime() {
  const h = await headers()
  const host = h.get('host') ?? 'localhost:3000'
  const protocol = host.startsWith('localhost') ? 'http' : 'https'
  const res = await fetch(`${protocol}://${host}/api/q41-time`, { cache: 'no-store' })
  const data = (await res.json()) as { time: string }
  return data.time
}

export default async function Page() {
  const time = await getTime()

  return (
    <main>
      <p>
        <a href="/">← 回題目列表</a>
      </p>
      <h1>Q41（題目）</h1>
      <p>重新整理這頁，觀察時間的變化：</p>
      <p>
        <code>{time}</code>
      </p>
      <p>
        想清楚後對照 <a href="/q41-caching-strategies/solution">答案版</a>。
      </p>
    </main>
  )
}
