// Q49 — SEO：這頁本身就用 generateMetadata 做「答案版」的示範，
// 因為 metadata 是 route 層級的 export，同一個 route 沒辦法同時套用兩種衝突設定，
// 「題目版」只能用程式碼片段呈現「缺少 meta 的錯誤示範」，不是真的套用在這個 route 上。
import type { Metadata } from 'next'

export function generateMetadata(): Metadata {
  return {
    title: 'Q49 SEO 範例頁 | React/Next 練習題',
    description: '示範 Next.js App Router Metadata API：title/description/OG/canonical/JSON-LD。',
    alternates: {
      canonical: '/q49-seo',
    },
    openGraph: {
      title: 'Q49 SEO 範例頁',
      description: '示範 Next.js App Router Metadata API',
      type: 'article',
      url: '/q49-seo',
    },
  }
}

const badExampleCode = `// ❌ 題目：沒有任何 meta 設定
export default function Page() {
  return <main>這裡的內容完全沒有 title / description / OG / canonical，
  搜尋結果標題會退回瀏覽器預設值，社群分享也不會有預覽卡片。</main>
}`

const goodExampleCode = `// ✅ 答案：用 generateMetadata 補齊
export function generateMetadata(): Metadata {
  return {
    title: 'Q49 SEO 範例頁 | React/Next 練習題',
    description: '示範 Next.js App Router Metadata API：title/description/OG/canonical/JSON-LD。',
    alternates: { canonical: '/q49-seo' },
    openGraph: {
      title: 'Q49 SEO 範例頁',
      description: '示範 Next.js App Router Metadata API',
      type: 'article',
      url: '/q49-seo',
    },
  }
}`

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Q49 SEO 範例頁',
  description: '示範 Next.js App Router Metadata API',
}

export default function Page() {
  return (
    <main>
      <p>
        <a href="/">← 回題目列表</a>
      </p>
      <h1>Q49：前端 SEO</h1>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section>
        <h2>題目：沒有 meta 設定（示意，非本頁實際設定）</h2>
        <pre>
          <code>{badExampleCode}</code>
        </pre>
      </section>

      <section>
        <h2>答案：本頁實際使用的 generateMetadata</h2>
        <pre>
          <code>{goodExampleCode}</code>
        </pre>
        <p>
          另外本頁用 <code>&lt;script type=&quot;application/ld+json&quot;&gt;</code> 輸出了一段 JSON-LD（
          <code>Article</code> 結構化資料）。可以用瀏覽器「檢視原始碼」確認 <code>&lt;title&gt;</code>、
          <code>&lt;meta&gt;</code>、<code>&lt;link rel=&quot;canonical&quot;&gt;</code> 與這段 JSON-LD 都真的出現在
          HTML 裡（不是靠 JS 事後補上），這正是 SSR/SSG 對 SEO 有利的原因——爬蟲不用執行 JS 就能拿到完整內容。
        </p>
        <p>
          JSON-LD 的內容必須跟頁面上使用者看得到的內容一致，不一致會被視為操弄搜尋結果；sitemap.xml 與
          robots.txt 則分別用 <code>app/sitemap.ts</code> 與 <code>app/robots.ts</code> 產生（本 demo 未附，屬於站台層級設定）。
        </p>
      </section>
    </main>
  )
}
