# 前端面試練習題目錄

> 適用對象：React 主力前端工程師（接觸過一點 Node）
> 目標：面試衝高分（外商前端、台積電前端、一般前端職）
> 程式碼一律使用 JavaScript / TypeScript

這裡只放**不需要瀏覽器就能完整驗證**的題目（純 JS 語言特性、演算法/資料結構手寫題、純觀念問答）。
需要「看畫面」才有意義的題目（DOM 渲染、CSS 排版、React re-render 觀察、Next.js SSR/RSC）
在 [練習題/React/](../React/README.md) 與 [練習題/Next/](../Next/README.md)，用瀏覽器 + DevTools 練習。

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

## 框架・架構・資料流（不需要畫面的子集）

> Q37（Next.js 渲染策略）、Q41（多層快取）已移到 [練習題/Next/](../Next/README.md)；其餘純邏輯/觀念題留在這裡。

| 編號 | 題目 | 主題 | 難度 | 格式 | 連結 |
|------|------|------|------|------|------|
| Q36 | 手寫 mini-Redux + Redux Toolkit/Recoil/Jotai/Context 對照 | 狀態管理 | 中高 | 可執行 | [Q36-state-management-狀態管理](./Q36-state-management-狀態管理/) |
| Q38 | TypeScript 型別體操與型別安全（泛型/Utility Types/型別窄化） | TypeScript | 中高 | 觀念 | [Q38-typescript-types-型別體操與型別安全](./Q38-typescript-types-型別體操與型別安全/) |
| Q39 | 手寫請求快取（dedupe/TTL/SWR，對照 React Query/SWR） | 資料流 | 中高 | 可執行 | [Q39-data-fetching-cache-請求快取](./Q39-data-fetching-cache-請求快取/) |
| Q40 | 瀏覽器儲存工具（localStorage 封裝+TTL；Cookie/IndexedDB 對照） | 儲存 | 中 | 可執行 | [Q40-web-storage-瀏覽器儲存](./Q40-web-storage-瀏覽器儲存/) |

## 平台能力（不需要畫面的子集）

> Q49（SEO）已移到 [練習題/Next/](../Next/README.md)；其餘純邏輯/觀念題留在這裡。

| 編號 | 題目 | 主題 | 難度 | 格式 | 連結 |
|------|------|------|------|------|------|
| Q48 | PWA / Service Worker / Push Notification | PWA | 高 | 觀念 | [Q48-pwa-service-worker-漸進式網頁應用](./Q48-pwa-service-worker-漸進式網頁應用/) |
| Q50 | 手寫 mini i18n（內插/複數/Intl，對照 next-intl/i18next） | 國際化 | 中高 | 可執行 | [Q50-i18n-國際化](./Q50-i18n-國際化/) |
| Q53 | WebSocket 與即時通訊（重連/心跳/socket.io/React 整合） | 即時 | 高 | 觀念 | [Q53-websocket-即時通訊](./Q53-websocket-即時通訊/) |
| Q54 | Webpack 與打包優化（分割/tree shaking/快取/MF） | 打包 | 高 | 觀念 | [Q54-webpack-打包優化](./Q54-webpack-打包優化/) |

## 測試・工程實務・DevOps

| 編號 | 題目 | 主題 | 難度 | 格式 | 連結 |
|------|------|------|------|------|------|
| Q51 | E2E 與自動化測試（測試金字塔/Playwright/Cypress） | 測試 | 中高 | 觀念 | [Q51-e2e-testing-端對端測試](./Q51-e2e-testing-端對端測試/) |
| Q52 | CI/CD 與品質門檻（GitHub Actions/Dockerfile/pm2/Vercel） | CI/CD | 中高 | 觀念 | [Q52-ci-cd-持續整合與部署](./Q52-ci-cd-持續整合與部署/) |
| Q55 | Git 版本控制進階（rebase/reset/cherry-pick/reflog/bisect） | Git | 中高 | 觀念 | [Q55-git-版本控制進階](./Q55-git-版本控制進階/) |

## 工程素養・專案交付

| 編號 | 題目 | 主題 | 難度 | 格式 | 連結 |
|------|------|------|------|------|------|
| Q56 | Code Review 與重構（找碴+重構，4 情境） | 程式碼品質 | 中高 | 觀念 | [Q56-code-review-refactor-程式碼審查與重構](./Q56-code-review-refactor-程式碼審查與重構/) |
| Q57 | 從零到一：獨立交付完整前端專案（需求拆解/選型/里程碑） | 專案 | 高 | 專案 | [Q57-from-scratch-project-從零到一專案](./Q57-from-scratch-project-從零到一專案/) |

## 產品・成長・可擴展架構

| 編號 | 題目 | 主題 | 難度 | 格式 | 連結 |
|------|------|------|------|------|------|
| Q58 | 手寫 A/B 測試分流 + Feature Flag（一致性 hash/rollout） | 實驗 | 中高 | 可執行 | [Q58-ab-testing-feature-flag-AB測試與功能旗標](./Q58-ab-testing-feature-flag-AB測試與功能旗標/) |
| Q59 | 分析追蹤與事件埋點（GA4/GTM/dataLayer/隱私合規） | 數據 | 中 | 觀念 | [Q59-analytics-tracking-分析追蹤與埋點](./Q59-analytics-tracking-分析追蹤與埋點/) |
| Q60 | Headless CMS（Builder.io/Contentful/Sanity + Next.js） | 內容平台 | 中 | 觀念 | [Q60-headless-cms-無頭內容管理](./Q60-headless-cms-無頭內容管理/) |
| Q61 | 可規模化前端架構（Monorepo/狀態分層/效能預算/ADR） | 架構 | 高 | 觀念 | [Q61-scalable-architecture-可擴展前端架構](./Q61-scalable-architecture-可擴展前端架構/) |
| Q62 | 將 AI 導入開發流程（應用場景/使用邊界/品質把關） | AI 工程 | 中 | 觀念 | [Q62-ai-in-dev-workflow-AI導入開發流程](./Q62-ai-in-dev-workflow-AI導入開發流程/) |

---

## 需要瀏覽器的題目在這裡

| 分類 | 題目 | 位置 |
|------|------|------|
| React 核心 | Q18-Q21 | [練習題/React/](../React/README.md) |
| 瀏覽器 / 網路 / 效能 | Q22-Q29 | [練習題/React/](../React/README.md) |
| CSS / 版面 | Q30-Q35 | [練習題/React/](../React/README.md) |
| Next.js 渲染/快取/SEO/RSC | Q37、Q41、Q49、Q63 | [練習題/Next/](../Next/README.md) |
| 設計系統・元件庫 | Q42-Q47 | [練習題/React/](../React/README.md) |

## 前端面試準備建議

- **手寫題練到能默寫**：debounce / throttle / deepClone / Promise.all / curry / bind 是高頻必考，要能邊寫邊講設計取捨。
- **觀念講「為什麼」**：event loop、閉包、原型鏈都要能口述原理並舉實例，而非背名詞（React 重渲染機制的部分見 [練習題/React/](../React/README.md)）。
- **準備一個專案故事**：用 STAR 描述你做過的效能優化（量化 LCP/INP/bundle size 改善）。
- **補強 CS 基礎與英文**：外商常考演算法與系統設計、台積電重視扎實基本功；用英文做一次自我介紹與專案 walkthrough 的模擬。
- **誠實面對 Node**：被問到時說明熟悉度邊界，但展現能快速上手（事件迴圈、非阻塞 I/O 觀念與前端相通）。

**最後更新**：2026-10-30
