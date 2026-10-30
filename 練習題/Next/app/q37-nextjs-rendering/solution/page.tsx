// Q37（答案版）— ISR：revalidate 視窗內重複拿到「舊」結果，過了視窗才重算
//
// `export const revalidate = 10` 代表：第一次請求後，Next 把渲染結果快取起來；
// 10 秒內的後續請求都直接拿快取（timestamp 不變）；10 秒後第一個請求仍先拿到舊的，
// 但背後觸發重新渲染，把快取更新成新的結果（stale-while-revalidate，不是使用者在等新資料）。
//
// 完整 7 點解析：
// 1. Server/Client Components：預設都是 Server Component；'use client' 宣告一個模組邊界，
//    該檔案與它「往下 import」的模組都會被打進 client bundle；Server Component 傳 props 給
//    Client Component 必須是可序列化的值（不能傳函式/class instance），但可以把 Server Component
//    當作 children 傳進 Client Component 做組合。
// 2. 四種渲染策略：
//    - static（SSG）：建置時/首次請求時渲染一次，之後都用快取——適合部落格文章。
//    - dynamic（SSR-like）：見 problem 頁——適合個人化/即時性強的頁面。
//    - ISR（這頁）：靜態 + 定時重新驗證——適合商品頁這種「資料會變但不用即時」的頁面。
//    - Streaming：用 `loading.js` 或 `<Suspense>` 包住慢速區塊，先送出外殼 HTML，
//      資料好了再補上——改善 TTFB 與使用者「感覺」的載入速度。
// 3. 四層快取：
//    - Request Memoization：同一次 render 內，相同 fetch 參數只打一次（React cache()）。
//    - Data Cache：fetch 的回應本身被快取，`revalidate`/`tags` 控制存活與失效，Next 15 預設不快取、Next 14 預設快取。
//    - Full Route Cache：整個 route 的渲染結果被快取成 HTML + RSC payload（這頁靠這層運作）。
//    - Router Cache：client 端的路由快取，換頁時不用重新打 server。
//    `revalidatePath(path)` 清掉某條路徑的快取；`revalidateTag(tag)` 清掉所有用該 tag 標記的 fetch（搭配 `fetch(url, { next: { tags } })`），
//    通常在 Server Action / Route Handler 裡呼叫（資料變更後主動清快取）。
// 4. Route Segment Config：`dynamic`/`revalidate`/`runtime`/`fetchCache` 都是 route 層級設定，
//    `force-dynamic` 代表強制動態、`force-static` 代表強制當成靜態處理（即使用了 cookies()/headers() 這類動態 API 也會被忽略/報錯）。
// 5. Edge vs Node runtime：用 `export const runtime = 'edge' | 'nodejs'` 指定；Edge 跑在 V8 isolate，
//    沒有完整 Node API、但冷啟動快，適合輕量中介邏輯；Node runtime 功能完整，適合需要 Node 套件的頁面。
// 6. Bundle 拆分：Server Component 從根本上不產生對應的 client JS（不是「先送再忽略」，是壓根不打包），
//    比傳統 SSR 省得多；`next/dynamic` 可以延遲載入 Client Component 並支援 `ssr: false`（完全不做伺服器渲染），
//    `React.lazy` 則是純 client-side 的延遲載入，沒有 `ssr: false` 選項；很重的第三方套件（圖表/編輯器）
//    適合用 `next/dynamic(..., { ssr: false })` 包起來，避免拖垮首屏 bundle。
// 7. 對照 Pages Router：`getServerSideProps` ≈ 這個檔案用 `force-dynamic`；
//    `getStaticProps`+`getStaticPaths` ≈ 預設的 static render + `generateStaticParams`；
//    `getStaticProps` 的 `revalidate` ≈ 這頁用的 `export const revalidate`；
//    心智模型最大差異：資料抓取從「頁面層級的特殊函式」變成「元件內直接 fetch」，
//    快取預設值也從「getStaticProps 預設不過期」變成「App Router 要自己宣告 revalidate」。

export const revalidate = 10

export default function Page() {
  const now = new Date().toISOString()

  return (
    <main>
      <p>
        <a href="/">← 回題目列表</a>
      </p>
      <h1>Q37（答案）：ISR，revalidate = 10 秒</h1>
      <p>10 秒內重新整理，時間戳不會變；超過 10 秒後第一次請求會觸發重新計算：</p>
      <p>
        <code>{now}</code>
      </p>
      <p>
        對照 <a href="/q37-nextjs-rendering/problem">題目版（force-dynamic，每次都變）</a>。
      </p>
    </main>
  )
}
