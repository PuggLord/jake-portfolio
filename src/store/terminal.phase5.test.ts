import { describe, it, beforeEach } from 'vitest'
import { useTerminalStore } from './terminal'

describe('Terminal store — theme state (Phase 5, EXTR-02)', () => {
  beforeEach(() => {
    useTerminalStore.setState({ output: [], history: [], activeModal: null })
  })

  it.todo('store initializes theme to "green" by default')
  it.todo('setTheme("amber") updates store theme field to "amber"')
  it.todo('setTheme("blue") updates store theme field to "blue"')
  it.todo('setTheme("amber") sets document.documentElement data-theme attribute to "amber"')
  it.todo('setTheme("amber") writes "amber" to localStorage under key "jake-os-theme"')
  it.todo('setTheme("green") writes "green" to localStorage under key "jake-os-theme"')
})
