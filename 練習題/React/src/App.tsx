import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HomePage } from './HomePage'
import { questions } from './questions'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage questions={questions} />} />
        {questions.map((q) => (
          <Route key={q.id} path={`/${q.id}`} element={<q.Page />} />
        ))}
      </Routes>
    </BrowserRouter>
  )
}
