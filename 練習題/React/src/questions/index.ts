import { buildRegistry, type MetaModule, type PageModule } from './registry'

const pageModules = import.meta.glob<PageModule>('../pages/*/index.tsx', { eager: true })
const metaModules = import.meta.glob<MetaModule>('../pages/*/meta.ts', { eager: true })

export const questions = buildRegistry(pageModules, metaModules)
export type { QuestionEntry } from './registry'
