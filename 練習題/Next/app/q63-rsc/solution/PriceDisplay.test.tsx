import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { PriceDisplay } from './PriceDisplay'

describe('PriceDisplay (solution)', () => {
  test('renders with only serializable props and toggles currency', () => {
    render(<PriceDisplay cents={1999} />)
    expect(screen.getByText(/NT\$20/)).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: '切換幣別' }))
    expect(screen.getByText(/US\$/)).toBeInTheDocument()
  })
})
