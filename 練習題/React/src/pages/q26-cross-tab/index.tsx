// Q26：跨頁 / 跨分頁溝通
// 同源多分頁：BroadcastChannel（最簡潔）或 localStorage + storage 事件。
// 跨來源：postMessage，務必驗證 origin。要共享連線/狀態：SharedWorker / Service Worker。
import { QuestionPage, Section } from '../../QuestionPage'
import { Problem } from './components/Problem'
import { Solution } from './components/Solution'

export default function Page() {
  return (
    <QuestionPage title="Q26 跨頁 / 跨分頁溝通">
      <Section label="題目">
        <Problem />
      </Section>
      <Section label="答案">
        <Solution />
      </Section>
    </QuestionPage>
  )
}
