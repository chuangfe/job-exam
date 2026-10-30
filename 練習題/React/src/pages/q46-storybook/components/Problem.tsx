import { CodeBlock } from '../../../components/CodeBlock'

// TODO：沒有 Storybook 時常見的做法——開一個「測試頁」把元件全部塞進去手動點一遍。
// 問題：沒有隔離開發、設計師看不到各種狀態、沒有自動化、改了元件不知道哪裡壞掉。
export function Problem() {
  return (
    <div className="space-y-2">
      <p className="text-sm">在 App.tsx 裡硬塞一個「元件測試頁」：</p>
      <CodeBlock
        code={`function DebugPage() {\n  return (\n    <>\n      <Button>預設</Button>\n      <Button loading>載入中（忘記做這個 variant）</Button>\n      {/* 設計師要看 error 狀態？只能請工程師手動改 props 再重整 */}\n    </>\n  )\n}`}
      />
      <p className="text-xs text-slate-500">
        沒有隔離開發、沒有活文件、沒有視覺回歸防線——元件庫一大就失控。
      </p>
    </div>
  )
}
