interface QaItem {
  question: string
  points: string[]
}

const items: QaItem[] = [
  { question: '虛擬 DOM 與 reconciliation（協調）是什麼？', points: ['虛擬 DOM 解決什麼問題？狀態變更時 React 做了哪些事？', 'React 的 diff 演算法用了哪些啟發式假設？', 'Fiber 架構帶來什麼能力？'] },
  { question: 'key 的作用？為何不要用 index 當 key？', points: ['key 在列表 diff 時扮演什麼角色？', '用 index 當 key 在插入/刪除/排序時會造成什麼可觀察的 bug？'] },
  { question: 'useState / useEffect 如何運作？', points: ['Hooks 為何不能寫在條件式或迴圈裡？', '「函式式更新」如何避免過期閉包？', 'useEffect 與 useLayoutEffect 執行時機差在哪？'] },
  { question: 'useEffect 的依賴陷阱與清理機制？', points: ['依賴陣列漏放會發生什麼？', '空陣列與省略陣列分別代表什麼？', '清理函式在什麼時機被呼叫？'] },
  { question: 'useMemo / useCallback / React.memo 何時用？', points: ['三者各自記憶什麼？', '什麼情況下包了反而沒意義？'] },
  { question: 'Context 的重渲染問題與優化？', points: ['Context value 變更時誰會重渲染？', '有哪些常見的優化手段？'] },
  { question: '受控 vs 非受控元件？', points: ['兩者差別與各自適用情境？'] },
  { question: '批次更新（batching）？', points: ['React 18 在 batching 行為上有什麼改變？', '強制同步更新要用什麼？代價是什麼？'] },
]

export function Problem() {
  return (
    <ol className="list-decimal space-y-3 pl-5 text-sm">
      {items.map((item) => (
        <li key={item.question}>
          <p className="font-medium">{item.question}</p>
          <ul className="list-disc space-y-0.5 pl-5 text-slate-600">
            {item.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  )
}
