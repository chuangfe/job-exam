// Q20：Todo 效能優化
// 題目版：切換任一項，整個清單都重渲染（可在畫面上看每項的 render 次數，或打開 React DevTools
// Profiler 錄製點擊，觀察所有項目都亮起）。
// 答案版：用 React.memo + useCallback（函式式更新讓依賴陣列為空）+ 穩定 id key 三件事，
// 做到只有被點的那一項重渲染。
import { QuestionPage, Section } from '../../QuestionPage'
import { Problem } from './components/Problem'
import { Solution } from './components/Solution'

export default function Page() {
  return (
    <QuestionPage title="Q20 Todo 效能優化">
      <Section label="題目">
        <Problem />
      </Section>
      <Section label="答案">
        <Solution />
      </Section>
    </QuestionPage>
  )
}
