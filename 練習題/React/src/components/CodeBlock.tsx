export function CodeBlock(props: { code: string }) {
  return (
    <pre className="overflow-x-auto rounded-md bg-slate-900 p-3 text-xs text-slate-100">
      <code>{props.code}</code>
    </pre>
  )
}
