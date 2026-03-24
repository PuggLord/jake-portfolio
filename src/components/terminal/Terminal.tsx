// portfolio/src/components/terminal/Terminal.tsx
import { useEffect, useRef } from 'react'
import { useTerminalStore } from '../../store/terminal'
import type { OutputItem } from '../../store/terminal'
import { ASCII_BANNER, HELP_OUTPUT_ITEMS } from '../../constants/terminal'
import { useCommandDispatch } from '../../hooks/useCommandDispatch'
import TerminalOutput from './TerminalOutput'
import TerminalInput from './TerminalInput'
import MobileCommandBar from './MobileCommandBar'
import StatusBar from './StatusBar'

export default function Terminal() {
  const appendOutput = useTerminalStore((s) => s.appendOutput)
  const dispatch = useCommandDispatch()
  const inputRef = useRef<HTMLInputElement>(null)
  // hasSeeded ref survives StrictMode double-effect; output.length check fails because
  // the closure captures stale [] before the store update propagates.
  const hasSeeded = useRef(false)

  useEffect(() => {
    if (!hasSeeded.current) {
      hasSeeded.current = true
      const initialItems: OutputItem[] = [
        { kind: 'text', content: ASCII_BANNER, id: 'banner' },
        { kind: 'text', content: 'software engineer', id: 'subtitle' },
        { kind: 'text', content: "type 'help' to get started", id: 'hint' },
        ...HELP_OUTPUT_ITEMS,
      ]
      appendOutput(initialItems)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex flex-col bg-[#0d1117] h-screen overflow-hidden">
      {/* pb-8 clears the fixed StatusBar so TerminalInput is never covered */}
      <div className="flex-1 flex flex-col overflow-hidden pb-8">
        <TerminalOutput
          onCommand={dispatch}
          inputRef={inputRef}
        />
        <TerminalInput inputRef={inputRef} />
      </div>

      {/* Fixed overlays — outside the flex flow */}
      {/* MobileCommandBar z-40 sits above StatusBar z-30 */}
      <MobileCommandBar onCommand={dispatch} />
      <StatusBar />
    </div>
  )
}
