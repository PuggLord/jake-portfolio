// portfolio/src/components/boot/__tests__/BootSequence.test.tsx
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render } from '@testing-library/react'

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
  beforeEach(() => {
    vi.clearAllMocks()
  })

  // BOOT-01: BIOS lines render in the DOM
  it('renders BIOS lines in the DOM on mount', async () => {
    const { default: BootSequence } = await import('../BootSequence')
    const { container } = render(<BootSequence onComplete={vi.fn()} />)
    const biosLines = container.querySelectorAll('.bios-line')
    expect(biosLines.length).toBeGreaterThan(0)
  })

  it('has aria-hidden="true" on the boot container', async () => {
    const { default: BootSequence } = await import('../BootSequence')
    const { container } = render(<BootSequence onComplete={vi.fn()} />)
    const bootContainer = container.querySelector('[aria-hidden="true"]')
    expect(bootContainer).toBeTruthy()
  })

  // BOOT-02: Login prompt renders in sequence (manual visual only — todo)
  it.todo('renders login prompt "jake-portfolio login:" after BIOS stage')
  it.todo('renders "Password:" line in login stage')
  it.todo('renders "Welcome, visitor." in login stage')

  // BOOT-03: Skip on keypress/mousedown — verify listeners are registered
  it('registers keydown listener on mount', async () => {
    const { default: BootSequence } = await import('../BootSequence')
    const addEventSpy = vi.spyOn(window, 'addEventListener')
    render(<BootSequence onComplete={vi.fn()} />)
    expect(addEventSpy).toHaveBeenCalledWith('keydown', expect.any(Function))
  })

  it('registers mousedown listener on mount', async () => {
    const { default: BootSequence } = await import('../BootSequence')
    const addEventSpy = vi.spyOn(window, 'addEventListener')
    render(<BootSequence onComplete={vi.fn()} />)
    expect(addEventSpy).toHaveBeenCalledWith('mousedown', expect.any(Function))
  })

  // ACCS-02: prefers-reduced-motion — verify gsap.matchMedia is called
  it('calls gsap.matchMedia() to handle reduced-motion preference', async () => {
    const gsap = (await import('gsap')).default
    const { default: BootSequence } = await import('../BootSequence')
    render(<BootSequence onComplete={vi.fn()} />)
    expect(gsap.matchMedia).toHaveBeenCalled()
  })
})
