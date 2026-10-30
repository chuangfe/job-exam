import { Callout } from '../../../components/Callout'

export function Problem() {
  return (
    <div className="space-y-2 text-sm">
      <p>LCP、CLS、INP 各自衡量哪個面向？目標值是多少？</p>
      <Callout>
        <ul className="list-disc space-y-1 pl-4">
          <li>LCP 太慢通常被什麼拖累？</li>
          <li>什麼情況會造成 CLS（版面位移）？</li>
          <li>INP 是 2024 年取代誰的指標？INP 太差代表主執行緒被什麼卡住？</li>
        </ul>
      </Callout>
    </div>
  )
}
