'use client'

// Next.js 的 route-level error boundary：這個 segment（或它底下任何 Server/Client Component）
// render 時丟出的錯誤都會被這裡接住，取代整頁崩潰。
// `error.tsx` 本身一定要是 Client Component。
export default function Error(props: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main>
      <p>
        <a href="/">← 回題目列表</a>
      </p>
      <h1>Q63（題目）：真的壞掉了 — 這就是重點</h1>
      <p>捕捉到的錯誤訊息（production build 可能只顯示 digest，不顯示完整訊息）：</p>
      <pre style={{ whiteSpace: 'pre-wrap', color: 'crimson' }}>{props.error.message || `digest: ${props.error.digest}`}</pre>
      <p>原因：把函式當 prop 從 Server Component 傳給 Client Component，無法被序列化。</p>
      <button onClick={props.reset}>重試</button>
    </main>
  )
}
