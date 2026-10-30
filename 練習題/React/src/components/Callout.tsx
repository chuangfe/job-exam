import type { ReactNode } from 'react'

export function Callout(props: { children: ReactNode }) {
  return <div className="rounded-md border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">{props.children}</div>
}
