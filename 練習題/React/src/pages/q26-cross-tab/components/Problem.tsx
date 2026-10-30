export function Problem() {
  return (
    <div className="space-y-2 text-sm">
      <p>假設兩個分頁都開著同一個網站，使用者在分頁 A 登出，分頁 B 完全不知道，狀態就不同步了。</p>
      <p>
        要讓同源的多個分頁即時互相通知，有哪些 API 可以選？跨來源（iframe / 彈窗）又要用哪個？為什麼帶 cookie
        跨域要驗證 <code>origin</code>？
      </p>
    </div>
  )
}
