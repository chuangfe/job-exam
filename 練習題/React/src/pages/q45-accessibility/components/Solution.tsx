import { useEffect, useRef, useState } from 'react'

// 可及版本：role="dialog" + aria-modal + aria-labelledby 讓報讀器知道這是對話框、標題是什麼；
// 開啟時把焦點移進對話框，Tab/Shift+Tab 在第一個與最後一個可聚焦元素之間循環（焦點陷阱），
// Escape 關閉，關閉後把焦點還給原本觸發的按鈕（否則鍵盤使用者會「迷失」在頁面上）。
function AccessibleModal(props: { open: boolean; onClose: () => void; triggerRef: React.RefObject<HTMLButtonElement | null> }) {
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!props.open) return
    const dialog = dialogRef.current
    const focusable = dialog?.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]')
    focusable?.[0]?.focus()

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        props.onClose()
        return
      }
      if (e.key !== 'Tab' || !focusable || focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      props.triggerRef.current?.focus()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.open])

  if (!props.open) return null
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-delete-title"
        className="rounded bg-white p-4"
      >
        <div id="confirm-delete-title" className="font-semibold">
          確認刪除
        </div>
        <div className="text-sm text-slate-600">此操作無法復原，確定要刪除嗎？</div>
        <div className="mt-2 flex gap-2">
          <button className="rounded border px-2 py-1 text-sm" onClick={props.onClose}>
            取消
          </button>
          <button className="rounded bg-red-600 px-2 py-1 text-sm text-white" onClick={props.onClose}>
            刪除
          </button>
        </div>
        <button aria-label="關閉對話框" className="mt-2 text-xs" onClick={props.onClose}>
          ✕
        </button>
      </div>
    </div>
  )
}

export function Solution() {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  return (
    <div>
      <button
        ref={triggerRef}
        className="rounded bg-slate-900 px-2 py-1 text-xs text-white"
        onClick={() => setOpen(true)}
      >
        開啟（可及版，試試 Tab / Shift+Tab / Esc）
      </button>
      <AccessibleModal open={open} onClose={() => setOpen(false)} triggerRef={triggerRef} />
    </div>
  )
}
