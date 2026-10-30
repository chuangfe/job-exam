import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

export function QuestionPage(props: { title: string; children: ReactNode }) {
  return (
    <div className="question-page">
      <p>
        <Link to="/" className="text-sm text-slate-500 hover:underline">
          ← 回題目列表
        </Link>
      </p>
      <h1 className="mb-4 text-2xl font-bold">{props.title}</h1>
      <div className="question-page-sections">{props.children}</div>
    </div>
  )
}

export function Section(props: { label: '題目' | '答案'; children: ReactNode }) {
  return (
    <section className="question-section">
      <h2 className="mb-3 text-lg font-semibold text-slate-700">{props.label}</h2>
      {props.children}
    </section>
  )
}
