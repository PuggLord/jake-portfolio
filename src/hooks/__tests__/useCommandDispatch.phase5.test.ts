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
    theme: 'green',
  })
})

describe('useCommandDispatch — Phase 5 rm -rf / compound alias (EXTR-01)', () => {
  it('dispatching "rm -rf /" resolves to rm-rf handler and outputs "just kidding" content', () => {
    const dispatch = getDispatch()
    act(() => dispatch('rm -rf /'))
    const output = useTerminalStore.getState().output
    const allContent = output.map((r) => ('content' in r ? r.content : '')).join('\n')
    expect(allContent).toContain('just kidding')
  })
})
