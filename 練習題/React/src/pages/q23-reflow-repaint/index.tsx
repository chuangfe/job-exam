// Q23：reflow（回流）vs repaint（重繪）
// 改「形狀/位置」會觸發 reflow + repaint；只改「外觀」只觸發 repaint。reflow 比較貴，
// 因為可能牽動整棵渲染樹重新計算位置。這一題用「layout thrashing vs 批次讀寫」實際測出耗時差異，
// 建議打開 Chrome DevTools Performance 面板錄製，比較兩邊 Layout 事件的數量與總時間。
import { QuestionPage, Section } from '../../QuestionPage'
import { Problem } from './components/Problem'
import { Solution } from './components/Solution'

export default function Page() {
  return (
    <QuestionPage title="Q23 reflow（回流）vs repaint（重繪）">
      <Section label="題目">
        <Problem />
      </Section>
      <Section label="答案">
        <Solution />
      </Section>
    </QuestionPage>
  )
}
