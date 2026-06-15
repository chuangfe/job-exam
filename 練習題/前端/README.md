# 前端面試練習題目錄

> 適用對象：React 主力前端工程師（接觸過一點 Node）
> 目標：面試衝高分（外商前端、台積電前端、一般前端職）
> 程式碼一律使用 JavaScript / TypeScript 與 React

每題一個資料夾：
- **可執行 JS 程式題**：`題目.js`（含 stub 與測試，未實作時 `node 題目.js` 會拋錯）+ `答案.js`（完整解答，`node 答案.js` 全數通過）。
- **觀念 / 實作 / 解析題**：`題目.md`（問題）+ `答案.md`（解答與解析、含程式碼示範）。

---

## JS 手寫題（可執行，`node 答案.js` 驗證）

| 編號 | 題目 | 主題 | 難度 | 連結 |
|------|------|------|------|------|
| Q09 | debounce（防抖） | 閉包 / 計時器 | 中 | [Q09-debounce-防抖](./Q09-debounce-防抖/) |
| Q10 | throttle（節流） | 閉包 / 計時器 | 中 | [Q10-throttle-節流](./Q10-throttle-節流/) |
| Q11 | deepClone（處理循環引用） | 遞迴 / WeakMap | 中高 | [Q11-deep-clone-深拷貝](./Q11-deep-clone-深拷貝/) |
| Q12 | 實作 Promise.all | 非同步 / Promise | 中 | [Q12-promise-all-實作PromiseAll](./Q12-promise-all-實作PromiseAll/) |
| Q13 | 簡化版 Promise（A+ 核心） | 非同步 / Promise | 高 | [Q13-my-promise-簡化版Promise](./Q13-my-promise-簡化版Promise/) |
| Q14 | curry（柯里化） | 函式 / 高階函式 | 中 | [Q14-curry-柯里化](./Q14-curry-柯里化/) |
| Q15 | EventEmitter（發布訂閱） | 設計模式 | 中 | [Q15-event-emitter-發布訂閱](./Q15-event-emitter-發布訂閱/) |
| Q16 | 陣列扁平化 flatten | 遞迴 / 陣列 | 中 | [Q16-flatten-陣列扁平化](./Q16-flatten-陣列扁平化/) |
| Q17 | 實作 bind | 原型 / this | 中高 | [Q17-bind-實作bind](./Q17-bind-實作bind/) |

## JS 觀念

| 編號 | 題目 | 主題 | 難度 | 連結 |
|------|------|------|------|------|
| Q01 | 閉包（Closure）的用途與陷阱 | 作用域 / 閉包 | 中 | [Q01-closure-閉包](./Q01-closure-閉包/) |
| Q02 | `this` 綁定規則與 call/apply/bind | this | 中 | [Q02-this-binding-this綁定](./Q02-this-binding-this綁定/) |
| Q03 | 原型與原型鏈 | 原型 | 中 | [Q03-prototype-chain-原型鏈](./Q03-prototype-chain-原型鏈/) |
| Q04 | Event Loop 與 macro/microtask（順序預測，**可執行**） | 非同步 / 事件迴圈 | 中高 | [Q04-event-loop-事件迴圈順序](./Q04-event-loop-事件迴圈順序/) |
| Q05 | Hoisting（提升） | 作用域 | 中 | [Q05-hoisting-提升](./Q05-hoisting-提升/) |
| Q06 | `==` vs `===` 與型別轉換 | 型別 | 中 | [Q06-equality-相等與型別轉換](./Q06-equality-相等與型別轉換/) |
| Q07 | var / let / const 與 TDZ | 作用域 | 中 | [Q07-var-let-const-變數宣告與TDZ](./Q07-var-let-const-變數宣告與TDZ/) |
| Q08 | 淺拷貝 vs 深拷貝 | 物件 / 記憶體 | 中 | [Q08-shallow-deep-copy-淺拷貝與深拷貝](./Q08-shallow-deep-copy-淺拷貝與深拷貝/) |

## React

| 編號 | 題目 | 主題 | 難度 | 連結 |
|------|------|------|------|------|
| Q18 | React 觀念 Q&A（VDOM / key / hooks / memo / context / 受控 / batching） | React 觀念 | 中高 | [Q18-react-concepts-React觀念QA](./Q18-react-concepts-React觀念QA/) |
| Q19 | 自訂 hook：useDebounce / usePrevious / useFetch | React Hooks | 中高 | [Q19-custom-hooks-自訂hook](./Q19-custom-hooks-自訂hook/) |
| Q20 | Todo 效能優化 | React 效能 | 中高 | [Q20-todo-performance-Todo效能優化](./Q20-todo-performance-Todo效能優化/) |
| Q21 | 修正 useEffect 無限迴圈 | React Hooks / 除錯 | 中 | [Q21-useeffect-infinite-loop-useEffect無限迴圈](./Q21-useeffect-infinite-loop-useEffect無限迴圈/) |

## 瀏覽器 / 網路 / 效能

| 編號 | 題目 | 主題 | 難度 | 連結 |
|------|------|------|------|------|
| Q22 | Critical Rendering Path（關鍵渲染路徑） | 渲染 | 中 | [Q22-critical-rendering-path-關鍵渲染路徑](./Q22-critical-rendering-path-關鍵渲染路徑/) |
| Q23 | reflow vs repaint | 渲染效能 | 中 | [Q23-reflow-repaint-回流與重繪](./Q23-reflow-repaint-回流與重繪/) |
| Q24 | HTTP 快取（Cache-Control / ETag） | 網路 / 快取 | 中 | [Q24-http-cache-HTTP快取](./Q24-http-cache-HTTP快取/) |
| Q25 | CORS（跨來源資源共享） | 網路 / 安全 | 中 | [Q25-cors-跨來源資源共享](./Q25-cors-跨來源資源共享/) |
| Q26 | 跨頁 / 跨分頁溝通 | 瀏覽器 API | 中 | [Q26-cross-tab-跨分頁溝通](./Q26-cross-tab-跨分頁溝通/) |
| Q27 | scroll/resize 用防抖還是節流 | 效能 | 中 | [Q27-scroll-resize-捲動縮放防抖節流](./Q27-scroll-resize-捲動縮放防抖節流/) |
| Q28 | 圖片懶載入 | 效能 | 中 | [Q28-lazy-image-圖片懶載入](./Q28-lazy-image-圖片懶載入/) |
| Q29 | Core Web Vitals（LCP / CLS / INP） | 效能指標 | 中高 | [Q29-core-web-vitals-核心網頁指標](./Q29-core-web-vitals-核心網頁指標/) |

## CSS / 版面

| 編號 | 題目 | 主題 | 難度 | 連結 |
|------|------|------|------|------|
| Q30 | 盒模型（content-box / border-box） | CSS 基礎 | 易 | [Q30-box-model-盒模型](./Q30-box-model-盒模型/) |
| Q31 | flex vs grid | CSS 佈局 | 中 | [Q31-flex-grid-彈性與網格佈局](./Q31-flex-grid-彈性與網格佈局/) |
| Q32 | 各種置中 | CSS 佈局 | 易 | [Q32-centering-各種置中](./Q32-centering-各種置中/) |
| Q33 | specificity（優先級） | CSS 基礎 | 中 | [Q33-specificity-CSS優先級](./Q33-specificity-CSS優先級/) |
| Q34 | BFC（Block Formatting Context） | CSS 佈局 | 中 | [Q34-bfc-區塊格式化情境](./Q34-bfc-區塊格式化情境/) |
| Q35 | position 各值 | CSS 基礎 | 中 | [Q35-position-定位](./Q35-position-定位/) |

---

## 前端面試準備建議

- **手寫題練到能默寫**：debounce / throttle / deepClone / Promise.all / curry / bind 是高頻必考，要能邊寫邊講設計取捨。
- **觀念講「為什麼」**：event loop、閉包、原型鏈、React 重渲染機制都要能口述原理並舉實例，而非背名詞。
- **React 進階是你的主場**：把效能優化（memo/useCallback 的真正時機）、useEffect 時序與清理、Context 重渲染講透，能明顯拉開分數。
- **準備一個專案故事**：用 STAR 描述你做過的效能優化（量化 LCP/INP/bundle size 改善）。
- **補強 CS 基礎與英文**：外商常考演算法與系統設計、台積電重視扎實基本功；用英文做一次自我介紹與專案 walkthrough 的模擬。
- **誠實面對 Node**：被問到時說明熟悉度邊界，但展現能快速上手（事件迴圈、非阻塞 I/O 觀念與前端相通）。

**最後更新**：2026-06-15
