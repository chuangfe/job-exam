// Q34：BFC（Block Formatting Context）
// float 元素會脫離一般的文件流，這會影響父容器怎麼計算自己的高度。
import { QuestionPage, Section } from '../../QuestionPage'
import { Problem } from './components/Problem'
import { Solution } from './components/Solution'

export default function Page() {
  return (
    <QuestionPage title="Q34 BFC（Block Formatting Context）">
      <Section label="題目">
        <Problem />
      </Section>
      <Section label="答案">
        <Solution />
      </Section>
    </QuestionPage>
  )
}
