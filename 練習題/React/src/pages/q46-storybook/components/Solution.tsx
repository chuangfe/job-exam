import { CodeBlock } from '../../../components/CodeBlock'

// CSF3：每個 story 是一個物件（不是函式），default export（meta）宣告 title/component/argTypes，
// 具名 export 是各個變體/狀態。tags: ['autodocs'] 自動產生 props table 文件頁。
// play function 可以在 story render 後模擬互動並斷言，CI 用 test-runner 一次全部跑完。
export function Solution() {
  return (
    <div className="space-y-2">
      <CodeBlock
        code={`// Button.stories.tsx\nconst meta = {\n  title: 'Components/Button',\n  component: Button,\n  tags: ['autodocs'],\n  argTypes: { variant: { control: 'select', options: ['primary', 'danger'] } },\n} satisfies Meta<typeof Button>\nexport default meta\n\nexport const Loading: StoryObj<typeof Button> = {\n  args: { loading: true },\n}\n\nexport const ClickInteraction: StoryObj<typeof Button> = {\n  args: { children: '送出' },\n  play: async ({ canvasElement, args }) => {\n    const canvas = within(canvasElement)\n    await userEvent.click(canvas.getByRole('button'))\n    expect(args.onClick).toHaveBeenCalled()\n  },\n}`}
      />
      <p className="text-xs text-slate-500">
        loading / error / empty 各開一個 story，是因為它們是設計師、QA、視覺回歸都需要「穩定重現」
        的狀態，不能依賴真實後端。a11y addon 用 axe-core 檢測，能擋 CI 但不能保證 100% 可及，仍需人工測試。
      </p>
    </div>
  )
}
