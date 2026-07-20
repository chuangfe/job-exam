/*
【題目】手寫 mini-Redux（狀態管理核心）

說明：
實作一個簡化版 Redux，包含兩個 API：

1) createStore(reducer, preloadedState) → { getState, dispatch, subscribe }
   - getState()：回傳當前 state。
   - dispatch(action)：用 reducer 算出新 state（newState = reducer(state, action)），
     並依序通知所有已註冊的訂閱者。回傳該 action。
   - subscribe(listener)：註冊監聽器，回傳一個 unsubscribe 函式；
     呼叫 unsubscribe 後，該 listener 不再於 dispatch 時被通知。

2) combineReducers(reducersMap) → reducer
   - 把 { key: subReducer } 合併成一個根 reducer。
   - 根 reducer 執行時，對每個 key 呼叫對應的 subReducer(state[key], action)，
     組出新的 state 物件。每棵子樹各自獨立更新。

提示：
- state 存在 closure 變數；dispatch 時重新賦值並跑過 listeners 陣列。
- unsubscribe 用「把該 listener 從陣列移除」或標記旗標的方式實作。
- combineReducers 回傳的函式要走訪 reducersMap 的每個 key。

範例：
  const counter = (state = 0, action) => {
    switch (action.type) {
      case 'INCREMENT': return state + 1;
      default: return state;
    }
  };
  const store = createStore(counter);
  store.dispatch({ type: 'INCREMENT' });
  store.getState(); // 1
*/

// createStore：建立 store
function createStore(reducer, preloadedState) {
  throw new Error('尚未實作 createStore');
}

// combineReducers：合併多個子 reducer
function combineReducers(reducersMap) {
  throw new Error('尚未實作 combineReducers');
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
