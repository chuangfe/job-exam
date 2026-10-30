// Q41（答案版）— fetch({ next: { revalidate: 30, tags: ['q41-demo'] } }) + 手動 revalidateTag
//
// 四層快取整理（從離瀏覽器最近到最遠）：
// | 層級 | 快取什麼 | TTL 由誰控制 | 如何失效 | 這個 demo 能不能展示 |
// |---|---|---|---|---|
// | 瀏覽器 HTTP 快取 | 回應本體 | 回應的 Cache-Control | 過期 / 使用者強制重整 | 可以（但本頁刻意繞過它看 server 端快取） |
// | Service Worker | 攔截到的 request/response | 寫死在 SW 程式碼裡 | SW 自己清，或版本變更 | 不行（本專案沒有註冊 SW） |
// | CDN / Edge | 共享回應（看 s-maxage） | CDN 設定 / 回應標頭 | purge API / TTL 到期 | 不行（本機沒有真的 CDN） |
// | Next.js Data Cache（這頁用的） | fetch 的回應 | `next: { revalidate, tags }` | 時間到期，或呼叫 revalidateTag/revalidatePath | **可以**，就是這頁 |
// | Redis（應用層） | 任意查詢結果 | 應用程式自己設 TTL | cache-aside：讀不到就查源頭再寫回 | 不行（本機沒有 Redis） |
//
// 按下面的按鈕會呼叫 Server Action → updateTag('q41-demo')，
// 讓下一次載入這頁的 fetch 立刻重新打，而不用等滿 30 秒。
// 註：這個 Next 版本把 revalidateTag 改成需要帶 cache-life profile 參數（搭配新版 Cache Components 模型），
// 「在 Server Action 裡立刻生效」改用 updateTag(tag) 這個新函式——概念上等同舊版 revalidateTag(tag)。
import { updateTag } from 'next/cache'
import { headers } from 'next/headers'

async function getTime() {
  const h = await headers()
  const host = h.get('host') ?? 'localhost:3000'
  const protocol = host.startsWith('localhost') ? 'http' : 'https'
  const res = await fetch(`${protocol}://${host}/api/q41-time`, {
    next: { revalidate: 30, tags: ['q41-demo'] },
  })
  const data = (await res.json()) as { time: string }
  return data.time
}

async function revalidateDemo() {
  'use server'
  // 這裡用 updateTag：這個 Next 版本把 revalidateTag 改成要帶 cache-life profile
  // （搭配新版 Cache Components 模型），updateTag 才是「在 Server Action 裡立刻讓快取失效」的對應函式。
  updateTag('q41-demo')
}

export default async function Page() {
  const time = await getTime()

  return (
    <main>
      <p>
        <a href="/">← 回題目列表</a>
      </p>
      <h1>Q41（答案）：30 秒快取 + 手動 revalidateTag</h1>
      <p>30 秒內重新整理，時間不會變；按下按鈕會立刻清掉快取：</p>
      <p>
        <code>{time}</code>
      </p>
      <form action={revalidateDemo}>
        <button type="submit">立刻 revalidateTag(&apos;q41-demo&apos;)</button>
      </form>
      <p>
        對照 <a href="/q41-caching-strategies/problem">題目版（完全不快取）</a>。
      </p>
    </main>
  )
}
