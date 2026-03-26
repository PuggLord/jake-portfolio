// portfolio/src/components/terminal/TerminalInput.tsx
import { useState } from 'react'
import { useCommandDispatch } from '../../hooks/useCommandDispatch'
import { useHistoryNavigation } from '../../hooks/useHistoryNavigation'
import { useTabComplete } from '../../hooks/useTabComplete'
import { PROMPT } from '../../constants/terminal'

interface Props {
  inputRef: React.RefObject<HTMLInputElement | null>
}

export default function TerminalInput({ inputRef }: Props) {
  const [inputValue, setInputValue] = useState('')

  const dispatch = useCommandDispatch()
  const { navigateHistory, resetCursor } = useHistoryNavigation(inputValue, setInputValue)
  const { handleTab, notifyInputChanged } = useTabComplete(inputValue, setInputValue)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const cmd = inputValue.trim()
      if (cmd) dispatch(cmd)
      resetCursor()
      setInputValue('')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      navigateHistory('up')
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      navigateHistory('down')
    } else if (e.key === 'Tab') {
      e.preventDefault()
      handleTab()
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault()
      dispatch('clear')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    notifyInputChanged()
  }

  // Strip trailing space from PROMPT — spacing comes from mr-2 on the label span
  const promptLabel = PROMPT.trimEnd()

  return (
    <div className="flex font-mono px-4 pb-4 pt-1" style={{ color: 'var(--accent)' }}>
      <span className="mr-2 select-none whitespace-nowrap">{promptLabel}</span>
      <input
        ref={inputRef}
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="bg-transparent outline-none border-none flex-1 font-mono"
        style={{ color: 'var(--accent)', caretColor: 'var(--accent)' }}
        autoFocus
        aria-label="Terminal input"
        spellCheck={false}
        autoComplete="off"
      />
    </div>
  )
}
