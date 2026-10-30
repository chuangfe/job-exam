// 沒有 'use client'，所以是 Server Component：可以直接 async、直接用 Node API，
// 而且這個元件的程式碼完全不會被打進 client bundle（檢視瀏覽器 Network 面板的 JS
// 不會看到這段邏輯，跟 PriceDisplay/ClientAccordion 的程式碼一定會出現在 bundle 裡不一樣）。
export async function ServerInfoPanel() {
  const renderedAt = new Date().toISOString()
  const runtime = typeof window === 'undefined' ? 'server（這段話本身就是證明：它只會在伺服器執行）' : 'client'

  return (
    <ul>
      <li>這段文字由 Server Component 在請求當下算出：{renderedAt}</li>
      <li>執行環境：{runtime}</li>
      <li>這個元件不能被 ClientAccordion 直接 import 進去 render——只能像現在這樣當 children 傳進去。</li>
    </ul>
  )
}
