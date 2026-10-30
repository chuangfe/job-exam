// Q46：Storybook 元件文件化
// Storybook 是設計師與工程師的「契約」：隔離開發元件、把每個狀態都變成可瀏覽的 story，
// 是比手寫 Markdown 更不容易過期的「活文件」。CSF3 + autodocs 自動產生文件頁；
// play function + @storybook/test 做互動測試；Chromatic/Playwright 做視覺回歸。
import { QuestionPage, Section } from '../../QuestionPage'
import { Problem } from './components/Problem'
import { Solution } from './components/Solution'

export default function Page() {
  return (
    <QuestionPage title="Q46 Storybook 元件文件化">
      <Section label="題目">
        <Problem />
      </Section>
      <Section label="答案">
        <Solution />
      </Section>
    </QuestionPage>
  )
}
