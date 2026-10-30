// 常見置中技巧三種：
// 1. flex：父容器 items-center + justify-center，最通用。
// 2. grid：父容器 place-items-center，一行搞定。
// 3. absolute + transform：top/left 50% 之後再用 translate(-50%, -50%) 把自己的一半寬高「退回來」。
export function Solution() {
  return (
    <div className="space-y-3">
      <div>
        <p className="mb-1 text-xs text-slate-500">flex：items-center + justify-center</p>
        <div className="flex h-20 items-center justify-center border border-dashed border-slate-400">
          <div className="flex h-12 w-12 items-center justify-center bg-emerald-200">✓</div>
        </div>
      </div>
      <div>
        <p className="mb-1 text-xs text-slate-500">absolute + translate(-50%, -50%)</p>
        <div className="relative h-20 border border-dashed border-slate-400">
          <div
            className="absolute flex h-12 w-12 items-center justify-center bg-emerald-200"
            style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
          >
            ✓
          </div>
        </div>
      </div>
    </div>
  )
}
