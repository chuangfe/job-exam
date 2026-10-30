import { useRef, useState } from 'react'

interface Todo {
  id: number
  text: string
  done: boolean
}

const initialTodos: Todo[] = [
  { id: 1, text: '寫 debounce', done: false },
  { id: 2, text: '練 React 觀念', done: false },
  { id: 3, text: '複習 CSS', done: false },
]

// 沒有 memo，且 onToggle 每次 render 都是新函式參考 → 子元件無法略過重渲染。
function TodoItem({ todo, onToggle }: { todo: Todo; onToggle: (id: number) => void }) {
  const renderCount = useRef(0)
  renderCount.current += 1

  return (
    <li
      onClick={() => onToggle(todo.id)}
      className="cursor-pointer rounded border border-slate-200 px-2 py-1"
      style={{ textDecoration: todo.done ? 'line-through' : 'none' }}
    >
      {todo.text}（render 次數：{renderCount.current}）
    </li>
  )
}

export function Problem() {
  const [todos, setTodos] = useState(initialTodos)

  // 直接依賴 todos，每次父層重渲染都是新函式參考。
  const onToggle = (id: number) => {
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  }

  return (
    <div className="space-y-2 text-sm">
      <p>點任一項，觀察：是只有該項的 render 次數增加，還是全部都增加？</p>
      <ul className="space-y-1">
        {todos.map((t) => (
          <TodoItem key={t.id} todo={t} onToggle={onToggle} />
        ))}
      </ul>
    </div>
  )
}
