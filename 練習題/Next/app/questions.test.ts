import { describe, expect, test } from 'vitest'
import { questions } from './questions'

describe('questions', () => {
  test('has exactly the four Next-specific questions', () => {
    expect(questions.map((q) => q.number)).toEqual(['Q37', 'Q41', 'Q49', 'Q63'])
  })
})
