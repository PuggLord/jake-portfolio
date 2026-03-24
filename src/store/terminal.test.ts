// src/store/terminal.test.ts
import { describe, it, expect, beforeEach } from 'vitest'
import { useTerminalStore } from './terminal'
import type { ActiveModal, ModalType } from './terminal'

describe('Terminal store — modal state (Phase 4)', () => {
  beforeEach(() => {
    // Reset store to initial state before each test
    useTerminalStore.setState({
      activeModal: null,
    })
  })

  it('initializes activeModal as null', () => {
    const state = useTerminalStore.getState()
    expect(state.activeModal).toBeNull()
  })

  it('setActiveModal sets activeModal with type and id', () => {
    const modal: ActiveModal = { type: 'about', id: null }
    useTerminalStore.getState().setActiveModal(modal)
    expect(useTerminalStore.getState().activeModal).toEqual({ type: 'about', id: null })
  })

  it('setActiveModal with project type and id', () => {
    const modal: ActiveModal = { type: 'project', id: 'censor-wav' }
    useTerminalStore.getState().setActiveModal(modal)
    expect(useTerminalStore.getState().activeModal).toEqual({ type: 'project', id: 'censor-wav' })
  })

  it('setActiveModal(null) resets activeModal to null', () => {
    useTerminalStore.getState().setActiveModal({ type: 'about', id: null })
    useTerminalStore.getState().setActiveModal(null)
    expect(useTerminalStore.getState().activeModal).toBeNull()
  })

  it('preserves Phase 2 phase field', () => {
    const state = useTerminalStore.getState()
    expect(state.phase).toBe('booting')
    expect(typeof state.setPhase).toBe('function')
  })

  it('preserves Phase 3 output and history fields', () => {
    const state = useTerminalStore.getState()
    expect(Array.isArray(state.output)).toBe(true)
    expect(Array.isArray(state.history)).toBe(true)
    expect(typeof state.appendOutput).toBe('function')
    expect(typeof state.clearOutput).toBe('function')
    expect(typeof state.pushHistory).toBe('function')
  })
})

describe('OutputItem type — modal-link variant', () => {
  it('can create a modal-link OutputItem and append it to output', () => {
    useTerminalStore.setState({ output: [] })
    const modalLinkItem = {
      kind: 'modal-link' as const,
      label: 'Censor Wav',
      modalType: 'project' as const,
      payload: 'censor-wav',
      id: 'test-id-1',
    }
    useTerminalStore.getState().appendOutput([modalLinkItem])
    const output = useTerminalStore.getState().output
    expect(output).toHaveLength(1)
    expect(output[0]).toEqual(modalLinkItem)
    expect(output[0].kind).toBe('modal-link')
  })

  it('modal-link item has modalType field', () => {
    useTerminalStore.setState({ output: [] })
    const item = {
      kind: 'modal-link' as const,
      label: 'XMRig Post',
      modalType: 'post' as const,
      payload: 'pi-xmrig-oom',
      id: 'test-id-2',
    }
    useTerminalStore.getState().appendOutput([item])
    const stored = useTerminalStore.getState().output[0]
    if (stored.kind === 'modal-link') {
      expect(stored.modalType).toBe('post')
      expect(stored.payload).toBe('pi-xmrig-oom')
    }
  })
})

describe('ModalType type coverage', () => {
  it('accepts all valid ModalType values', () => {
    const validTypes: ModalType[] = ['project', 'post', 'about', 'contact', 'resume']
    validTypes.forEach((type) => {
      useTerminalStore.getState().setActiveModal({ type, id: null })
      expect(useTerminalStore.getState().activeModal?.type).toBe(type)
    })
  })
})
