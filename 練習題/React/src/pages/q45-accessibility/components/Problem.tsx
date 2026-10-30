import { useState } from 'react'

// TODO（不可及版本）：
// - 用 div 拼出來，沒有 role="dialog" / aria-modal，螢幕報讀器不知道這是對話框
// - 開啟時焦點沒有移進來、關閉時也沒有還給觸發按鈕
// - Tab 鍵會跑出 modal 外面，不是「焦點陷阱」
// - 關閉按鈕只有一個「✕」文字，沒有 aria-label，報讀器會唸出意義不明的符號
function BadModal(props: { open: boolean; onClose: () => void }) {
  if (!props.open) return null
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/40"
      onClick={props.onClose}
    >
      <div className="rounded bg-white p-4" onClick={(e) => e.stopPropagation()}>
        <div className="font-semibold">確認刪除</div>
        <div className="text-sm text-slate-600">此操作無法復原，確定要刪除嗎？</div>
        <div className="mt-2 flex gap-2">
          <div className="cursor-pointer rounded border px-2 py-1 text-sm" onClick={props.onClose}>
            取消
          </div>
          <div className="cursor-pointer rounded bg-red-600 px-2 py-1 text-sm text-white" onClick={props.onClose}>
            刪除
          </div>
        </div>
        <div className="mt-2 cursor-pointer text-xs" onClick={props.onClose}>
          ✕
        </div>
      </div>
    </div>
  )
}

export function Problem() {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <button className="rounded bg-slate-900 px-2 py-1 text-xs text-white" onClick={() => setOpen(true)}>
        開啟（不可及版）
      </button>
      <BadModal open={open} onClose={() => setOpen(false)} />
    </div>
  )
}
