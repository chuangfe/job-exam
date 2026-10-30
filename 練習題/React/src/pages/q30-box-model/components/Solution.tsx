// border-box：width 包含 content + padding + border，元素的實際寬度就是你設定的 width，不會超出。
// 這也是為什麼幾乎所有 CSS reset（含 Tailwind preflight）都把 box-sizing 全域設成 border-box。
export function Solution() {
  return (
    <div className="w-48 border-2 border-dashed border-slate-400 p-2">
      <p className="mb-2 text-xs text-slate-500">外層容器寬度 192px（w-48）</p>
      <div
        className="border-8 border-emerald-400 bg-emerald-100 p-4 text-sm"
        style={{ boxSizing: 'border-box', width: '180px' }}
      >
        width: 180px（border-box）
        <br />
        padding/border 內縮，不額外加寬
        <br />
        實際佔用就是 180px，完全不超出
      </div>
    </div>
  )
}
