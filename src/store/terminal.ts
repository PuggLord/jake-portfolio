// src/store/terminal.ts
import { create } from 'zustand'

interface TerminalStore {
  // Phase 3 will expand this
  phase: 'booting' | 'terminal'
  setPhase: (phase: TerminalStore['phase']) => void
}

export const useTerminalStore = create<TerminalStore>((set) => ({
  phase: 'booting',
  setPhase: (phase) => set({ phase }),
}))
