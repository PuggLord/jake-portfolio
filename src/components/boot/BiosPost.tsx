// portfolio/src/components/boot/BiosPost.tsx
import { forwardRef } from 'react'
import { BIOS_LINES } from '../../constants/boot'

const BiosPost = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div ref={ref} className="font-mono">
      {BIOS_LINES.map((line, i) => {
        if (line.isHeader) {
          return (
            <div key={i} className="bios-line font-bold text-base text-[#4af626] leading-snug">
              {line.label}
            </div>
          )
        }
        if (line.isDivider) {
          return (
            <div key={i} className="bios-line text-sm text-[#4af626] leading-relaxed overflow-hidden">
              {line.label}
            </div>
          )
        }
        // Spec lines and memory test line: label + ok inline (no flex — authentic kernel layout)
        return (
          <div
            key={i}
            className="bios-line text-sm text-[#4af626] leading-relaxed"
          >
            {line.label}{line.ok}
          </div>
        )
      })}
    </div>
  )
})

BiosPost.displayName = 'BiosPost'

export default BiosPost
