import { useState } from 'react'

// TODO: 每個區塊的顏色都是獨立算出來的（primitive 直接寫死在元件裡），
// 沒有 semantic 層。想新增第三個區塊時，又要重複寫一次 light/dark 兩色。
export function Problem() {
  const [dark, setDark] = useState(false)

  const cardBg = dark ? '#1e293b' : '#ffffff'
  const cardText = dark ? '#f1f5f9' : '#0f172a'
  const panelBg = dark ? '#0f172a' : '#f8fafc' // 跟 cardBg 不同來源，容易兩個區塊深色模式顏色對不齊

  return (
    <div className="space-y-2">
      <button onClick={() => setDark((d) => !d)} className="rounded bg-slate-900 px-2 py-1 text-xs text-white">
        切換（{dark ? '暗色' : '亮色'}）
      </button>
      <div style={{ background: cardBg, color: cardText }} className="rounded-md p-3 text-sm">
        卡片：顏色寫死在這個元件裡
      </div>
      <div style={{ background: panelBg, color: cardText }} className="rounded-md p-3 text-sm">
        面板：顏色又寫死一次，容易跟卡片不一致
      </div>
    </div>
  )
}
