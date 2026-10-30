// Q21：修正 useEffect 無限迴圈
// 原因：缺依賴陣列（每次渲染後都執行 effect）+ effect 內無條件 setState（觸發新渲染）→ 循環不止。
// 題目版加了一個「示範安全上限」避免真的卡死瀏覽器分頁；答案版是正確修法：
// 補上依賴陣列、用函式式更新、加終止條件（count < 5），並清理計時器。
import { QuestionPage, Section } from '../../QuestionPage'
import { Problem } from './components/Problem'
import { Solution } from './components/Solution'

export default function Page() {
  return (
    <QuestionPage title="Q21 修正 useEffect 無限迴圈">
      <Section label="題目">
        <Problem />
      </Section>
      <Section label="答案">
        <Solution />
      </Section>
    </QuestionPage>
  )
}
