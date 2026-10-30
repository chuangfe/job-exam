import { useState } from 'react'

// TODO 1: useDebounce<T>(value: T, delay?: number): T
//   回傳「延遲後」的值；value 持續變動時，只有停止變動超過 delay 毫秒後才更新回傳值。
//   提示：setTimeout + useEffect 清理函式，在 value/delay 變更時清掉舊計時器。
function useDebounce<T>(value: T, _delay = 300): T {
  return value // 目前沒有防抖，立刻回傳最新值
}

// TODO 2: usePrevious<T>(value: T): T | undefined
//   取得「前一次渲染」的值，第一次渲染回傳 undefined。
//   提示：useEffect 在渲染後才執行，能否利用這個時序差把值存進 ref？
function usePrevious<T>(value: T): T | undefined {
  return value // 目前直接回傳當前值，不是「前一次」的值
}

export function Problem() {
  const [text, setText] = useState('')
  const debouncedText = useDebounce(text, 500)
  const previousDebouncedText = usePrevious(debouncedText)

  return (
    <div className="space-y-4 text-sm">
      <div>
        <p className="mb-1 font-medium">useDebounce + usePrevious（尚未實作）</p>
        <input
          className="w-full rounded border border-slate-300 px-2 py-1"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="輸入文字，觀察右側值是否真的有延遲"
        />
        <p className="mt-1 text-slate-600">debounced 值：{debouncedText || '(空)'}（目前跟著每個按鍵立刻變）</p>
        <p className="text-slate-600">上一次 debounced 值：{previousDebouncedText ?? '(尚無)'}（目前永遠等於當前值）</p>
      </div>
      <ul className="list-disc space-y-1 pl-5 text-slate-600">
        <li>
          <code>useDebounce</code> 目前立刻回傳最新值，沒有「停止變動 delay 毫秒才更新」的效果。
        </li>
        <li>
          <code>usePrevious</code> 目前回傳的是「當前值」而不是「上一輪的值」。
        </li>
        <li>
          第三個要實作的 <code>useFetch&lt;T&gt;(url): {'{ data, loading, error }'}</code> 需處理：切換 url
          取消前一個請求（AbortController）、避免競態、卸載後不可 setState、AbortError 不當成錯誤。
        </li>
      </ul>
    </div>
  )
}
