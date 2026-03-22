// portfolio/src/components/boot/__tests__/BootSequence.test.tsx
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// Auto-resolved from portfolio/src/__mocks__/gsap.ts
vi.mock('gsap')
vi.mock('@gsap/react', () => ({
  useGSAP: vi.fn((cb: (ctx: { contextSafe: (fn: () => void) => () => void }) => void) => {
    const contextSafe = (fn: () => void) => fn
    cb({ contextSafe })
    return { contextSafe }
  }),
}))

// Mock window.matchMedia for jsdom
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

describe('BootSequence', () => {
  // BOOT-01: BIOS lines and loading bar render
  it.todo('renders BIOS header line "JAKE-OS BIOS v2.6.0" on mount')
  it.todo('renders all 12 BIOS lines with ...OK suffix on spec lines')
  it.todo('renders loading bar label "Loading kernel..." initially')
  it.todo('renders ASCII bar string starting with "["')

  // BOOT-02: Login prompt renders in sequence
  it.todo('renders login prompt "jake-portfolio login:" after BIOS stage')
  it.todo('renders "Password:" line in login stage')
  it.todo('renders "Welcome, visitor." in login stage')

  // BOOT-03: Skip on keypress/mousedown
  it.todo('calls timeline.progress(1) when keydown event fires during boot')
  it.todo('calls timeline.progress(1) when mousedown event fires during boot')

  // ACCS-02: prefers-reduced-motion
  it.todo('calls onComplete immediately when prefers-reduced-motion: reduce is active')
})
