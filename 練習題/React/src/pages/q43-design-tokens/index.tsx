// Q43：Design Token 與 Dark Mode / 多品牌治理
// Token 分三層：primitive（原始值）→ semantic（語意，如 color.action.primary）→ component。
// 元件只該引用 semantic，不該直接引用 primitive——這樣切換品牌/深色模式只要換 primitive 層，
// 元件完全不用改。CSS Variables 是 token 的執行期載體：切主題只換變數值、不重寫 DOM。
// Style Dictionary 可以把同一份 token JSON 轉成 CSS 變數/JS 常數/iOS/Android 多平台輸出。
import { QuestionPage, Section } from '../../QuestionPage'
import { Problem } from './components/Problem'
import { Solution } from './components/Solution'

export default function Page() {
  return (
    <QuestionPage title="Q43 Design Token 與 Dark Mode">
      <Section label="題目">
        <Problem />
      </Section>
      <Section label="答案">
        <Solution />
      </Section>
    </QuestionPage>
  )
}
