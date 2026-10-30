# Node 後端實作 — 題目目錄

> 為 **前端工程師（React 主力，碰過一點 Node）** 設計的後端系統化練習。
> 你的優勢：**JS 很熟**。要補的是「後端思維」——資料怎麼存、API 怎麼被保護、請求進來怎麼被驗證與處理。
> 全程用 **JavaScript / Node.js**。

## 🧭 給前端的後端心智模型（前端 ↔ 後端對照表）

你在 React 裡每天寫 `fetch('/api/tasks')`，後端就是「**接住這個 fetch、決定怎麼回應**」的那一端。

| 前端視角（你熟的） | 對應的後端概念 |
|---|---|
| `fetch(url, { method, body })` | Express 的 **路由 + handler**（`app.get/post`） |
| `res.json()` 拿到的資料 | 後端 `res.json(data)` 送出的內容 |
| HTTP 狀態碼 200/404/401 | 後端用 `res.status(404)` 決定 |
| `localStorage` 存 token | 後端發 **JWT**、每次請求驗證它 |
| React state / 暫存資料 | 後端把資料存進**資料庫**（重開不會消失） |
| `try/catch` 包 `await fetch` | 後端也用 try/catch，但要轉成「正確的狀態碼回應」 |
| axios interceptor 攔錯誤 | 後端的 **錯誤處理 middleware** |

記住一句話：**前端是「請求方」，後端是「被請求方 + 真相來源（source of truth）」。**

---

## 環境準備

```bash
mkdir node-practice && cd node-practice
npm init -y
npm pkg set type=module        # 讓你能用 import/export（和前端一致）
npm install express
npm install --save-dev jest supertest
```

> 小型可執行練習（Q01–Q04）的 `題目.js` / `答案.js` 採用 CommonJS（`require`），可直接 `node 答案.js` 跑通、印出 `✅ 通過`，免裝套件。專案型練習（Q05+）以 `.md` 提供需求與參考程式碼。

---

## 題目索引

### 非同步基礎（先補觀念，再練）

| 編號 | 練習 | 主題 | 形式 | 連結 |
|---|---|---|---|---|
| Q01 | callback 改寫成 Promise | 非同步基礎 | .js | [題目](./Q01-callback-to-promise-改寫Promise/題目.js) ・ [答案](./Q01-callback-to-promise-改寫Promise/答案.js) |
| Q02 | 用 async/await 串接多步驟 | 非同步基礎 | .js | [題目](./Q02-async-await-串接/題目.js) ・ [答案](./Q02-async-await-串接/答案.js) |
| Q03 | Promise.all 並行 vs race 競速 | 非同步基礎 | .js | [題目](./Q03-promise-all-race-並行競速/題目.js) ・ [答案](./Q03-promise-all-race-並行競速/答案.js) |
| Q04 | 錯誤處理 + 自訂錯誤類別 | 非同步基礎 | .js | [題目](./Q04-custom-error-自訂錯誤/題目.js) ・ [答案](./Q04-custom-error-自訂錯誤/答案.js) |

### Express API

> ⚠️ **Q10 需要 express**：在**專案根目錄**跑一次 `npm install`（根目錄已有 `package.json`，
> `node_modules/` 不進版控）。其餘題目零依賴。

| 編號 | 練習 | 主題 | 形式 | 連結 |
|---|---|---|---|---|
| Q10 | Express 伺服器：狀態碼語意・原始 body・冪等 | 400 vs 422 / 404 vs 405 / webhook 驗簽 / 冪等 | .js **可執行** | [題目](./Q10-express-server-狀態碼與冪等/題目.js) ・ [答案](./Q10-express-server-狀態碼與冪等/答案.js) |
| Q05 | 完整可跑的 Tasks CRUD API | Express REST API | .md 教學文 | [題目](./Q05-express-crud-api-任務API/題目.md) ・ [答案](./Q05-express-crud-api-任務API/答案.md) |

> 📌 **Q10 與 Q05 的分工**：Q10 是可執行、有測試的版本，先做它。Q05 是教學文
> （無驗證機制），當補充讀物即可。
> ⚠️ Q05 內文寫「Express 4 不會自動接住 async handler 的錯誤，所以要用 `wrap` 樣板」
> —— 這在 **Express 5 已內建**（實測會自動送進錯誤 middleware）。目前安裝的是 5.2.1。

### 手寫原理（選配，想弄懂框架怎麼運作再做）

> 這兩題不用框架，用來理解 Express 的內部機制。筆試不會要你實作路由器，
> 但口試被追問「`next()` 在做什麼」時，做過的人答得出來。

| 編號 | 練習 | 主題 | 形式 | 連結 |
|---|---|---|---|---|
| Q11 | 手寫路由器（含路徑參數） | 路由比對 / 404 vs 405 | .js | [題目](./Q11-router-手寫路由器/題目.js) ・ [答案](./Q11-router-手寫路由器/答案.js) |
| Q12 | 手寫 middleware 鏈 | next() 原理 / 洋蔥模型 / 錯誤傳遞 | .js | [題目](./Q12-middleware-手寫中介層/題目.js) ・ [答案](./Q12-middleware-手寫中介層/答案.js) |

### SQL 基礎（可執行，用 node:sqlite 零依賴）

> ⚠️ **只碰過 NoSQL 的話，這兩題是最大缺口。** 你寫 SQL 字串，測試會真的
> 建資料庫執行並比對結果 —— 不是讀範例，是動手寫。

| 編號 | 練習 | 主題 | 形式 | 連結 |
|---|---|---|---|---|
| Q13 | SQL 查詢基礎（10 題） | WHERE / GROUP BY / HAVING / JOIN / 子查詢 | .js | [題目](./Q13-sql-查詢基礎/題目.js) ・ [答案](./Q13-sql-查詢基礎/答案.js) |
| Q14 | 正規化與 schema 設計 | 1NF→2NF→3NF / 複合主鍵 / 外鍵約束 | .js | [題目](./Q14-normalization-正規化與schema設計/題目.js) ・ [答案](./Q14-normalization-正規化與schema設計/答案.js) |

### 資料庫

| 編號 | 練習 | 主題 | 形式 | 連結 |
|---|---|---|---|---|
| Q06 | SQL 基礎 + Node 串接 SQLite | 資料庫 / 參數化查詢 | .md | [題目](./Q06-database-sqlite-資料庫串接/題目.md) ・ [答案](./Q06-database-sqlite-資料庫串接/答案.md) |

### 驗證與安全

| 編號 | 練習 | 主題 | 形式 | 連結 |
|---|---|---|---|---|
| Q07 | bcrypt + JWT + 環境變數 | 驗證與安全 | .md | [題目](./Q07-auth-jwt-驗證與安全/題目.md) ・ [答案](./Q07-auth-jwt-驗證與安全/答案.md) |

### 測試

| 編號 | 練習 | 主題 | 形式 | 連結 |
|---|---|---|---|---|
| Q08 | 單元測試 + 整合測試 | Jest / Supertest | .md | [題目](./Q08-testing-jest-測試/題目.md) ・ [答案](./Q08-testing-jest-測試/答案.md) |

### Capstone 專案

| 編號 | 練習 | 主題 | 形式 | 連結 |
|---|---|---|---|---|
| Q09 | 個人筆記 API（總整合） | Capstone 專案 | .md | [題目](./Q09-capstone-notes-api-個人筆記/題目.md) ・ [答案](./Q09-capstone-notes-api-個人筆記/答案.md) |

---

## 📌 後端面試常被問（搭配練習複習）

| 問題 | 對應練習 |
|---|---|
| event loop 怎麼運作？microtask vs macrotask？ | Q01–Q04 |
| middleware 執行順序？錯誤處理 middleware 為何 4 個參數？ | Q05 |
| 怎麼防 SQL Injection？ | Q06 |
| 密碼為什麼要雜湊不能加密？bcrypt 的鹽是什麼？ | Q07 |
| JWT 怎麼運作？存哪裡？401 vs 403？ | Q07 |
| 單元測試 vs 整合測試差別？ | Q08 |

---
**最後更新**：2026-06-15
