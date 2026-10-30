// Q31：flex vs grid
// flex 是一維排列（一列或一欄），grid 是二維排列（同時控制列與欄）。
// 題目用的是更早期的排版手法：float + margin。
import { QuestionPage, Section } from '../../QuestionPage'
import { Problem } from './components/Problem'
import { Solution } from './components/Solution'

export default function Page() {
  return (
    <QuestionPage title="Q31 flex vs grid">
      <Section label="題目">
        <Problem />
      </Section>
      <Section label="答案">
        <Solution />
      </Section>
    </QuestionPage>
  )
}
