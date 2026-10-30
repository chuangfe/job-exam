import type { ReactNode } from 'react'

export function Card(props: { children: ReactNode }) {
  return <div className="rounded-md border border-slate-200 bg-white p-4 shadow-sm">{props.children}</div>
}
