import { useEffect, useState } from 'react'

// 修正：明確依賴陣列 + 終止條件（count < 5）+ 清理計時器。
export function Solution() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (count >= 5) return
    const id = setTimeout(() => setCount((c) => c + 1), 300)
    return () => clearTimeout(id)
  }, [count])

  return (
    <div className="text-sm">
      <p className="text-3xl font-mono font-bold">{count}</p>
      <p className="text-slate-600">{count >= 5 ? '已停在終止條件（count < 5）' : '穩定遞增中...'}</p>
    </div>
  )
}
