// position 速記：
// static（預設）：不特別定位。relative：相對自己原本的位置偏移，且會成為後代 absolute 的定位基準。
// absolute：相對「最近的已定位祖先」定位，脫離文件流。fixed：相對「viewport」定位，捲動也不動。
// sticky：捲動範圍內表現得像 relative，超過閾值後像 fixed「黏」住。
// 修法：幫卡片加上 position: relative，徽章的 absolute 就會正確以卡片為基準。
export function Solution() {
  return (
    <div className="flex h-24 items-center justify-center border border-dashed border-slate-400 p-4">
      <div className="relative h-16 w-32 bg-slate-100 p-2 text-xs">
        卡片（position: relative）
        <span className="absolute -top-2 right-2 rounded-full bg-emerald-500 px-2 py-0.5 text-xs text-white">3</span>
      </div>
    </div>
  )
}
