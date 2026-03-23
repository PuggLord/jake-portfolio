// portfolio/src/components/terminal/StatusBar.tsx
import { STATUS_BAR_TEXT } from '../../constants/terminal'

export default function StatusBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-[#0d1117] border-t border-[#4af626]/30 px-4 py-1">
      <span className="text-[#4af626] font-mono text-sm whitespace-nowrap">
        {STATUS_BAR_TEXT}
      </span>
    </div>
  )
}
