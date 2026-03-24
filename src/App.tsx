// portfolio/src/App.tsx
import { useState, useEffect } from 'react'
import { useTerminalStore } from './store/terminal'
import { VISITED_KEY } from './constants/boot'
import BootSequence from './components/boot/BootSequence'
import Terminal from './components/terminal/Terminal'

export default function App() {
  const phase = useTerminalStore((s) => s.phase)
  const setPhase = useTerminalStore((s) => s.setPhase)

  // Synchronous localStorage read via lazy useState initializer.
  // Runs before first render so return-visitors never see BootSequence mount.
  const [skipBoot] = useState(() => localStorage.getItem(VISITED_KEY) === '1')

  useEffect(() => {
    if (skipBoot) {
      setPhase('terminal')
    }
  }, [skipBoot, setPhase])

  const handleBootComplete = () => {
    localStorage.setItem(VISITED_KEY, '1')
    setPhase('terminal')
  }

  // Return visitors or completed boot → show terminal
  if (phase === 'terminal' || skipBoot) {
    return <Terminal />
  }

  // First-time visitors → show boot sequence
  return <BootSequence onComplete={handleBootComplete} />
}
