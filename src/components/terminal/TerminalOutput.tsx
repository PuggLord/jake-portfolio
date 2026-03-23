// portfolio/src/components/terminal/TerminalOutput.tsx
import { useEffect, useRef } from 'react'
import { useTerminalStore } from '../../store/terminal'
import OutputItem from './OutputItem'

interface Props {
  onCommand: (cmd: string) => void
  inputRef: React.RefObject<HTMLInputElement | null>
}

export default function TerminalOutput({ onCommand, inputRef }: Props) {
  const output = useTerminalStore((s) => s.output)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'auto' })
  }, [output])

  return (
    <div
      role="log"
      aria-live="polite"
      aria-label="Terminal output"
      className="flex-1 overflow-y-auto px-4 py-4 font-mono"
    >
      {output.map((item) => (
        <OutputItem key={item.id} item={item} onCommand={onCommand} inputRef={inputRef} />
      ))}
      <div ref={bottomRef} />
    </div>
  )
}
