import { describe, expect, test } from 'vitest'
import { buildRegistry } from './registry'

describe('buildRegistry', () => {
  test('pairs modules by folder key and sorts by number', () => {
    const pages = {
      './q02-foo/index.tsx': { default: () => null },
      './q01-bar/index.tsx': { default: () => null },
    }
    const metas = {
      './q02-foo/meta.ts': { meta: { id: 'q02-foo', number: 'Q02', title: 'Foo', category: 'X' } },
      './q01-bar/meta.ts': { meta: { id: 'q01-bar', number: 'Q01', title: 'Bar', category: 'X' } },
    }
    const result = buildRegistry(pages, metas)
    expect(result.map((r) => r.number)).toEqual(['Q01', 'Q02'])
    expect(result[0].id).toBe('q01-bar')
  })
})
