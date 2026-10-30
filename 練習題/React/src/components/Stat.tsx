export function Stat(props: { label: string; value: string | number }) {
  return (
    <p className="text-sm text-slate-600">
      {props.label}：<span className="font-mono text-base font-semibold text-slate-900">{props.value}</span>
    </p>
  )
}
