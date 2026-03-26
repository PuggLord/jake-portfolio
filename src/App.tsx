// portfolio/src/App.tsx
import { useState, useEffect } from 'react'
import { useTerminalStore } from './store/terminal'
import { VISITED_KEY } from './constants/boot'
import { THEME_STORAGE_KEY, VALID_THEMES } from './constants/themes'
import type { ThemeName } from './constants/themes'
import BootSequence from './components/boot/BootSequence'
import Terminal from './components/terminal/Terminal'

export default function App() {
  const phase = useTerminalStore((s) => s.phase)
  const setPhase = useTerminalStore((s) => s.setPhase)

  // Synchronous localStorage read — runs before first render so return-visitors never see BootSequence
  const [skipBoot] = useState(() => localStorage.getItem(VISITED_KEY) === '1')

  // Synchronous theme read — sets data-theme attribute before first paint to prevent flash
  // Store already initialized with saved theme at module level; this keeps DOM in sync
  useState<ThemeName>(() => {
    const saved = localStorage.getItem(THEME_STORAGE_KEY)
    const theme: ThemeName =
      saved && VALID_THEMES.includes(saved as ThemeName)
        ? (saved as ThemeName)
        : 'green'
    document.documentElement.setAttribute('data-theme', theme)
    return theme
  })

  useEffect(() => {
    if (skipBoot) {
      setPhase('terminal')
    }
  }, [skipBoot, setPhase])

  const handleBootComplete = () => {
    localStorage.setItem(VISITED_KEY, '1')
    setPhase('terminal')
  }

  if (phase === 'terminal' || skipBoot) {
    return <Terminal />
  }

  return <BootSequence onComplete={handleBootComplete} />
}
