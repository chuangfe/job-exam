import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, test } from 'vitest'
import Q18 from '../q18-react-concepts'
import { meta as q18 } from '../q18-react-concepts/meta'
import Q19 from '../q19-custom-hooks'
import { meta as q19 } from '../q19-custom-hooks/meta'
import Q20 from '../q20-todo-performance'
import { meta as q20 } from '../q20-todo-performance/meta'
import Q21 from '../q21-useeffect-infinite-loop'
import { meta as q21 } from '../q21-useeffect-infinite-loop/meta'

const entries = [
  { meta: q18, Page: Q18 },
  { meta: q19, Page: Q19 },
  { meta: q20, Page: Q20 },
  { meta: q21, Page: Q21 },
]

describe('React category', () => {
  test('has exactly the expected question numbers in order', () => {
    expect(entries.map((e) => e.meta.number)).toEqual(['Q18', 'Q19', 'Q20', 'Q21'])
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
