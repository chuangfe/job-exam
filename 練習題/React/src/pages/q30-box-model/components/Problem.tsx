// 任務：外層虛線容器寬度是 192px（w-48）。下面紅色框設定 box-sizing: content-box、
// width: 180px、padding: 16px、border: 8px。紅色框「實際」會佔用多寬？會不會超出外層容器？
export function Problem() {
  return (
    <div className="space-y-2">
      <div className="w-48 border-2 border-dashed border-slate-400 p-2">
        <div
          className="border-8 border-red-400 bg-red-100 p-4 text-sm"
          style={{ boxSizing: 'content-box', width: '180px' }}
        >
          width: 180px（content-box）
        </div>
      </div>
    </div>
  )
}
