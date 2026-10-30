// Q18：React 觀念 Q&A
// VDOM/reconciliation、key、useState/useEffect 時序、依賴陷阱、useMemo/useCallback/memo、
// Context 重渲染、受控 vs 非受控、batching——面試常考的 8 個 React 核心觀念。
// 題目區塊只列問題，答案區塊附完整解析，建議先自己口述再對照。
import { QuestionPage, Section } from '../../QuestionPage'
import { Problem } from './components/Problem'
import { Solution } from './components/Solution'

export default function Page() {
  return (
    <QuestionPage title="Q18 React 觀念 Q&A">
      <Section label="題目">
        <Problem />
      </Section>
      <Section label="答案">
        <Solution />
      </Section>
    </QuestionPage>
  )
}
