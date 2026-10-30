'use client'

import { useState, type ReactNode } from 'react'

// Client Component 不能「直接 import 並 render」Server Component，
// 但可以把 Server Component 當作 children 傳進來做組合——children 在 Server 端就已經
// 渲染成 RSC payload 了，Client Component 只是負責「要不要顯示它」，不需要知道它是怎麼生成的。
export function ClientAccordion(props: { title: string; children: ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ border: '1px solid #ccc', borderRadius: 6, padding: '0.5rem 1rem' }}>
      <button onClick={() => setOpen((o) => !o)}>
        {open ? '▼' : '▶'} {props.title}
      </button>
      {open && <div>{props.children}</div>}
    </div>
  )
}
