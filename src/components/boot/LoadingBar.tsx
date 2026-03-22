// portfolio/src/components/boot/LoadingBar.tsx
import { forwardRef } from 'react'
import { LOADING_LABELS, buildBar } from '../../constants/boot'

export interface LoadingBarRefs {
  labelRef: React.RefObject<HTMLSpanElement | null>
  barRef: React.RefObject<HTMLSpanElement | null>
}

const LoadingBar = forwardRef<HTMLDivElement, LoadingBarRefs>(
  ({ labelRef, barRef }, ref) => {
    return (
      <div ref={ref} className="loading-bar-container font-mono" style={{ position: 'absolute', top: 0, left: 0, width: '100%', opacity: 0 }}>
        <div className="text-sm text-[#4af626] leading-relaxed">
          <span ref={labelRef}>{LOADING_LABELS[0]}</span>
        </div>
        <div className="text-sm text-[#4af626] leading-relaxed">
          <span ref={barRef}>{buildBar(0)}</span>
        </div>
      </div>
    )
  }
)

LoadingBar.displayName = 'LoadingBar'

export default LoadingBar
