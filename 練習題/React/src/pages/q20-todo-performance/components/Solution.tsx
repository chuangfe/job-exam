import { memo, useCallback, useRef, useState } from 'react'

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

// 三件事缺一不可：1) memo 包裝 2) onToggle 參考穩定 3) key 用穩定 id（不是 index）。
const TodoItem = memo(function TodoItem({ todo, onToggle }: { todo: Todo; onToggle: (id: number) => void }) {
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
})

export function Solution() {
  const [todos, setTodos] = useState(initialTodos)

  // 函式式更新讓依賴陣列保持空陣列，onToggle 參考永遠穩定，memo 才不會因新函式而失效。
  const onToggle = useCallback((id: number) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  }, [])

  return (
    <div className="space-y-2 text-sm">
      <p>點任一項，觀察：只有該項的 render 次數增加，其餘維持不變。</p>
      <ul className="space-y-1">
        {todos.map((t) => (
          <TodoItem key={t.id} todo={t} onToggle={onToggle} />
        ))}
      </ul>
    </div>
  )
}
