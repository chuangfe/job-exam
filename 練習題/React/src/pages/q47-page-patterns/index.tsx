// Q47：常見頁型抽象與可組合元件
// 低設計輸入下，把 Layout/Form/Table/Dialog/Detail 這些常見頁型抽成樣板，交付從「畫像素」
// 變成「填內容」。UI 的四態（loading/error/empty/success）標準化成統一元件，避免每頁各寫一套。
// Compound Components / Slots / children 組合 / Polymorphic（as prop）是四種常見組合模式；
// 「重複有時比錯誤的抽象便宜」——出現三次穩定重複再抽象（Rule of Three）。
import { QuestionPage, Section } from '../../QuestionPage'
import { Problem } from './components/Problem'
import { Solution } from './components/Solution'

export default function Page() {
  return (
    <QuestionPage title="Q47 常見頁型抽象與可組合元件">
      <Section label="題目">
        <Problem />
      </Section>
      <Section label="答案">
        <Solution />
      </Section>
    </QuestionPage>
  )
}
