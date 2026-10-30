import { CodeBlock } from '../../../components/CodeBlock'

const FLOW = `HTML --解析--> DOM Tree ─┐
                                  ├─(合併)─> Render Tree --> Layout --> Paint --> Composite
CSS  --解析--> CSSOM     ─┘`

const SCRIPT_TAGS = `<script defer src="/app.js" />   // 照順序，DOM 解析完後執行
<script async src="/analytics.js" /> // 下載完立即執行，不保證順序`

export function Solution() {
  return (
    <div className="space-y-3 text-sm">
      <p>
        關鍵渲染路徑：DOM + CSSOM → Render Tree（只含可見節點）→ Layout（計算位置/大小）→ Paint（填像素）→
        Composite（合成圖層）。
      </p>
      <CodeBlock code={FLOW} />
      <ul className="list-disc space-y-1 pl-4">
        <li>CSS 預設<strong>阻塞渲染</strong>：要等 CSSOM 完成才能產生 Render Tree，否則會 FOUC。</li>
        <li>
          沒有 <code>async</code>/<code>defer</code> 的 <code>&lt;script&gt;</code> 會<strong>阻塞解析</strong>：先下載並執行完才繼續解析 HTML。
        </li>
      </ul>
      <CodeBlock code={SCRIPT_TAGS} />
      <p>優化三面向：減少關鍵資源「數量」（tree-shaking/code splitting）、「大小」（壓縮）、「傳輸距離」（CDN、preload）。</p>
    </div>
  )
}
