import { Callout } from '../../../components/Callout'

export function Problem() {
  return (
    <div className="space-y-2 text-sm">
      <p>瀏覽器從拿到 HTML 到畫面出現在螢幕上，中間經過哪些步驟？</p>
      <Callout>
        <ul className="list-disc space-y-1 pl-4">
          <li>HTML 會被解析成什麼資料結構？CSS 又會建立什麼？兩者如何合併？</li>
          <li>哪些資源會「阻塞渲染（render-blocking）」？哪些會「阻塞解析（parser-blocking）」？</li>
          <li>&lt;script&gt; 沒有加 async / defer 時會發生什麼事？</li>
          <li>CSS 應該放哪裡？JS 應該放哪裡？為什麼？</li>
        </ul>
      </Callout>
    </div>
  )
}
