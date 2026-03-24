import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useCommandDispatch } from '../useCommandDispatch'
import { useTerminalStore } from '../../store/terminal'

function getDispatch() {
  const { result } = renderHook(() => useCommandDispatch())
  return result.current
}

beforeEach(() => {
  useTerminalStore.setState({
    output: [],
    history: [],
    activeModal: null,
  })
})

describe('useCommandDispatch — Phase 4 command handlers', () => {
  // CONT-01
  it('dispatching "about" sets activeModal to { type: "about", id: null } (CONT-01)', () => {
    const dispatch = getDispatch()
    act(() => dispatch('about'))
    expect(useTerminalStore.getState().activeModal).toEqual({ type: 'about', id: null })
  })

  it('dispatching "whoami" alias sets activeModal to { type: "about", id: null } (CONT-01)', () => {
    const dispatch = getDispatch()
    act(() => dispatch('whoami'))
    expect(useTerminalStore.getState().activeModal).toEqual({ type: 'about', id: null })
  })

  // CONT-02
  it('dispatching "projects" appends modal-link OutputItems with modalType="project" (CONT-02)', () => {
    const dispatch = getDispatch()
    act(() => dispatch('projects'))
    const output = useTerminalStore.getState().output
    const modalLinks = output.filter((item) => item.kind === 'modal-link')
    expect(modalLinks.length).toBe(5)
    modalLinks.forEach((item) => {
      if (item.kind === 'modal-link') {
        expect(item.modalType).toBe('project')
      }
    })
  })

  it('dispatching "ls" alias appends project modal-link items (CONT-02)', () => {
    const dispatch = getDispatch()
    act(() => dispatch('ls'))
    const output = useTerminalStore.getState().output
    const modalLinks = output.filter((item) => item.kind === 'modal-link')
    expect(modalLinks.length).toBe(5)
  })

  // CONT-03
  it('dispatching "blog" appends modal-link OutputItems with modalType="post" (CONT-03)', () => {
    const dispatch = getDispatch()
    act(() => dispatch('blog'))
    const output = useTerminalStore.getState().output
    const modalLinks = output.filter((item) => item.kind === 'modal-link')
    expect(modalLinks.length).toBe(2)
    modalLinks.forEach((item) => {
      if (item.kind === 'modal-link') {
        expect(item.modalType).toBe('post')
      }
    })
  })

  it('dispatching "cat posts" compound alias triggers same as blog (CONT-03)', () => {
    const dispatch = getDispatch()
    act(() => dispatch('cat posts'))
    const output = useTerminalStore.getState().output
    const modalLinks = output.filter((item) => item.kind === 'modal-link')
    expect(modalLinks.length).toBe(2)
  })

  // CONT-04
  it('dispatching "contact" sets activeModal to { type: "contact", id: null } (CONT-04)', () => {
    const dispatch = getDispatch()
    act(() => dispatch('contact'))
    expect(useTerminalStore.getState().activeModal).toEqual({ type: 'contact', id: null })
  })

  // CONT-05
  it('dispatching "resume" sets activeModal to { type: "resume", id: null } (CONT-05)', () => {
    const dispatch = getDispatch()
    act(() => dispatch('resume'))
    expect(useTerminalStore.getState().activeModal).toEqual({ type: 'resume', id: null })
  })
})
