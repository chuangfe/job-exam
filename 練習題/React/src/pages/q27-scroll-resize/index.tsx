// Q27：scroll/resize 該用防抖還是節流？
// 過程中要持續反應 -> throttle；只需結束後處理一次 -> debounce。
// 更現代的做法是改用 IntersectionObserver / ResizeObserver，完全不監聽原生事件。
import { QuestionPage, Section } from '../../QuestionPage'
import { Problem } from './components/Problem'
import { Solution } from './components/Solution'

export default function Page() {
  return (
    <QuestionPage title="Q27 scroll/resize 該用防抖還是節流？">
      <Section label="題目">
        <Problem />
      </Section>
      <Section label="答案">
        <Solution />
      </Section>
    </QuestionPage>
  )
}
