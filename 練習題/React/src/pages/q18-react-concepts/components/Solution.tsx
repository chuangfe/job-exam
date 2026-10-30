interface QaAnswer {
  question: string
  answer: string
}

const answers: QaAnswer[] = [
  {
    question: '虛擬 DOM 與 reconciliation？',
    answer:
      '虛擬 DOM 是描述 UI 的 JS 物件樹。狀態變更時產生新 VDOM，與舊樹 diff，只把差異套用到真實 DOM。diff 是啟發式 O(n)：不同型別節點整顆重建、同型別比對 props、同層 children 用 key 比對。Fiber 架構讓 reconciliation 可中斷、分片，支援並行渲染與優先級排程。',
  },
  {
    question: 'key 的作用？',
    answer:
      'key 讓 React 在列表 diff 時辨識哪些項目新增/移動/刪除，重用對應的 Fiber 與 DOM。用 index 當 key 時，若列表會插入/刪除/排序，index 與內容對不上，導致狀態錯位（如輸入框值跑到別列）、非必要重渲染。',
  },
  {
    question: 'useState / useEffect 如何運作？',
    answer:
      'Hooks 依呼叫順序存於 Fiber 的 hook 鏈結串列，故不可在條件/迴圈中呼叫。setX(prev => ...) 的函式式更新可避免讀到過期閉包值。useEffect 在渲染並 commit 到畫面後非同步執行；useLayoutEffect 在 commit 後、瀏覽器繪製前同步執行（適合量測 DOM）。',
  },
  {
    question: 'useEffect 依賴陷阱與清理？',
    answer:
      '依賴陣列要列出 effect 內用到的所有外部值，否則讀到過期值（stale closure）。空陣列只在掛載執行一次；省略陣列每次渲染都執行。清理函式在下次 effect 執行前與卸載時呼叫，用來取消訂閱、清 timer、abort fetch。',
  },
  {
    question: 'useMemo / useCallback / React.memo 何時用？',
    answer:
      'React.memo 以 props 淺比較跳過子元件重渲染；useCallback 記憶函式參考，避免 memo 子元件或依賴陣列因新函式而失效；useMemo 記憶昂貴計算結果。三者都有成本，只在真的昂貴或需要穩定參考時才有意義。',
  },
  {
    question: 'Context 與重渲染問題？',
    answer:
      'Context value 變更時所有 consumer 都會重渲染，不論用到的是哪部分。優化：拆分多個 Context（狀態與 dispatch 分開）、value 用 useMemo 穩定、不依賴 context 的子樹用 children 傳入、或改用外部 store 做選擇性訂閱。',
  },
  {
    question: '受控 vs 非受控元件？',
    answer: '受控：值由 state 驅動（value + onChange），單一資料來源、易驗證。非受控：值由 DOM 自己管，用 ref 讀取（defaultValue），表單簡單或整合非 React 程式時用。',
  },
  {
    question: '批次更新（batching）？',
    answer: 'React 18 起，所有情境（含 setTimeout、Promise、原生事件）預設自動批次合併多次 setState 成一次渲染。需要強制同步更新可用 flushSync，但會犧牲效能，少用。',
  },
]

export function Solution() {
  return (
    <ol className="list-decimal space-y-3 pl-5 text-sm">
      {answers.map((item) => (
        <li key={item.question}>
          <p className="font-medium">{item.question}</p>
          <p className="text-slate-600">{item.answer}</p>
        </li>
      ))}
    </ol>
  )
}
