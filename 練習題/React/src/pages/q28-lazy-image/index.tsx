// Q28：圖片懶載入（Lazy Loading）
// 原生 loading="lazy" 最簡單；要自訂提前距離用 IntersectionObserver，載入後記得 disconnect。
// 務必預留寬高或 aspect-ratio，避免圖片出現時推擠版面造成 CLS。
import { QuestionPage, Section } from '../../QuestionPage'
import { Problem } from './components/Problem'
import { Solution } from './components/Solution'

export default function Page() {
  return (
    <QuestionPage title="Q28 圖片懶載入（Lazy Loading）">
      <Section label="題目">
        <Problem />
      </Section>
      <Section label="答案">
        <Solution />
      </Section>
    </QuestionPage>
  )
}
