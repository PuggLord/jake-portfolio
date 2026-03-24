import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ResumeModal from '../ResumeModal'

describe('ResumeModal', () => {
  it('renders PDF download button with text "[ download pdf ]" (WIND-03)', () => {
    render(<ResumeModal />)
    expect(screen.getByText('[ download pdf ]')).toBeDefined()
  })

  it('PDF download button has aria-label="Download resume PDF" (WIND-03)', () => {
    render(<ResumeModal />)
    expect(screen.getByRole('link', { name: /download resume pdf/i })).toBeDefined()
  })

  it('renders Education section with UNT degree lines (WIND-03)', () => {
    render(<ResumeModal />)
    expect(screen.getByText(/BS Data Science/)).toBeDefined()
    expect(screen.getByText(/AS Texas Core Curriculum/)).toBeDefined()
  })

  it('renders Skills section with tech skills (WIND-03)', () => {
    render(<ResumeModal />)
    expect(screen.getByText(/Python, Bash/)).toBeDefined()
  })

  it('renders Experience section (WIND-03)', () => {
    render(<ResumeModal />)
    expect(screen.getByText(/Lifeguard — Lifetime Fitness/)).toBeDefined()
    expect(screen.getByText(/Warehouse Manager — Parrent's Painting/)).toBeDefined()
  })

  it('renders LinkedIn URL as clickable anchor (VISL-02)', () => {
    render(<ResumeModal />)
    const link = screen.getByRole('link', { name: /linkedin\.com\/in\/jake-manis/i })
    expect(link).toBeDefined()
    expect(link.getAttribute('href')).toBe('https://linkedin.com/in/jake-manis-304406311')
  })
})
