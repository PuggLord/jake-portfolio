// portfolio/src/components/terminal/MobileCommandBar.tsx
import { MOBILE_COMMANDS } from '../../constants/terminal'

interface Props {
  onCommand: (cmd: string) => void
}

export default function MobileCommandBar({ onCommand }: Props) {
  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 pb-[env(safe-area-inset-bottom)] border-t"
      style={{
        backgroundColor: 'var(--bg)',
        borderTopColor: 'color-mix(in srgb, var(--accent) 30%, transparent)',
      }}
    >
      <div className="flex flex-wrap gap-2 p-2 justify-center">
        {MOBILE_COMMANDS.map((cmd) => (
          <button
            key={cmd}
            className="font-mono text-sm px-2 py-1 cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center border"
            style={{ borderColor: 'var(--accent)', color: 'var(--accent)', backgroundColor: 'var(--bg)' }}
            onClick={() => onCommand(cmd)}
            aria-label={`Run ${cmd} command`}
          >
            [{cmd}]
          </button>
        ))}
      </div>
    </div>
  )
}
