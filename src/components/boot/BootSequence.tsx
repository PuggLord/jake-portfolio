// portfolio/src/components/boot/BootSequence.tsx
import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import BiosPost from './BiosPost'
import LoadingBar from './LoadingBar'
import LoginPrompt from './LoginPrompt'
import { BOOT_TIMING, LOADING_LABELS, buildBar } from '../../constants/boot'

gsap.registerPlugin(useGSAP)

interface BootSequenceProps {
  onComplete: () => void
}

export default function BootSequence({ onComplete }: BootSequenceProps) {
  // Master container ref — GSAP scopes all queries to this element
  const containerRef = useRef<HTMLDivElement>(null)

  // Timeline ref — allows skip handler (event-driven, outside useGSAP) to call progress(1)
  const tlRef = useRef<gsap.core.Timeline | null>(null)

  // Flash overlay ref — briefly fills screen on terminal transition
  const flashRef = useRef<HTMLDivElement>(null)

  // Sub-component refs
  const biosRef = useRef<HTMLDivElement>(null)
  const loadingBarRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const barRef = useRef<HTMLSpanElement>(null)
  const loginWrapperRef = useRef<HTMLDivElement>(null)
  const loginRef = useRef<HTMLDivElement>(null)
  const usernameRef = useRef<HTMLSpanElement>(null)
  const passwordRef = useRef<HTMLSpanElement>(null)
  const welcomeRef = useRef<HTMLDivElement>(null)
  const lastLoginRef = useRef<HTMLDivElement>(null)

  // Progress object for loading bar — mutated by GSAP, never stored in React state
  const progressObj = useRef({ value: 0 })

  const { contextSafe } = useGSAP(
    () => {
      const mm = gsap.matchMedia()

      // Branch 1: Full animation (default — user has no motion preference)
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({ onComplete })
        tlRef.current = tl

        // --- Stage 1: BIOS POST ---
        // Hide all bios lines initially, then stagger-reveal them
        tl.set('.bios-line', { opacity: 0 })

        // Stagger reveal: each line appears whole (duration: 0 = instant appear, no fade)
        tl.from('.bios-line', {
          opacity: 0,
          duration: 0,
          stagger: BOOT_TIMING.biosLineStagger,
        })

        // Fade out BIOS, then loading bar takes over at top-left
        tl.to(biosRef.current, {
          opacity: 0,
          duration: BOOT_TIMING.biosFadeOut,
          ease: 'power1.in',
        })

        // --- Stage 2: Loading bar (starts at top-left after BIOS clears) ---
        tl.to('.loading-bar-container', { opacity: 1, duration: 0.1 })

        // Helper: update bar text content directly (no React state)
        const updateBar = (pct: number) => {
          if (barRef.current) barRef.current.textContent = buildBar(pct)
        }
        const updateLabel = (index: number) => {
          if (labelRef.current) labelRef.current.textContent = LOADING_LABELS[index]
        }

        // Jitter sequence: fast to 40%, stall, jump to 80%, stall, complete
        tl.to(progressObj.current, {
          value: 40,
          duration: BOOT_TIMING.loadingTo40,
          ease: 'power1.in',
          onUpdate: () => { updateBar(progressObj.current.value); updateLabel(0) },
        })
        tl.to(progressObj.current, {
          value: 42,
          duration: BOOT_TIMING.loadingStall1,
          ease: 'none',
          onUpdate: () => { updateBar(progressObj.current.value); updateLabel(1) },
        })
        tl.to(progressObj.current, {
          value: 80,
          duration: BOOT_TIMING.loadingTo80,
          ease: 'power2.out',
          onUpdate: () => { updateBar(progressObj.current.value); updateLabel(1) },
        })
        tl.to(progressObj.current, {
          value: 81,
          duration: BOOT_TIMING.loadingStall2,
          ease: 'none',
          onUpdate: () => { updateBar(progressObj.current.value); updateLabel(2) },
        })
        tl.to(progressObj.current, {
          value: 100,
          duration: BOOT_TIMING.loadingTo100,
          ease: 'power1.out',
          onUpdate: () => { updateBar(progressObj.current.value); updateLabel(3) },
        })

        // --- Stage 3: Login prompt ---
        // Fade out loading bar, then login appears at top-left
        tl.to(loadingBarRef.current, {
          opacity: 0,
          duration: BOOT_TIMING.biosFadeOut,
          ease: 'power1.in',
        })

        // Show login wrapper
        tl.set(loginWrapperRef.current, { opacity: 1 })

        // Type username 'visitor' character by character
        const typingObj = { chars: 0 }
        const usernameStr = 'visitor'
        tl.to(typingObj, {
          chars: usernameStr.length,
          duration: BOOT_TIMING.loginUsernameType,
          ease: 'none',
          onUpdate: () => {
            if (usernameRef.current) {
              usernameRef.current.textContent = usernameStr.slice(
                0, Math.ceil(typingObj.chars)
              )
            }
          },
        })

        // Fill password with asterisks fast
        const passObj = { chars: 0 }
        tl.to(passObj, {
          chars: 8,
          duration: BOOT_TIMING.loginPasswordFill,
          ease: 'power2.in',
          onUpdate: () => {
            if (passwordRef.current) {
              passwordRef.current.textContent = '*'.repeat(Math.ceil(passObj.chars))
            }
          },
        })

        // Reveal Welcome and Last login lines (staggered)
        tl.to(welcomeRef.current, {
          opacity: 1,
          duration: 0,
          delay: BOOT_TIMING.loginLineStagger,
        })
        tl.to(lastLoginRef.current, {
          opacity: 1,
          duration: 0,
          delay: BOOT_TIMING.loginLineStagger,
        })

        // Post-login pause before flash
        tl.to({}, { duration: BOOT_TIMING.postLoginPause })

        // --- Stage 4: Flash transition ---
        tl.to(flashRef.current, {
          opacity: 1,
          duration: BOOT_TIMING.flashOn,
          ease: 'none',
        })
        tl.to(flashRef.current, {
          opacity: 0,
          duration: BOOT_TIMING.flashOff,
          ease: 'none',
        })
        // onComplete fires here via timeline's onComplete callback
      })

      // Branch 2: prefers-reduced-motion — skip all animation, go straight to terminal
      mm.add('(prefers-reduced-motion: reduce)', () => {
        // No timeline created. Call onComplete immediately.
        onComplete()
      })
    },
    { scope: containerRef }
  )

  // Skip handler — contextSafe so it's tracked by useGSAP for cleanup
  const skip = contextSafe(() => {
    if (tlRef.current) {
      tlRef.current.progress(1).pause()
    }
  })

  // Register skip listeners via useEffect (event-driven, outside animation code)
  useEffect(() => {
    window.addEventListener('keydown', skip)
    window.addEventListener('mousedown', skip)
    return () => {
      window.removeEventListener('keydown', skip)
      window.removeEventListener('mousedown', skip)
    }
  }, [skip])

  return (
    <div
      ref={containerRef}
      className="boot-container"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#0d1117',
        padding: 0,
        margin: 0,
        zIndex: 50,
        overflow: 'hidden',
      }}
      aria-hidden="true"
    >
      {/* Stage 1: BIOS POST */}
      <BiosPost ref={biosRef} />

      {/* Stage 2: Loading bar */}
      <LoadingBar ref={loadingBarRef} labelRef={labelRef} barRef={barRef} />

      {/* Stage 3: Login prompt (initially hidden — GSAP reveals loginWrapperRef) */}
      <div ref={loginWrapperRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', opacity: 0 }}>
        <LoginPrompt
          ref={loginRef}
          usernameRef={usernameRef}
          passwordRef={passwordRef}
          welcomeRef={welcomeRef}
          lastLoginRef={lastLoginRef}
        />
      </div>

      {/* Flash overlay — sits above all boot content */}
      <div
        ref={flashRef}
        className="flash-overlay fixed inset-0 bg-[#4af626] z-50 pointer-events-none"
        style={{ opacity: 0 }}
        aria-hidden="true"
      />
    </div>
  )
}
