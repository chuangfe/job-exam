// flex：適合「一維」排列（一列或一欄），間距用 gap 統一控制，不用脫離文件流。
// grid：適合「二維」排版（同時控制列與欄），用 grid-template-columns 直接定義欄數，不用算每張卡的寬度。
// 選擇原則：只需要排一排（導覽列、工具列）→ flex；需要同時對齊行列（卡片牆、表單）→ grid。
export function Solution() {
  const cards = ['A', 'B', 'C', 'D', 'E']
  return (
    <div className="space-y-4 border border-dashed border-slate-400 p-2">
      <div>
        <p className="mb-2 text-xs text-slate-500">flex：一維排列，gap 統一間距</p>
        <div className="flex flex-wrap gap-2">
          {cards.map((c) => (
            <div key={c} className="flex h-16 w-16 items-center justify-center bg-emerald-200">
              {c}
            </div>
          ))}
        </div>
      </div>
      <div>
        <p className="mb-2 text-xs text-slate-500">grid：二維排列，直接定義欄數</p>
        <div className="grid grid-cols-3 gap-2">
          {cards.map((c) => (
            <div key={c} className="flex h-16 items-center justify-center bg-sky-200">
              {c}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
