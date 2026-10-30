export interface NextQuestionMeta {
  id: string
  number: string
  title: string
  routes: { problem: string; solution: string } | { combined: string }
}

export const questions: NextQuestionMeta[] = [
  {
    id: 'q37-nextjs-rendering',
    number: 'Q37',
    title: 'Next.js App Router 渲染策略（SSR/SSG/ISR/Streaming/四層快取）',
    routes: { problem: '/q37-nextjs-rendering/problem', solution: '/q37-nextjs-rendering/solution' },
  },
  {
    id: 'q41-caching-strategies',
    number: 'Q41',
    title: '多層快取策略（瀏覽器/Service Worker/CDN/Server/Redis）',
    routes: { problem: '/q41-caching-strategies/problem', solution: '/q41-caching-strategies/solution' },
  },
  {
    id: 'q49-seo',
    number: 'Q49',
    title: 'SEO（meta/OG/canonical/JSON-LD/sitemap/Metadata API）',
    routes: { combined: '/q49-seo' },
  },
  {
    id: 'q63-rsc',
    number: 'Q63',
    title: 'React Server Components：序列化邊界與 children 組合',
    routes: { problem: '/q63-rsc/problem', solution: '/q63-rsc/solution' },
  },
]
