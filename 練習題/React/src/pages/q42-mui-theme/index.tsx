// Q42：MUI（v5+）主題與樣式系統
// MUI 底層用 Emotion，theme 物件（palette/typography/spacing/breakpoints/shape/shadows/zIndex）
// 是整套設計系統的單一事實來源。sx prop 是「theme-aware」的 inline style；styled() 用來做可複用、
// 有多個變體的元件。全域覆寫放 theme.components（styleOverrides/defaultProps/variants），
// 一次性微調才用 sx。CSS-in-JS 在 SSR（Next.js）要注意 runtime 開銷與樣式注入順序。
import { QuestionPage, Section } from '../../QuestionPage'
import { Problem } from './components/Problem'
import { Solution } from './components/Solution'

export default function Page() {
  return (
    <QuestionPage title="Q42 MUI 主題與樣式系統">
      <Section label="題目">
        <Problem />
      </Section>
      <Section label="答案">
        <Solution />
      </Section>
    </QuestionPage>
  )
}
