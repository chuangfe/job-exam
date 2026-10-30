// 任務：下面這個「?」方塊想要在虛線容器正中央，用了 absolute + top:50%; left:50%。
// 它實際上有置中嗎？如果沒有，偏向哪個方向？為什麼？
export function Problem() {
  return (
    <div className="relative h-32 border border-dashed border-slate-400">
      <div
        className="absolute flex h-12 w-12 items-center justify-center bg-red-200"
        style={{ top: '50%', left: '50%' }}
      >
        ?
      </div>
    </div>
  )
}
