import { useState, type ReactNode } from 'react'
import { Button } from '../../../components/Button'
import { Callout } from '../../../components/Callout'

type AsyncState = 'loading' | 'error' | 'empty' | 'success'

// 可重用的四態抽象：loading/error/empty 標準化成統一元件，頁面只需要提供 success 的內容。
// 這是 composition over configuration 的例子——用 children 做成功狀態的組合，而不是加一堆 boolean props。
function AsyncBoundary(props: { state: AsyncState; onRetry: () => void; children: ReactNode }) {
  if (props.state === 'loading') return <p className="text-sm">載入中…</p>
  if (props.state === 'error') {
    return (
      <Callout>
        發生錯誤了。
        <Button onClick={props.onRetry} className="ml-2 text-xs">
          重試
        </Button>
      </Callout>
    )
  }
  if (props.state === 'empty') return <p className="text-sm text-slate-500">目前沒有資料，試著新增一筆看看。</p>
  return <>{props.children}</>
}

export function Solution() {
  const [state, setState] = useState<AsyncState>('loading')

  return (
    <div className="space-y-2">
      <div className="flex gap-1">
        {(['loading', 'error', 'empty', 'success'] as const).map((s) => (
          <Button key={s} onClick={() => setState(s)} className="text-xs">
            {s}
          </Button>
        ))}
      </div>
      <AsyncBoundary state={state} onRetry={() => setState('loading')}>
        <p className="text-sm">資料：[1, 2, 3]</p>
      </AsyncBoundary>
      <p className="text-xs text-slate-500">
        所有頁面共用同一個 AsyncBoundary，UX 要統一改空狀態插圖只要改一個地方。
      </p>
    </div>
  )
}
