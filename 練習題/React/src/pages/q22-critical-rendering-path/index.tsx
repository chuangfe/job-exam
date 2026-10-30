// Q22：Critical Rendering Path（關鍵渲染路徑）
// 瀏覽器從拿到 HTML 到畫面出現在螢幕上要經過的完整步驟，以及哪些資源會卡住這條路徑。
import { QuestionPage, Section } from '../../QuestionPage'
import { Problem } from './components/Problem'
import { Solution } from './components/Solution'

export default function Page() {
  return (
    <QuestionPage title="Q22 Critical Rendering Path（關鍵渲染路徑）">
      <Section label="題目">
        <Problem />
      </Section>
      <Section label="答案">
        <Solution />
      </Section>
    </QuestionPage>
  )
}
