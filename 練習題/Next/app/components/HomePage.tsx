import Link from 'next/link'
import type { NextQuestionMeta } from '../questions'

export function HomePage(props: { questions: NextQuestionMeta[] }) {
  return (
    <main>
      <h1>Next.js 練習題</h1>
      {props.questions.length === 0 && <p>尚無題目</p>}
      <ul>
        {props.questions.map((q) => (
          <li key={q.id}>
            {q.number} {q.title}：
            {'combined' in q.routes ? (
              <Link href={q.routes.combined}>查看</Link>
            ) : (
              <>
                <Link href={q.routes.problem}>題目</Link>
                {' / '}
                <Link href={q.routes.solution}>答案</Link>
              </>
            )}
          </li>
        ))}
      </ul>
    </main>
  )
}
