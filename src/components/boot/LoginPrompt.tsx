// portfolio/src/components/boot/LoginPrompt.tsx
import { forwardRef } from 'react'

export interface LoginPromptRefs {
  usernameRef: React.RefObject<HTMLSpanElement | null>
  passwordRef: React.RefObject<HTMLSpanElement | null>
  welcomeRef: React.RefObject<HTMLDivElement | null>
  lastLoginRef: React.RefObject<HTMLDivElement | null>
}

// Generated once at render time — theatrical date for the tty "last login" line
const lastLoginDate =
  new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  }) + ' 09:14:22 2025'

const LoginPrompt = forwardRef<HTMLDivElement, LoginPromptRefs>(
  ({ usernameRef, passwordRef, welcomeRef, lastLoginRef }, ref) => {
    return (
      <div ref={ref} className="login-prompt font-mono flex flex-col gap-2 mt-8">
        {/* Line 1: login prompt with animated username */}
        <div className="text-sm text-[#4af626] leading-relaxed">
          <span>jake-portfolio login: </span>
          <span ref={usernameRef}></span>
        </div>

        {/* Line 2: password field with animated asterisks */}
        <div className="text-sm text-[#4af626] leading-relaxed">
          <span>Password: </span>
          <span ref={passwordRef}></span>
        </div>

        {/* Spacer */}
        <div className="text-sm text-[#4af626] leading-relaxed">&nbsp;</div>

        {/* Line 3: welcome message (initially hidden — GSAP reveals it) */}
        <div
          ref={welcomeRef}
          className="text-sm text-[#4af626] leading-relaxed"
          style={{ opacity: 0 }}
        >
          Welcome, visitor.
        </div>

        {/* Line 4: last login (initially hidden — GSAP reveals it) */}
        <div
          ref={lastLoginRef}
          className="text-sm text-[#4af626] leading-relaxed"
          style={{ opacity: 0 }}
        >
          Last login: {lastLoginDate}
        </div>
      </div>
    )
  }
)

LoginPrompt.displayName = 'LoginPrompt'

export default LoginPrompt
