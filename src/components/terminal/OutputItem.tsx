// portfolio/src/components/terminal/OutputItem.tsx
import type { OutputItem as OutputItemType } from '../../store/terminal'
import { useTerminalStore } from '../../store/terminal'

interface Props {
  item: OutputItemType
  onCommand: (cmd: string) => void
  inputRef: React.RefObject<HTMLInputElement | null>
}

export default function OutputItem({ item, onCommand, inputRef }: Props) {
  if (item.kind === 'command-link') {
    return (
      <div>
        <button
          role="link"
          className="font-mono underline decoration-transparent hover:decoration-current underline-offset-2 cursor-pointer transition-all duration-150 bg-transparent border-none p-0"
          style={{ color: 'var(--accent)' }}
          onClick={(e) => {
            e.preventDefault()
            onCommand(item.command)
            inputRef.current?.focus()
          }}
        >
          {item.label}
        </button>
      </div>
    )
  }
  if (item.kind === 'modal-link') {
    return (
      <div>
        <button
          role="button"
          aria-label={`Open ${item.label} details`}
          className="font-mono underline decoration-transparent hover:decoration-current underline-offset-2 cursor-pointer transition-all duration-150 bg-transparent border-none p-0"
          style={{ color: 'var(--accent)' }}
          onClick={() => {
            useTerminalStore.getState().setActiveModal({ type: item.modalType, id: item.payload })
          }}
        >
          {item.label}
        </button>
      </div>
    )
  }
  if (item.kind === 'text') {
    return (
      <div>
        <span className="font-mono whitespace-pre-wrap leading-[1.5]" style={{ color: 'var(--accent)' }}>
          {item.content}
        </span>
      </div>
    )
  }
  // theme-list — rendered by Plan 03; placeholder until ThemeList component is built
  return null
}
