import { useState } from 'react'
import { Button } from './Button'

// 共用的「先看任務說明、按按鈕才跑程式、把 log 依序顯示出來」模板。
// 給「預測輸出」類題目用（事件迴圈、閉包、this、原型鏈…），避免每題重複寫一樣的 UI。
//
// `run` 收到的 `log` 函式可以在非同步 callback（setTimeout/Promise…）裡呼叫——
// 每呼叫一次就會立刻更新畫面，不是等 `run` 整個同步跑完才顯示，
// 這樣才能正確展示「真的」非同步執行順序，而不是假裝的同步模擬。
//
// `prompt` 是題目任務的文字說明，會顯示在按鈕上方；結果在按下按鈕之前不會顯示，
// 逼你先自己想過一輪答案再驗證，而不是一打開頁面就看到結果。
export function LogRunner(props: { run: (log: (msg: string) => void) => void; buttonLabel?: string; prompt?: string }) {
  const [lines, setLines] = useState<string[] | null>(null)

  const onRun = () => {
    const collected: string[] = []
    setLines(collected)
    props.run((msg) => {
      collected.push(msg)
      setLines([...collected])
    })
  }

  return (
    <div className="space-y-2">
      {props.prompt && <p className="text-sm font-medium text-slate-700">{props.prompt}</p>}
      <Button onClick={onRun}>{props.buttonLabel ?? '執行，看看結果'}</Button>
      {lines !== null && (
        <ol className="list-inside list-decimal space-y-0.5 font-mono text-sm text-slate-800">
          {lines.map((line, i) => (
            <li key={i}>{line}</li>
          ))}
        </ol>
      )}
    </div>
  )
}
