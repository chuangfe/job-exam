import { Link } from 'react-router-dom'
import type { QuestionEntry } from './questions/registry'

export function HomePage(props: { questions: QuestionEntry[] }) {
  const categories = Array.from(new Set(props.questions.map((q) => q.category)))

  return (
    <div className="home-page space-y-8">
      <h1 className="text-2xl font-bold">React 練習題</h1>
      {categories.length === 0 && <p>尚無題目</p>}
      {categories.map((category) => (
        <section key={category}>
          <h2 className="mb-2 text-lg font-semibold text-slate-700">{category}</h2>
          <ul className="space-y-1">
            {props.questions
              .filter((q) => q.category === category)
              .map((q) => (
                <li key={q.id}>
                  <Link to={`/${q.id}`} className="text-slate-900 hover:underline">
                    {q.number} {q.title}
                  </Link>
                </li>
              ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
