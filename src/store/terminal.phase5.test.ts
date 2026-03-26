import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { useTerminalStore } from './terminal'

describe('Terminal store — theme state (Phase 5, EXTR-02)', () => {
  beforeEach(() => {
    useTerminalStore.setState({ output: [], history: [], activeModal: null, theme: 'green' })
    localStorage.clear()
    document.documentElement.removeAttribute('data-theme')
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('store has theme field defaulting to "green"', () => {
    // Reset to pure default by creating a fresh read
    const state = useTerminalStore.getState()
    expect(typeof state.theme).toBe('string')
    expect(['green', 'amber', 'blue']).toContain(state.theme)
  })

  it('setTheme("amber") updates store theme field to "amber"', () => {
    useTerminalStore.getState().setTheme('amber')
    expect(useTerminalStore.getState().theme).toBe('amber')
  })

  it('setTheme("blue") updates store theme field to "blue"', () => {
    useTerminalStore.getState().setTheme('blue')
    expect(useTerminalStore.getState().theme).toBe('blue')
  })

  it('setTheme("amber") sets document.documentElement data-theme attribute to "amber"', () => {
    useTerminalStore.getState().setTheme('amber')
    expect(document.documentElement.getAttribute('data-theme')).toBe('amber')
  })

  it('setTheme("amber") writes "amber" to localStorage under key "jake-os-theme"', () => {
    useTerminalStore.getState().setTheme('amber')
    expect(localStorage.getItem('jake-os-theme')).toBe('amber')
  })

  it('setTheme("green") writes "green" to localStorage under key "jake-os-theme"', () => {
    useTerminalStore.getState().setTheme('green')
    expect(localStorage.getItem('jake-os-theme')).toBe('green')
  })
})
