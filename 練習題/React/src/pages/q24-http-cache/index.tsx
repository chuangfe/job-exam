// Q24：HTTP 快取（Cache-Control / ETag）
// 強快取命中時完全不發請求；過期後帶驗證標頭做協商快取，沒變就回 304（無 body）。
import { QuestionPage, Section } from '../../QuestionPage'
import { Problem } from './components/Problem'
import { Solution } from './components/Solution'

export default function Page() {
  return (
    <QuestionPage title="Q24 HTTP 快取（Cache-Control / ETag）">
      <Section label="題目">
        <Problem />
      </Section>
      <Section label="答案">
        <Solution />
      </Section>
    </QuestionPage>
  )
}
