// 任務：下面卡片右上角想放一個紅色數字徽章，用 absolute 搭配 -top-2 / right-2 定位。
// 徽章實際跑到哪裡去了？跟你預期的「卡片右上角」一樣嗎？如果不一樣，是什麼原因？
export function Problem() {
  return (
    <div className="flex h-24 items-center justify-center border border-dashed border-slate-400 p-4">
      <div className="h-16 w-32 bg-slate-100 p-2 text-xs">
        卡片
        <span className="absolute -top-2 right-2 rounded-full bg-red-500 px-2 py-0.5 text-xs text-white">3</span>
      </div>
    </div>
  )
}
