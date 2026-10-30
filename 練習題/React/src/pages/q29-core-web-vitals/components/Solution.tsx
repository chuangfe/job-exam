export function Solution() {
  return (
    <div className="space-y-3 text-sm">
      <table className="w-full border-collapse text-xs">
        <thead>
          <tr className="border-b text-left">
            <th className="py-1">指標</th>
            <th className="py-1">衡量面向</th>
            <th className="py-1">目標值</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="py-1">LCP</td>
            <td className="py-1">載入速度（最大內容繪製）</td>
            <td className="py-1">&lt; 2.5s</td>
          </tr>
          <tr className="border-b">
            <td className="py-1">CLS</td>
            <td className="py-1">視覺穩定性（累積版面位移）</td>
            <td className="py-1">&lt; 0.1</td>
          </tr>
          <tr className="border-b">
            <td className="py-1">INP</td>
            <td className="py-1">互動回應性（取代 FID）</td>
            <td className="py-1">&lt; 200ms</td>
          </tr>
        </tbody>
      </table>
      <ul className="list-disc space-y-1 pl-4">
        <li>LCP：壓縮主圖、preload 關鍵圖、SSR/預渲染、移除阻塞渲染的 CSS/JS（見 Q22）。</li>
        <li>CLS：圖片/影片設尺寸或 aspect-ratio、字體用 font-display、動態內容預留空間。</li>
        <li>
          INP：拆分長任務、用 <code>startTransition</code>/<code>useDeferredValue</code> 降低非急迫更新優先度、搬到
          Web Worker。
        </li>
      </ul>
      <p className="text-xs text-slate-500">一句話：LCP 看快、CLS 看穩、INP 看順。</p>
    </div>
  )
}
