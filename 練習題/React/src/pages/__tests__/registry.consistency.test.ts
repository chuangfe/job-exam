import { describe, expect, test } from 'vitest'
import { questions } from '../../questions'

describe('registry consistency', () => {
  test('has exactly 24 questions across the expected categories', () => {
    expect(questions).toHaveLength(24)
    const counts: Record<string, number> = {}
    questions.forEach((q) => {
      counts[q.category] = (counts[q.category] ?? 0) + 1
    })
    expect(counts).toEqual({
      React: 4,
      '瀏覽器 / 網路 / 效能': 8,
      'CSS / 版面': 6,
      '設計系統・元件庫': 6,
    })
  })

  test('every id is unique', () => {
    const ids = questions.map((q) => q.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  test('covers only the questions that genuinely need a browser to demonstrate', () => {
    const numbers = questions.map((q) => q.number)
    expect(new Set(numbers).size).toBe(numbers.length)

    const expected = [
      'Q18', 'Q19', 'Q20', 'Q21',
      'Q22', 'Q23', 'Q24', 'Q25', 'Q26', 'Q27', 'Q28', 'Q29',
      'Q30', 'Q31', 'Q32', 'Q33', 'Q34', 'Q35',
      'Q42', 'Q43', 'Q44', 'Q45', 'Q46', 'Q47',
    ]
    expect(new Set(numbers)).toEqual(new Set(expected))
  })
})
