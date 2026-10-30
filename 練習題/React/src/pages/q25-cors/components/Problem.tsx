import { Callout } from '../../../components/Callout'

export function Problem() {
  return (
    <div className="space-y-2 text-sm">
      <p>「預檢請求（preflight）」在什麼情況下會觸發？跨來源請求要帶 cookie 時，前後端各要設定什麼？</p>
      <Callout>
        <ul className="list-disc space-y-1 pl-4">
          <li>「同源」的定義：協定、網域、埠號之中改哪一個就算跨源？</li>
          <li>什麼是「簡單請求」？跟「非簡單請求」差在哪？</li>
          <li>哪些 HTTP 方法、標頭、Content-Type 會讓請求變成非簡單？</li>
          <li>要帶 cookie 跨源時，為什麼 Access-Control-Allow-Origin 不能是 *？</li>
        </ul>
      </Callout>
    </div>
  )
}
