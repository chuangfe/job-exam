import { useEffect, useRef, useState } from 'react'

// 安全上限：原始錯誤版完全沒有終止條件，會真的無限迴圈、灌爆瀏覽器。
// 這裡加一個「示範用」的停止點，純粹是為了這個頁面不會真的把分頁卡死——
// 重點是觀察「停止前」衝很快的 count，而不是研究這個 SAFETY_CAP 本身。
const SAFETY_CAP = 40

export function Problem() {
  const [data, setData] = useState({ count: 0 })
  const stopped = useRef(false)

  // 錯誤版：沒有依賴陣列 → 每次渲染後都執行 → effect 內無條件 setState → 觸發新渲染 → 再執行 effect...
  useEffect(() => {
    if (data.count >= SAFETY_CAP) {
      stopped.current = true
      return
    }
    setData({ count: data.count + 1 })
  })

  return (
    <div className="text-sm">
      <p className="text-3xl font-mono font-bold">{data.count}</p>
      <p className="text-slate-600">{stopped.current ? `已在 ${SAFETY_CAP} 次時被安全上限擋下（原始 bug 本身沒有這個上限，會真的無限跑）` : '持續飆升中...'}</p>
    </div>
  )
}
