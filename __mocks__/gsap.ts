// portfolio/__mocks__/gsap.ts
// Root-level mock for Vitest auto-resolution (vi.mock('gsap'))
// Vitest resolves third-party mocks from <root>/__mocks__, not src/__mocks__
import { vi } from 'vitest'

const timelineMock = {
  from: vi.fn().mockReturnThis(),
  to: vi.fn().mockReturnThis(),
  set: vi.fn().mockReturnThis(),
  call: vi.fn().mockReturnThis(),
  add: vi.fn().mockReturnThis(),
  addLabel: vi.fn().mockReturnThis(),
  progress: vi.fn().mockReturnThis(),
  pause: vi.fn().mockReturnThis(),
  kill: vi.fn().mockReturnThis(),
  eventCallback: vi.fn().mockReturnThis(),
  duration: vi.fn().mockReturnValue(4.5),
}

const matchMediaMock = {
  add: vi.fn((query: string, callback: () => void) => {
    // In tests, always call the no-preference branch
    if (query.includes('no-preference')) callback()
  }),
  revert: vi.fn(),
}

const gsap = {
  timeline: vi.fn(() => ({ ...timelineMock })),
  to: vi.fn().mockReturnValue({ kill: vi.fn() }),
  from: vi.fn().mockReturnValue({ kill: vi.fn() }),
  set: vi.fn(),
  matchMedia: vi.fn(() => ({ ...matchMediaMock })),
  registerPlugin: vi.fn(),
  delayedCall: vi.fn((delay: number, fn: () => void) => { fn(); return { kill: vi.fn() } }),
  context: vi.fn((fn: () => void) => { fn(); return { revert: vi.fn() } }),
}

export const useGSAP = vi.fn((callback: (context: { contextSafe: (fn: () => void) => () => void }) => void) => {
  const contextSafe = (fn: () => void) => fn
  callback({ contextSafe })
  return { contextSafe }
})

export default gsap
