import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, test } from 'vitest'
import { meta as q42 } from '../q42-mui-theme/meta'
import Q42 from '../q42-mui-theme'
import { meta as q43 } from '../q43-design-tokens/meta'
import Q43 from '../q43-design-tokens'
import { meta as q44 } from '../q44-react-hook-form/meta'
import Q44 from '../q44-react-hook-form'
import { meta as q45 } from '../q45-accessibility/meta'
import Q45 from '../q45-accessibility'
import { meta as q46 } from '../q46-storybook/meta'
import Q46 from '../q46-storybook'
import { meta as q47 } from '../q47-page-patterns/meta'
import Q47 from '../q47-page-patterns'

const entries = [
  { meta: q42, Page: Q42 },
  { meta: q43, Page: Q43 },
  { meta: q44, Page: Q44 },
  { meta: q45, Page: Q45 },
  { meta: q46, Page: Q46 },
  { meta: q47, Page: Q47 },
]

describe('設計系統・元件庫 category', () => {
  test('has exactly the expected question numbers in order', () => {
    expect(entries.map((e) => e.meta.number)).toEqual(['Q42', 'Q43', 'Q44', 'Q45', 'Q46', 'Q47'])
  })

  entries.forEach(({ meta, Page }) => {
    test(`${meta.number} renders without throwing`, () => {
      expect(() =>
        render(
          <MemoryRouter>
            <Page />
          </MemoryRouter>,
        ),
      ).not.toThrow()
    })
  })
})
