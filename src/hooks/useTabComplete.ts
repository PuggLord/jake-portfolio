// portfolio/src/hooks/useTabComplete.ts
import { useRef } from 'react'
import { COMMAND_NAMES } from '../constants/terminal'

type SetInput = (value: string) => void

interface CycleState {
  matches: string[]
  index: number
}

/**
 * Provides Tab key autocomplete cycling.
 * Call handleTab() on Tab keydown.
 * Call notifyInputChanged() on every onChange (non-Tab input mutation).
 */
export function useTabComplete(inputValue: string, setInputValue: SetInput) {
  const cycleStateRef = useRef<CycleState | null>(null)
  const lastActionWasTabRef = useRef(false)

  function handleTab() {
    lastActionWasTabRef.current = true

    if (cycleStateRef.current === null) {
      // First Tab press — compute matches from current input
      const prefix = inputValue.toLowerCase()
      const matches = [...COMMAND_NAMES].filter((name) => name.startsWith(prefix))
      if (matches.length === 0) return   // no match — do nothing
      cycleStateRef.current = { matches, index: 0 }
    }

    const { matches, index } = cycleStateRef.current
    setInputValue(matches[index % matches.length])
    cycleStateRef.current = { matches, index: index + 1 }
  }

  function notifyInputChanged() {
    if (!lastActionWasTabRef.current) {
      // Input changed due to a non-Tab keystroke — reset cycle
      cycleStateRef.current = null
    }
    lastActionWasTabRef.current = false
  }

  return { handleTab, notifyInputChanged }
}
