// Q33：specificity（優先級）
// 兩條 CSS 規則同時套用在同一個元素上時，瀏覽器要決定誰贏——規則不只是「後寫的贏」這麼簡單。
import { QuestionPage, Section } from '../../QuestionPage'
import { Problem } from './components/Problem'
import { Solution } from './components/Solution'

export default function Page() {
  return (
    <QuestionPage title="Q33 specificity（優先級）">
      <Section label="題目">
        <Problem />
      </Section>
      <Section label="答案">
        <Solution />
      </Section>
    </QuestionPage>
  )
}
