import { useState } from 'react'
import { Button } from '../../../components/Button'

// TODO：每個頁面各自手刻 loading/error/empty/success 的 if/else，沒有共用邏輯。
// 想像一下：UX 想統一把所有空狀態加上插圖，要改幾個頁面？
type State = 'loading' | 'error' | 'empty' | 'success'

export function Problem() {
  const [state, setState] = useState<State>('loading')

  return (
    <div className="space-y-2">
      <div className="flex gap-1">
        {(['loading', 'error', 'empty', 'success'] as const).map((s) => (
          <Button key={s} onClick={() => setState(s)} className="text-xs">
            {s}
          </Button>
        ))}
      </div>
      {state === 'loading' && <p className="text-sm">載入中...（這個頁面自己寫的文字）</p>}
      {state === 'error' && <p className="text-sm text-red-600">出錯了（這頁沒有重試按鈕）</p>}
      {state === 'empty' && <p className="text-sm text-slate-500">沒有資料（這頁沒有插圖/引導）</p>}
      {state === 'success' && <p className="text-sm">資料：[1, 2, 3]</p>}
    </div>
  )
}
