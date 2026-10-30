import { useState } from 'react'

// semantic token 用 CSS 變數當執行期載體：只在容器上覆寫變數值，底下所有元件靠 CSS 繼承
// （cascade）自動跟著變，不用重寫 DOM、也不用在每個元件裡各自判斷 dark/light。
// 真實專案會放在 :root + [data-theme="dark"]；這裡為了不影響整頁示範，改成 scoped 在這個容器上。
const tokens = {
  light: { '--color-bg': '#ffffff', '--color-bg-alt': '#f8fafc', '--color-text': '#0f172a' },
  dark: { '--color-bg': '#1e293b', '--color-bg-alt': '#0f172a', '--color-text': '#f1f5f9' },
}

export function Solution() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  return (
    <div data-theme={theme} style={tokens[theme] as React.CSSProperties} className="space-y-2">
      <button
        onClick={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}
        className="rounded bg-slate-900 px-2 py-1 text-xs text-white"
      >
        切換（{theme === 'light' ? '亮色' : '暗色'}）
      </button>
      <div style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }} className="rounded-md p-3 text-sm">
        卡片：只引用 var(--color-bg)
      </div>
      <div
        style={{ background: 'var(--color-bg-alt)', color: 'var(--color-text)' }}
        className="rounded-md p-3 text-sm"
      >
        面板：引用 var(--color-bg-alt)，跟卡片共用同一組 token，保證一致
      </div>
      <p className="text-xs text-slate-500">
        正式環境要避免切換閃爍（FOUC）：SSR 時用 head 內同步 inline script 在繪製前先設好
        `data-theme`，不能靠 React effect（effect 在 paint 之後才跑）。
      </p>
    </div>
  )
}
