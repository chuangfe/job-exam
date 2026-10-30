// 任務：下面有兩條 CSS 規則套用在同一段文字上，.q33-problem-blue 寫在 #q33-problem-target 後面。
// 這段文字最後會是什麼顏色——藍色還是綠色？為什麼？「後寫的規則贏」這個說法在這裡成立嗎？
export function Problem() {
  return (
    <div>
      <style>{`
        #q33-problem-target { color: #0f766e; }
        .q33-problem-blue { color: #2563eb; }
      `}</style>
      <p id="q33-problem-target" className="q33-problem-blue text-lg font-semibold">
        這段文字是什麼顏色？
      </p>
      <pre className="mt-2 rounded bg-slate-900 p-2 text-xs text-slate-100">
        {`#q33-problem-target { color: #0f766e; } /* id 選擇器 */\n.q33-problem-blue { color: #2563eb; }   /* class 選擇器，寫在後面 */`}
      </pre>
    </div>
  )
}
