import { useRef, useState } from 'react'
import { Stat } from '../../../components/Stat'

// TODO: 三個欄位都是 useState 受控元件，每打一個字整個元件就重 render 一次。
// 打開 React DevTools Profiler，打字時觀察 render 次數（下面的計數器也會跳）。
export function Problem() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const renderCount = useRef(0)
  renderCount.current += 1

  return (
    <div className="space-y-2">
      <input
        className="w-full rounded border px-2 py-1 text-sm"
        placeholder="姓名"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="w-full rounded border px-2 py-1 text-sm"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="w-full rounded border px-2 py-1 text-sm"
        placeholder="密碼"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Stat label="元件 render 次數" value={renderCount.current} />
    </div>
  )
}
