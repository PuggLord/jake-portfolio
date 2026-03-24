// src/store/terminal.ts
import { create } from 'zustand'

export type OutputItem =
  | { kind: 'text'; content: string; id: string }
  | { kind: 'command-link'; label: string; command: string; id: string }
  | { kind: 'modal-link'; label: string; modalType: 'project' | 'post'; payload: string; id: string }

export type ModalType = 'project' | 'post' | 'about' | 'contact' | 'resume'

export interface ActiveModal {
  type: ModalType
  id: string | null
}

interface TerminalStore {
  // Phase 2 fields — DO NOT REMOVE
  phase: 'booting' | 'terminal'
  setPhase: (phase: TerminalStore['phase']) => void

  // Phase 3 additions
  output: OutputItem[]
  history: string[]           // commands entered this session, oldest-first
  appendOutput: (items: OutputItem[]) => void
  clearOutput: () => void
  pushHistory: (cmd: string) => void

  // Phase 4 additions
  activeModal: ActiveModal | null
  setActiveModal: (modal: ActiveModal | null) => void
}

export const useTerminalStore = create<TerminalStore>()((set) => ({
  phase: 'booting',
  setPhase: (phase) => set({ phase }),

  output: [],
  history: [],
  appendOutput: (items) => set((s) => ({ output: [...s.output, ...items] })),
  clearOutput: () => set({ output: [] }),
  pushHistory: (cmd) => set((s) => ({ history: [...s.history, cmd] })),

  activeModal: null,
  setActiveModal: (modal) => set({ activeModal: modal }),
}))
