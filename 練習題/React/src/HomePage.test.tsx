import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, test } from 'vitest'
import { HomePage } from './HomePage'

describe('HomePage', () => {
  test('groups questions by category with links', () => {
    const questions = [
      { id: 'q01-bar', number: 'Q01', title: 'Bar', category: 'JS 觀念', Page: () => null },
      { id: 'q09-baz', number: 'Q09', title: 'Baz', category: 'JS 手寫題', Page: () => null },
    ]
    render(
      <MemoryRouter>
        <HomePage questions={questions} />
      </MemoryRouter>,
    )
    expect(screen.getByText('JS 觀念')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Q01/ })).toHaveAttribute('href', '/q01-bar')
  })
})
