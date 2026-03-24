import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import StatusBar from '../StatusBar'

describe('StatusBar', () => {
  it('renders LinkedIn URL as an anchor element (VISL-02)', () => {
    render(<StatusBar />)
    const link = screen.getByRole('link')
    expect(link).toBeDefined()
  })

  it('LinkedIn anchor has correct href (VISL-02)', () => {
    render(<StatusBar />)
    const link = screen.getByRole('link')
    expect(link.getAttribute('href')).toBe('https://linkedin.com/in/jake-manis-304406311')
  })

  it('LinkedIn anchor has target="_blank" (VISL-02)', () => {
    render(<StatusBar />)
    const link = screen.getByRole('link')
    expect(link.getAttribute('target')).toBe('_blank')
  })

  it('renders jake-os v1.0 text (VISL-02)', () => {
    render(<StatusBar />)
    expect(screen.getByText(/jake-os v1\.0/)).toBeDefined()
  })
})
