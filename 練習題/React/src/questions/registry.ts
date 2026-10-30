import type { ComponentType } from 'react'
import type { QuestionMeta } from './types'

export interface QuestionEntry extends QuestionMeta {
  Page: ComponentType
}

export interface PageModule {
  default: ComponentType
}

export interface MetaModule {
  meta: QuestionMeta
}

export function buildRegistry(
  pageModules: Record<string, PageModule>,
  metaModules: Record<string, MetaModule>,
): QuestionEntry[] {
  return Object.keys(pageModules)
    .map((path) => {
      const metaPath = path.replace('/index.tsx', '/meta.ts')
      const meta = metaModules[metaPath]?.meta
      if (!meta) {
        throw new Error(`Missing meta.ts for question page at ${path}`)
      }
      return { ...meta, Page: pageModules[path].default }
    })
    .sort((a, b) => a.number.localeCompare(b.number))
}
