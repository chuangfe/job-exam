// Q25：CORS（跨來源資源共享）
// 瀏覽器的同源政策預設擋下跨源讀取，CORS 讓伺服器用回應標頭明確授權特定來源。
// 非簡單請求（PUT/DELETE、自訂標頭、application/json）會先發 OPTIONS 預檢。
import { QuestionPage, Section } from '../../QuestionPage'
import { Problem } from './components/Problem'
import { Solution } from './components/Solution'

export default function Page() {
  return (
    <QuestionPage title="Q25 CORS（跨來源資源共享）">
      <Section label="題目">
        <Problem />
      </Section>
      <Section label="答案">
        <Solution />
      </Section>
    </QuestionPage>
  )
}
