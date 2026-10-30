import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, test } from 'vitest'
import { QuestionPage, Section } from './QuestionPage'

describe('QuestionPage', () => {
  test('renders title and both labeled sections', () => {
    render(
      <MemoryRouter>
        <QuestionPage title="Q01 閉包">
          <Section label="題目">
            <div>題目內容</div>
          </Section>
          <Section label="答案">
            <div>答案內容</div>
          </Section>
        </QuestionPage>
      </MemoryRouter>,
    )
    expect(screen.getByText('Q01 閉包')).toBeInTheDocument()
    expect(screen.getByText('題目')).toBeInTheDocument()
    expect(screen.getByText('答案')).toBeInTheDocument()
    expect(screen.getByText('題目內容')).toBeInTheDocument()
    expect(screen.getByText('答案內容')).toBeInTheDocument()
  })
})
