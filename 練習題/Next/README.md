# Next.js 練習題

> 只放「非 Next.js 伺服器渲染機制不可」的題目：SSR/ISR 渲染策略、多層快取、SEO、RSC。其餘前端題目在 `練習題/React/`。

```bash
npm install
npm run dev     # next dev --webpack
npm run test    # Vitest
npm run build   # next build --webpack
```

**注意：本專案一律加 `--webpack`，不要用 Turbopack**——Next 16 的 Turbopack 在路徑含中文字元（本專案位於 `練習題/Next/`）時會直接 panic crash，webpack 沒有這個問題。

## 題目索引

| 編號 | 題目 | 連結 |
|---|---|---|
| Q37 | Next.js App Router 渲染策略（SSR/SSG/ISR/Streaming/四層快取） | [/q37-nextjs-rendering/problem](./app/q37-nextjs-rendering/problem/) 與 [/solution](./app/q37-nextjs-rendering/solution/) |
| Q41 | 多層快取策略（瀏覽器/Service Worker/CDN/Server/Redis） | [/q41-caching-strategies/problem](./app/q41-caching-strategies/problem/) 與 [/solution](./app/q41-caching-strategies/solution/) |
| Q49 | SEO（meta/OG/canonical/JSON-LD/sitemap/Metadata API） | [/q49-seo](./app/q49-seo/) |
| Q63 | React Server Components：序列化邊界與 children 組合 | [/q63-rsc/problem](./app/q63-rsc/problem/) 與 [/solution](./app/q63-rsc/solution/) |

Q37、Q41、Q63 的題目/答案是兩個獨立的 route（不是同頁兩元件）。Q37/Q41 是因為 Next.js 的渲染策略（`dynamic`/`revalidate`）是 route 層級設定，同一個 route 沒辦法同時套用兩種衝突的設定；Q63 是因為題目版會在渲染時真的丟出 RSC 序列化錯誤（把函式當 prop 從 Server 傳給 Client Component），拆開才不會讓這個已知會壞的頁面影響到答案版。都可以用「檢視原始碼」或 Network 面板驗證題目/答案的行為真的不一樣。

Q63 原本不在 Q01–Q62 的遷移範圍內，是額外新增的獨立題目（補原本 62 題沒有單獨講到的 RSC 組合規則）。

**最後更新**：2026-10-29
