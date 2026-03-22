// portfolio/src/App.tsx
import { useState, useEffect } from 'react'
import { useTerminalStore } from './store/terminal'
import { VISITED_KEY } from './constants/boot'
import BootSequence from './components/boot/BootSequence'

// Terminal placeholder — Phase 3 replaces this with the real Terminal component
function Terminal() {
  return (
    <div className="min-h-screen flex items-center justify-center font-mono text-[#4af626]">
      <p>{'>'} jake-os terminal — Phase 3 will wire this up</p>
    </div>
  )
}

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
