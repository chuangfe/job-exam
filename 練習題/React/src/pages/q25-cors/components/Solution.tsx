import { CodeBlock } from '../../../components/CodeBlock'

const PREFLIGHT = `OPTIONS /api/me
  Origin: https://app.example.com
  Access-Control-Request-Method: PUT
  Access-Control-Request-Headers: Content-Type, Authorization

回應：
  Access-Control-Allow-Origin: https://app.example.com
  Access-Control-Allow-Methods: GET, POST, PUT, DELETE
  Access-Control-Allow-Headers: Content-Type, Authorization`

const CREDENTIALED = `// 前端
fetch("https://api.example.com/me", { credentials: "include" })

// 後端回應必須：
// Access-Control-Allow-Origin: https://app.example.com  (不可為 *)
// Access-Control-Allow-Credentials: true`

export function Solution() {
  return (
    <div className="space-y-3 text-sm">
      <p>
        同源 = 協定 + 網域 + 埠三者皆相同。方法為 GET/HEAD/POST、標頭在安全清單內、Content-Type 是
        text/plain、multipart/form-data 或 x-www-form-urlencoded 才算「簡單請求」，直接送出。
      </p>
      <p>
        非簡單請求（PUT/DELETE/PATCH、自訂標頭如 Authorization、Content-Type: application/json）會先觸發預檢：
      </p>
      <CodeBlock code={PREFLIGHT} />
      <p>帶 cookie 的跨源請求（credentialed request）：</p>
      <CodeBlock code={CREDENTIALED} />
      <p>CORS 是瀏覽器的安全機制；簡單請求即使 CORS 擋下回應，請求本身可能已送達伺服器，不能當成安全防護。</p>
    </div>
  )
}
