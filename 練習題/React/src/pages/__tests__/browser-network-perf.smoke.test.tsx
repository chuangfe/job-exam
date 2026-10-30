import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, test } from 'vitest'
import { meta as q22 } from '../q22-critical-rendering-path/meta'
import Q22 from '../q22-critical-rendering-path'
import { meta as q23 } from '../q23-reflow-repaint/meta'
import Q23 from '../q23-reflow-repaint'
import { meta as q24 } from '../q24-http-cache/meta'
import Q24 from '../q24-http-cache'
import { meta as q25 } from '../q25-cors/meta'
import Q25 from '../q25-cors'
import { meta as q26 } from '../q26-cross-tab/meta'
import Q26 from '../q26-cross-tab'
import { meta as q27 } from '../q27-scroll-resize/meta'
import Q27 from '../q27-scroll-resize'
import { meta as q28 } from '../q28-lazy-image/meta'
import Q28 from '../q28-lazy-image'
import { meta as q29 } from '../q29-core-web-vitals/meta'
import Q29 from '../q29-core-web-vitals'

const entries = [
  { meta: q22, Page: Q22 },
  { meta: q23, Page: Q23 },
  { meta: q24, Page: Q24 },
  { meta: q25, Page: Q25 },
  { meta: q26, Page: Q26 },
  { meta: q27, Page: Q27 },
  { meta: q28, Page: Q28 },
  { meta: q29, Page: Q29 },
]

describe('瀏覽器 / 網路 / 效能 category', () => {
  test('has exactly the expected question numbers in order', () => {
    expect(entries.map((e) => e.meta.number)).toEqual(['Q22', 'Q23', 'Q24', 'Q25', 'Q26', 'Q27', 'Q28', 'Q29'])
    entries.forEach((e) => expect(e.meta.category).toBe('瀏覽器 / 網路 / 效能'))
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
