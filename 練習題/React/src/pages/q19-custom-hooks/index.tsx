// Q19：自訂 hook — useDebounce / usePrevious / useFetch
// 三個常見自訂 hook 的實作：debounce 一個隨時間變動的值、取得前一次渲染的值、
// 處理資料抓取的 loading/error/競態/卸載清理。答案區塊附可互動 demo，可在輸入框打字觀察。
import { QuestionPage, Section } from '../../QuestionPage'
import { Problem } from './components/Problem'
import { Solution } from './components/Solution'

export default function Page() {
  return (
    <QuestionPage title="Q19 自訂 hook：useDebounce / usePrevious / useFetch">
      <Section label="題目">
        <Problem />
      </Section>
      <Section label="答案">
        <Solution />
      </Section>
    </QuestionPage>
  )
}
