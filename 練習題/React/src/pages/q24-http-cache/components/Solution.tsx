import { CodeBlock } from '../../../components/CodeBlock'

const FLOW = `強快取還有效？(max-age/Expires)
  是 -> 直接用本地副本，不發請求
  否 -> 帶驗證標頭發請求（協商快取）
          沒變 -> 304 Not Modified（無 body）
          變了 -> 200 OK（新 body + 新快取標頭）`

export function Solution() {
  return (
    <div className="space-y-3 text-sm">
      <CodeBlock code={FLOW} />
      <table className="w-full border-collapse text-xs">
        <thead>
          <tr className="border-b text-left">
            <th className="py-1">資源類型</th>
            <th className="py-1">策略</th>
            <th className="py-1">原因</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="py-1">HTML 入口檔</td>
            <td className="py-1">
              <code>no-cache</code>
            </td>
            <td className="py-1">每次都協商，確保拿到最新版</td>
          </tr>
          <tr className="border-b">
            <td className="py-1">帶 hash 的 JS/CSS</td>
            <td className="py-1">
              <code>max-age=31536000, immutable</code>
            </td>
            <td className="py-1">內容變了檔名就變，可永久快取</td>
          </tr>
        </tbody>
      </table>
      <p>
        <code>ETag</code> 優先於 <code>Last-Modified</code>（內容指紋比時間戳精確）。
        <code>no-cache</code> 是「可以快取但每次要協商」，<code>no-store</code> 才是完全不快取。
      </p>
    </div>
  )
}
