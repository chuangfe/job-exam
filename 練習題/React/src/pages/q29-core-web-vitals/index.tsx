// Q29：Core Web Vitals（核心網頁指標）
// LCP 看載入、CLS 看視覺穩定、INP（2024 取代 FID）看互動回應。
import { QuestionPage, Section } from '../../QuestionPage'
import { Problem } from './components/Problem'
import { Solution } from './components/Solution'

export default function Page() {
  return (
    <QuestionPage title="Q29 Core Web Vitals（核心網頁指標）">
      <Section label="題目">
        <Problem />
      </Section>
      <Section label="答案">
        <Solution />
      </Section>
    </QuestionPage>
  )
}
