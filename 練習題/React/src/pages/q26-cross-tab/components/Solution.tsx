import { useEffect, useState } from 'react'
import { Button } from '../../../components/Button'

const CHANNEL_NAME = 'q26-cross-tab-demo'

// BroadcastChannel：同源多分頁即時廣播，發送的分頁自己不會收到自己的訊息。
// 開兩個分頁開著這一題，點其中一個「廣播」按鈕，另一個分頁的訊息會即時更新。
export function Solution() {
  const [log, setLog] = useState<string[]>([])

  useEffect(() => {
    if (typeof BroadcastChannel === 'undefined') return
    const channel = new BroadcastChannel(CHANNEL_NAME)
    channel.onmessage = (event) => {
      setLog((prev) => [...prev, `收到：${event.data}`])
    }
    return () => channel.close()
  }, [])

  function broadcast() {
    if (typeof BroadcastChannel === 'undefined') return
    const channel = new BroadcastChannel(CHANNEL_NAME)
    const message = `來自某分頁 @ ${new Date().toLocaleTimeString()}`
    channel.postMessage(message)
    channel.close()
  }

  return (
    <div className="space-y-2">
      <p className="text-sm">開兩個分頁開著這一題，點擊下方按鈕廣播，另一個分頁會收到訊息（自己不會收到）。</p>
      <Button onClick={broadcast}>廣播訊息</Button>
      <ul className="list-disc pl-4 text-xs text-slate-600">
        {log.map((entry, i) => (
          <li key={i}>{entry}</li>
        ))}
      </ul>
      <p className="text-xs text-slate-500">
        跨來源（iframe/彈窗）要改用 <code>postMessage</code>，且務必驗證 <code>event.origin</code>。
      </p>
    </div>
  )
}
