import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { ClientAccordion } from './ClientAccordion'

describe('ClientAccordion (solution)', () => {
  test('toggles visibility of its children on click', () => {
    render(
      <ClientAccordion title="展開">
        <p>內容</p>
      </ClientAccordion>,
    )
    expect(screen.queryByText('內容')).not.toBeInTheDocument()
    fireEvent.click(screen.getByRole('button'))
    expect(screen.getByText('內容')).toBeInTheDocument()
  })
})
