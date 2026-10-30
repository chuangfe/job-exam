import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, test } from 'vitest'
import { meta as q30 } from '../q30-box-model/meta'
import Q30 from '../q30-box-model'
import { meta as q31 } from '../q31-flex-grid/meta'
import Q31 from '../q31-flex-grid'
import { meta as q32 } from '../q32-centering/meta'
import Q32 from '../q32-centering'
import { meta as q33 } from '../q33-specificity/meta'
import Q33 from '../q33-specificity'
import { meta as q34 } from '../q34-bfc/meta'
import Q34 from '../q34-bfc'
import { meta as q35 } from '../q35-position/meta'
import Q35 from '../q35-position'

const entries = [
  { meta: q30, Page: Q30 },
  { meta: q31, Page: Q31 },
  { meta: q32, Page: Q32 },
  { meta: q33, Page: Q33 },
  { meta: q34, Page: Q34 },
  { meta: q35, Page: Q35 },
]

describe('CSS / 版面 category', () => {
  test('has exactly Q30-Q35 in order', () => {
    expect(entries.map((e) => e.meta.number)).toEqual(['Q30', 'Q31', 'Q32', 'Q33', 'Q34', 'Q35'])
  })
  entries.forEach(({ meta, Page }) => {
    test(`${meta.number} renders without throwing`, () => {
      expect(() => render(<Page />, { wrapper: MemoryRouter })).not.toThrow()
    })
  })
})
