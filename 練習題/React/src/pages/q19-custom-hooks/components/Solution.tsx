import { useEffect, useRef, useState } from 'react'

// useDebounce：回傳延遲後的值。每次 value/delay 變更都重設計時器；
// 清理函式會在下一次 effect 執行前清掉上一個計時器，只有「停止變動 delay 毫秒」後才真的更新。
function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(id)
  }, [value, delay])
  return debounced
}

// usePrevious：利用「effect 在渲染後執行」的時序——渲染階段讀 ref.current（仍是舊值），
// 渲染後 effect 才把 ref.current 更新為當前值，所以本次渲染拿到的永遠是上一輪的值。
function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>(undefined)
  useEffect(() => {
    ref.current = value
  }, [value])
  return ref.current
}

interface FetchState<T> {
  data: T | null
  loading: boolean
  error: Error | null
}

// useFetch：url 變更或卸載時用 AbortController 取消前一個請求，
// 同時解決「競態」（舊回應覆蓋新結果）與「卸載後 setState」兩個問題。
function useFetch<T>(url: string): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({ data: null, loading: true, error: null })
  useEffect(() => {
    const controller = new AbortController()
    setState({ data: null, loading: true, error: null })
    fetch(url, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((data: T) => setState({ data, loading: false, error: null }))
      .catch((error: Error) => {
        if (error.name === 'AbortError') return
        setState({ data: null, loading: false, error })
      })
    return () => controller.abort()
  }, [url])
  return state
}

// 示範用假資料（避免 demo 依賴真實網路），用 data: URL 走真正的 fetch 流程。
const DEMO_URL = `data:application/json,${encodeURIComponent(JSON.stringify({ message: '這是用 useFetch 載入的資料' }))}`

export function Solution() {
  const [text, setText] = useState('')
  const debouncedText = useDebounce(text, 500)
  const previousDebouncedText = usePrevious(debouncedText)
  const { data, loading, error } = useFetch<{ message: string }>(DEMO_URL)

  return (
    <div className="space-y-4 text-sm">
      <div>
        <p className="mb-1 font-medium">useDebounce + usePrevious</p>
        <input
          className="w-full rounded border border-slate-300 px-2 py-1"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="輸入文字，停止打字 500ms 後才更新 debounced 值"
        />
        <p className="mt-1 text-slate-600">debounced 值：{debouncedText || '(空)'}</p>
        <p className="text-slate-600">上一次 debounced 值：{previousDebouncedText ?? '(尚無)'}</p>
      </div>
      <div>
        <p className="mb-1 font-medium">useFetch</p>
        {loading && <p className="text-slate-600">載入中...</p>}
        {error && <p className="text-red-600">錯誤：{error.message}</p>}
        {data && <p className="text-slate-600">{data.message}</p>}
      </div>
    </div>
  )
}
