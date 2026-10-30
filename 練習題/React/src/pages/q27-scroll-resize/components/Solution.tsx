const EXAMPLE = `// throttle：捲動進度條，過程中持續更新
window.addEventListener("scroll", () => {
  if (ticking) return
  ticking = true
  requestAnimationFrame(() => { updateProgress(); ticking = false })
}, { passive: true })

// debounce：resize 結束後才重算佈局
window.addEventListener("resize", () => {
  clearTimeout(timer)
  timer = setTimeout(recalcLayout, 200)
})`

export function Solution() {
  return (
    <div className="space-y-3 text-sm">
      <p>
        需要「過程中持續反應」（捲動進度條、視差）→ <strong>throttle</strong>。只需要「結束後處理一次」（resize
        後重算佈局、送 analytics）→ <strong>debounce</strong>。
      </p>
      <pre className="overflow-x-auto rounded-md bg-slate-900 p-3 text-xs text-slate-100">
        <code>{EXAMPLE}</code>
      </pre>
      <p>
        更現代的做法：很多場景根本不用監聽 scroll/resize——<code>IntersectionObserver</code>
        判斷元素是否進入視窗（無限捲動、懶載入），<code>ResizeObserver</code> 監測特定元素尺寸變化，兩者都由瀏覽器背景高效處理。
      </p>
      <p className="text-xs text-slate-500">debounce / throttle 的手寫實作見 Q09、Q10。</p>
    </div>
  )
}
