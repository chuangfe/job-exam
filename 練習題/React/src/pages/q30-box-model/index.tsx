// Q30：盒模型（content-box / border-box）
// CSS 的 box-sizing 決定 width 這個數字算不算進 padding 和 border。
import { QuestionPage, Section } from '../../QuestionPage'
import { Problem } from './components/Problem'
import { Solution } from './components/Solution'

export default function Page() {
  return (
    <QuestionPage title="Q30 盒模型（content-box / border-box）">
      <Section label="題目">
        <Problem />
      </Section>
      <Section label="答案">
        <Solution />
      </Section>
    </QuestionPage>
  )
}
