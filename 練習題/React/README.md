# React 練習題

> 只放「需要瀏覽器才有意義」的題目：React 渲染行為、CSS 排版、瀏覽器/DOM API——用 React DevTools /
> Chrome Performance 面板觀察。純 JS 語言特性、演算法手寫題、純觀念問答留在 `練習題/Javascript/`，
> 用 `node` 直接驗證更乾脆，不需要包一層 React。Next.js 專屬的題目在 `練習題/Next/`。

```bash
npm install
npm run dev       # 開發伺服器
npm run test      # Vitest
npm run build     # 型別檢查 + production build
```

每題一個 route（例如 `/q30-box-model`），頁面裡「題目」「答案」兩個元件並排，方便直接在畫面上比較。

```
src/pages/<slug>/
├── meta.ts              # { id, number, title, category }
├── index.tsx            # 組裝 QuestionPage + Section，中文解說寫在這裡的註解
└── components/
    ├── Problem.tsx       # 未解版
    └── Solution.tsx      # 完整解
```

共用元件在 `src/components/`（`Card`/`Button`/`Stat`/`CodeBlock`/`Callout`/`LogRunner`），已安裝 Tailwind v4；Q42/Q43/Q44 另外用了 MUI / react-hook-form。

## 題目索引（24 題）

### React

| 編號 | 題目 | 連結 |
|---|---|---|
| Q18 | React 觀念 Q&A（VDOM / key / hooks / memo / context / 受控 / batching） | [/q18-react-concepts](./src/pages/q18-react-concepts/) |
| Q19 | 自訂 hook：useDebounce / usePrevious / useFetch | [/q19-custom-hooks](./src/pages/q19-custom-hooks/) |
| Q20 | Todo 效能優化（可觀察渲染次數） | [/q20-todo-performance](./src/pages/q20-todo-performance/) |
| Q21 | 修正 useEffect 無限迴圈（可觀察渲染次數） | [/q21-useeffect-infinite-loop](./src/pages/q21-useeffect-infinite-loop/) |

### 瀏覽器 / 網路 / 效能

| 編號 | 題目 | 連結 |
|---|---|---|
| Q22 | Critical Rendering Path（關鍵渲染路徑） | [/q22-critical-rendering-path](./src/pages/q22-critical-rendering-path/) |
| Q23 | reflow vs repaint（可觀察耗時） | [/q23-reflow-repaint](./src/pages/q23-reflow-repaint/) |
| Q24 | HTTP 快取（Cache-Control / ETag） | [/q24-http-cache](./src/pages/q24-http-cache/) |
| Q25 | CORS（跨來源資源共享） | [/q25-cors](./src/pages/q25-cors/) |
| Q26 | 跨頁 / 跨分頁溝通（真的用 BroadcastChannel） | [/q26-cross-tab](./src/pages/q26-cross-tab/) |
| Q27 | scroll/resize 用防抖還是節流 | [/q27-scroll-resize](./src/pages/q27-scroll-resize/) |
| Q28 | 圖片懶載入（真的用 IntersectionObserver） | [/q28-lazy-image](./src/pages/q28-lazy-image/) |
| Q29 | Core Web Vitals（LCP / CLS / INP） | [/q29-core-web-vitals](./src/pages/q29-core-web-vitals/) |

### CSS / 版面（真實視覺排版 demo）

| 編號 | 題目 | 連結 |
|---|---|---|
| Q30 | 盒模型（content-box / border-box） | [/q30-box-model](./src/pages/q30-box-model/) |
| Q31 | flex vs grid | [/q31-flex-grid](./src/pages/q31-flex-grid/) |
| Q32 | 各種置中 | [/q32-centering](./src/pages/q32-centering/) |
| Q33 | specificity（優先級） | [/q33-specificity](./src/pages/q33-specificity/) |
| Q34 | BFC（Block Formatting Context） | [/q34-bfc](./src/pages/q34-bfc/) |
| Q35 | position 各值 | [/q35-position](./src/pages/q35-position/) |

### 設計系統・元件庫

| 編號 | 題目 | 連結 |
|---|---|---|
| Q42 | MUI 主題與樣式系統 | [/q42-mui-theme](./src/pages/q42-mui-theme/) |
| Q43 | Design Token 與 Dark Mode / 多品牌治理 | [/q43-design-tokens](./src/pages/q43-design-tokens/) |
| Q44 | React Hook Form 與複雜表單體驗 | [/q44-react-hook-form](./src/pages/q44-react-hook-form/) |
| Q45 | 網頁可及性 a11y（真的有鍵盤 focus trap） | [/q45-accessibility](./src/pages/q45-accessibility/) |
| Q46 | Storybook 元件文件化 | [/q46-storybook](./src/pages/q46-storybook/) |
| Q47 | 常見頁型抽象與可組合元件 | [/q47-page-patterns](./src/pages/q47-page-patterns/) |

## 不在這裡的題目

- **純 JS / 演算法 / 純觀念**（JS 觀念 Q01-08、JS 手寫題 Q09-17、框架資料流 Q36/38-40、平台能力 Q48/50/53/54、測試/DevOps Q51/52/55、工程素養 Q56/57、產品/成長 Q58-62）→ [練習題/Javascript/](../前端/README.md)，`node 答案.js` 或讀 `.md` 即可。
- **Next.js 專屬**（Q37/Q41/Q49/Q63）→ [練習題/Next/](../Next/README.md)。

**最後更新**：2026-10-30
