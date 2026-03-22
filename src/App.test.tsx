// portfolio/src/App.test.tsx
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'

vi.mock('gsap')
vi.mock('@gsap/react', () => ({
  useGSAP: vi.fn((cb: (ctx: { contextSafe: (fn: () => void) => () => void }) => void) => {
    const contextSafe = (fn: () => void) => fn
    cb({ contextSafe })
    return { contextSafe }
  }),
}))

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

// BOOT-04: Return visitor localStorage bypass
describe('App — return visitor bypass', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    localStorage.clear()
  })

  it.todo('renders BootSequence when localStorage "jakeos_visited" is not set')
  it.todo('renders Terminal directly when localStorage "jakeos_visited" === "1"')
  it.todo('sets localStorage "jakeos_visited" to "1" after boot completes')
})
