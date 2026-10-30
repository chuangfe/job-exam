// 任務：下面用 float + margin 排了 5 張卡片。觀察它的間距、換行、對齊行為，
// 想想看：如果要做出「等間距、整齊換行」的版面，用 float 要處理哪些麻煩事？會想改用 flex 還是 grid？為什麼？
export function Problem() {
  const cards = ['A', 'B', 'C', 'D', 'E']
  return (
    <div className="border border-dashed border-slate-400 p-2">
      <div>
        {cards.map((c) => (
          <div key={c} className="float-left mr-2 mb-2 h-16 w-16 bg-amber-200 text-center leading-[64px]">
            {c}
          </div>
        ))}
      </div>
      <div className="clear-both" />
    </div>
  )
}
