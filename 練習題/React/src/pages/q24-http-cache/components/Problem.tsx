import { Callout } from '../../../components/Callout'

export function Problem() {
  return (
    <div className="space-y-2 text-sm">
      <p>「強快取（strong cache）」與「協商快取（negotiated cache）」有什麼差別？</p>
      <Callout>
        <ul className="list-disc space-y-1 pl-4">
          <li>瀏覽器發請求前先檢查什麼？什麼情況下根本不發請求？</li>
          <li>ETag / If-None-Match 與 Last-Modified / If-Modified-Since 怎麼配對運作？</li>
          <li>304 Not Modified 有沒有傳回 body？</li>
          <li>HTML 通常用什麼快取策略？帶 hash 的 JS/CSS 呢？</li>
        </ul>
      </Callout>
    </div>
  )
}
