import { Callout } from '../../../components/Callout'

export function Problem() {
  return (
    <div className="space-y-2 text-sm">
      <p>scroll / resize 這類高頻事件，應該搭配防抖還是節流？判斷依據是什麼？</p>
      <Callout>
        <ul className="list-disc space-y-1 pl-4">
          <li>什麼情境需要「過程中持續反應」？什麼情境只需要「結束後處理一次」？</li>
          <li>IntersectionObserver / ResizeObserver 在哪些場景可以直接取代監聽 scroll/resize？</li>
        </ul>
      </Callout>
    </div>
  )
}
