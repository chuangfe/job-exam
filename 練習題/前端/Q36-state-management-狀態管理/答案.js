/*
【答案】手寫 mini-Redux（狀態管理核心）

Redux 三大原則（面試常考）：
1. 單一資料來源（Single source of truth）：整個 app 的 state 存在單一 store。
2. State 唯讀（State is read-only）：只能透過 dispatch(action) 改變，不可直接
   賦值 state。action 是「描述發生什麼事」的純物件（一定要有 type）。
3. 用純函式修改（Changes via pure reducers）：reducer 是 (state, action) => newState
   的純函式。

reducer 為何一定要純函式？
- 相同輸入必得相同輸出、無副作用（不打 API、不改外部變數、不用 Date.now/Math.random）。
- 不可變更新（immutable）：不能改動傳入的 state，而是回傳新物件/新陣列。
  React-Redux 靠「參考是否改變」(===) 來判斷要不要重繪；若原地 mutate，
  參考沒變 → 元件不會更新，造成畫面與資料不同步的 bug。
- 純與不可變也讓時間旅行除錯（time-travel debugging）、可預測性、可測試性成立。

實作重點：
- state 放在 closure；dispatch 時 state = reducer(state, action)，再依序呼叫 listeners。
- subscribe 回傳 unsubscribe（closure 記住自己），呼叫後把該 listener 從清單移除。
  這裡用「快照 + isSubscribed 旗標」避免在通知過程中增刪 listener 造成的問題。
- combineReducers 走訪每個 key，對子 state 呼叫子 reducer；若所有子樹參考都沒變，
  可回傳同一個 state 物件（此處為求清楚每次回傳新物件，但保留未變子樹的原參考）。

對照現代狀態管理方案（資深面試取捨）：
- Redux Toolkit（RTK，現今官方推薦）：
  * configureStore 取代 createStore，內建 redux-thunk、DevTools、immutable/serializable 檢查。
  * createSlice 一次產出 reducer + actions，內部用 Immer，讓你「看似 mutate」
    (state.value += 1) 實際產生不可變更新，大幅減少樣板碼。
  * createAsyncThunk / RTK Query 處理非同步與資料快取。
  適用：大型、多人協作、需要嚴謹可預測資料流與強大 DevTools/中介層的專案。

- Recoil（Facebook 實驗性，發展趨緩）：atom（最小狀態單位）+ selector（衍生狀態，
  可同步/非同步）。以「原子」為粒度訂閱，元件只重繪用到的 atom。
  適用：狀態圖相依複雜、需要細粒度訂閱與衍生資料的中大型 React app。

- Jotai（輕量、原子化，Recoil 精神的後繼者）：atom 極簡 API，primitive atom 與
  derived atom 組合，bottom-up。體積小、TypeScript 友善、無 Provider 樣板（可選）。
  適用：想要原子化細粒度更新、又不想背 Redux 樣板的中小型專案。

- Context + useReducer（React 內建）：不需第三方套件即可做全域狀態。
  但 Context 一變動，所有 consumer 都會重繪（無選擇性訂閱），且無中介層/DevTools。
  適用：低頻變動的全域資料（主題、語系、登入使用者）、或小型 app。
  高頻更新或大型狀態樹用它會有效能問題，此時應改用 Redux/Zustand/Jotai。

一句話取捨：小而低頻 → Context+useReducer；要原子細粒度又輕量 → Jotai；
大型嚴謹資料流 + DevTools/中介層 → Redux Toolkit。
*/

// createStore：建立 store
function createStore(reducer, preloadedState) {
  let state = preloadedState;
  let listeners = [];

  // 初始化：dispatch 一個不會被任何 case 命中的 action，讓 reducer 走 default
  // 回傳初始 state（例如子 reducer 的預設參數值）。
  state = reducer(state, { type: '@@mini-redux/INIT' });

  function getState() {
    return state;
  }

  function dispatch(action) {
    state = reducer(state, action);
    // 用快照通知，避免通知過程中有人 subscribe/unsubscribe 影響本輪迭代
    const current = listeners.slice();
    for (const listener of current) listener();
    return action;
  }

  function subscribe(listener) {
    let isSubscribed = true;
    listeners.push(listener);

    return function unsubscribe() {
      if (!isSubscribed) return; // 防止重複取消
      isSubscribed = false;
      const index = listeners.indexOf(listener);
      if (index !== -1) listeners.splice(index, 1);
    };
  }

  return { getState, dispatch, subscribe };
}

// combineReducers：合併多個子 reducer
function combineReducers(reducersMap) {
  const keys = Object.keys(reducersMap);

  return function rootReducer(state = {}, action) {
    const nextState = {};
    let hasChanged = false;

    for (const key of keys) {
      const subReducer = reducersMap[key];
      const previous = state[key];
      const next = subReducer(previous, action);
      nextState[key] = next;
      if (next !== previous) hasChanged = true; // 未變的子樹保留原參考
    }

    // 若沒有任何子樹改變，回傳原 state（維持參考穩定，利於 === 比較）
    return hasChanged || Object.keys(state).length !== keys.length ? nextState : state;
  };
}

// ===== 測試 =====
const assert = require('node:assert');

// counter reducer：INCREMENT / DECREMENT / ADD(payload)
function counter(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT': return state + 1;
    case 'DECREMENT': return state - 1;
    case 'ADD': return state + action.payload;
    default: return state;
  }
}

// todos reducer：ADD_TODO(payload)
function todos(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO': return [...state, action.payload];
    default: return state;
  }
}

// 1) dispatch 後 getState 更新
{
  const store = createStore(counter);
  assert.strictEqual(store.getState(), 0);
  store.dispatch({ type: 'INCREMENT' });
  assert.strictEqual(store.getState(), 1);
  store.dispatch({ type: 'ADD', payload: 5 });
  assert.strictEqual(store.getState(), 6);
  store.dispatch({ type: 'DECREMENT' });
  assert.strictEqual(store.getState(), 5);
}

// 2) preloadedState 生效
{
  const store = createStore(counter, 10);
  assert.strictEqual(store.getState(), 10);
}

// 3) subscribe 會被呼叫；unsubscribe 後不再被呼叫
{
  const store = createStore(counter);
  let calls = 0;
  const unsubscribe = store.subscribe(() => { calls += 1; });
  store.dispatch({ type: 'INCREMENT' });
  store.dispatch({ type: 'INCREMENT' });
  assert.strictEqual(calls, 2);
  unsubscribe();
  store.dispatch({ type: 'INCREMENT' });
  assert.strictEqual(calls, 2); // 取消後不再增加
}

// 4) 多個訂閱者互相獨立；取消其一不影響其他
{
  const store = createStore(counter);
  let a = 0;
  let b = 0;
  const unsubA = store.subscribe(() => { a += 1; });
  store.subscribe(() => { b += 1; });
  store.dispatch({ type: 'INCREMENT' });
  assert.strictEqual(a, 1);
  assert.strictEqual(b, 1);
  unsubA();
  store.dispatch({ type: 'INCREMENT' });
  assert.strictEqual(a, 1);
  assert.strictEqual(b, 2);
}

// 5) combineReducers：各子樹獨立更新
{
  const rootReducer = combineReducers({ counter, todos });
  const store = createStore(rootReducer);
  assert.deepStrictEqual(store.getState(), { counter: 0, todos: [] });

  store.dispatch({ type: 'INCREMENT' });
  assert.deepStrictEqual(store.getState(), { counter: 1, todos: [] });

  store.dispatch({ type: 'ADD_TODO', payload: '寫題目' });
  assert.deepStrictEqual(store.getState(), { counter: 1, todos: ['寫題目'] });

  // 更新 todos 子樹時，counter 子樹的參考不變（未受影響）
  const before = store.getState();
  store.dispatch({ type: 'ADD_TODO', payload: '複習' });
  const after = store.getState();
  assert.deepStrictEqual(after.todos, ['寫題目', '複習']);
  assert.strictEqual(after.counter, before.counter);
}

console.log('✅ 通過');
