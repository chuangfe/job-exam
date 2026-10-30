// Q44：React Hook Form 與複雜表單體驗
// 受控表單（useState）打字會重 render 整個元件；RHF 用非受控 + ref + 訂閱式更新，
// 大幅減少重渲染（只有 errors/watch 這類訂閱才觸發）。大型表單偏好 schema 驗證（zodResolver），
// 單一來源、可用 z.infer 推導型別。整合受控 UI 元件（MUI TextField/Select）要用 Controller。
import { QuestionPage, Section } from '../../QuestionPage'
import { Problem } from './components/Problem'
import { Solution } from './components/Solution'

export default function Page() {
  return (
    <QuestionPage title="Q44 React Hook Form 與複雜表單體驗">
      <Section label="題目">
        <Problem />
      </Section>
      <Section label="答案">
        <Solution />
      </Section>
    </QuestionPage>
  )
}
