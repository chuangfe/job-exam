// BFC（Block Formatting Context）是一個獨立的渲染區域，裡面的浮動元素不會「溢出」影響外部，
// 而且觸發 BFC 的元素會自動把內部浮動元素的高度算進自己的高度（解決塌陷問題）。
// 常見觸發方式：overflow: hidden/auto、display: flow-root（最乾淨，沒有副作用）、display: flex/grid。
export function Solution() {
  return (
    <div>
      <div className="border-2 border-dashed border-emerald-400 bg-emerald-50" style={{ display: 'flow-root' }}>
        <div className="float-left h-16 w-16 bg-amber-300">浮動</div>
        <div className="float-left ml-2 h-16 w-16 bg-amber-300">浮動</div>
      </div>
      <p className="mt-1 text-xs text-emerald-600">
        ↑ 父容器加了 display: flow-root（建立新的 BFC），正確包住了兩個浮動方塊
      </p>
    </div>
  )
}
