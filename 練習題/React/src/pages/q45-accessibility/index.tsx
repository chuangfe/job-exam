// Q45：網頁可及性 a11y（WCAG POUR 原則）
// 語意化 HTML 是地基：div 當按鈕會少掉原生的鍵盤操作、focus、role。ARIA 第一守則是
// 「沒有 ARIA 比用錯 ARIA 好」，原生元素夠用就不用補。Modal 這類覆蓋層要做「焦點管理」：
// 開啟時焦點移入、Tab 在內部循環（焦點陷阱）、關閉時焦點還給觸發元素，否則鍵盤使用者會迷路。
import { QuestionPage, Section } from '../../QuestionPage'
import { Problem } from './components/Problem'
import { Solution } from './components/Solution'

export default function Page() {
  return (
    <QuestionPage title="Q45 網頁可及性 a11y">
      <Section label="題目">
        <Problem />
      </Section>
      <Section label="答案">
        <Solution />
      </Section>
    </QuestionPage>
  )
}
