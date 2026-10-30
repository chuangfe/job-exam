import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { HomePage } from './HomePage'

describe('HomePage', () => {
  test('lists each Next-specific question with its problem/solution links', () => {
    const questions = [
      {
        id: 'q37-nextjs-rendering',
        number: 'Q37',
        title: 'Next.js App Router 渲染策略',
        routes: { problem: '/q37-nextjs-rendering/problem', solution: '/q37-nextjs-rendering/solution' },
      },
    ]
    render(<HomePage questions={questions} />)
    expect(screen.getByText(/Q37/)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '題目' })).toHaveAttribute('href', '/q37-nextjs-rendering/problem')
    expect(screen.getByRole('link', { name: '答案' })).toHaveAttribute('href', '/q37-nextjs-rendering/solution')
  })
})
