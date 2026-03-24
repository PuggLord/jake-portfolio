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
          className="text-[#4af626] font-mono underline decoration-transparent hover:decoration-[#4af626] underline-offset-2 cursor-pointer transition-all duration-150 bg-transparent border-none p-0"
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
          className="text-[#4af626] font-mono underline decoration-transparent hover:decoration-[#4af626] underline-offset-2 cursor-pointer transition-all duration-150 bg-transparent border-none p-0"
          onClick={() => {
            useTerminalStore.getState().setActiveModal({ type: item.modalType, id: item.payload })
          }}
        >
          {item.label}
        </button>
      </div>
    )
  }
  return (
    <div>
      <span className="text-[#4af626] font-mono whitespace-pre-wrap leading-[1.5]">
        {item.content}
      </span>
    </div>
  )
}
