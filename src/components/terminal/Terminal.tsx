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
  const output = useTerminalStore((s) => s.output)
  const dispatch = useCommandDispatch()
  const inputRef = useRef<HTMLInputElement>(null)

  // Seed banner + help on first mount only.
  // Guard: output.length === 0 prevents double-seeding on React StrictMode double-mount.
  useEffect(() => {
    if (output.length === 0) {
      const initialItems: OutputItem[] = [
        { kind: 'text', content: ASCII_BANNER, id: 'banner' },
        { kind: 'text', content: 'software engineer', id: 'subtitle' },
        { kind: 'text', content: "type 'help' to get started", id: 'hint' },
        ...HELP_OUTPUT_ITEMS,
      ]
      appendOutput(initialItems)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // intentionally fire once on mount

  return (
    <div className="flex flex-col bg-[#0d1117] h-screen overflow-hidden">
      {/* Scrollable region: output + input */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* TerminalOutput fills remaining space, scrolls independently */}
        <TerminalOutput
          onCommand={dispatch}
          inputRef={inputRef}
        />
        {/* Input row — not scrolled, always visible at bottom of this flex column */}
        <TerminalInput inputRef={inputRef} />
      </div>

      {/* Fixed overlays — outside the flex flow */}
      {/* MobileCommandBar z-40 sits above StatusBar z-30 */}
      <MobileCommandBar onCommand={dispatch} />
      <StatusBar />
    </div>
  )
}
