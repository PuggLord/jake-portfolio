// portfolio/src/hooks/useHistoryNavigation.ts
import { useRef } from 'react'
import { useTerminalStore } from '../store/terminal'

type SetInput = (value: string) => void

/**
 * Provides arrow key history navigation.
 * cursorRef: -1 = not navigating; 0 = newest entry; history.length-1 = oldest.
 * draftRef: saves the in-progress input before the first Up press.
 * Call resetCursor() after Enter to prepare for next navigation session.
 */
export function useHistoryNavigation(inputValue: string, setInputValue: SetInput) {
  const history = useTerminalStore((s) => s.history)
  const cursorRef = useRef(-1)
  const draftRef = useRef('')

  function navigateHistory(direction: 'up' | 'down') {
    if (history.length === 0) return

    if (direction === 'up') {
      if (cursorRef.current === -1) {
        draftRef.current = inputValue   // save draft before first Up
      }
      const next = Math.min(cursorRef.current + 1, history.length - 1)
      cursorRef.current = next
      // history is oldest-first; index 0 = newest from the end
      setInputValue(history[history.length - 1 - next])
    } else {
      const next = cursorRef.current - 1
      if (next < 0) {
        cursorRef.current = -1
        setInputValue(draftRef.current)   // restore saved draft
      } else {
        cursorRef.current = next
        setInputValue(history[history.length - 1 - next])
      }
    }
  }

  function resetCursor() {
    cursorRef.current = -1
    draftRef.current = ''
  }

  return { navigateHistory, resetCursor }
}
