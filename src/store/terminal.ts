// src/store/terminal.ts
import { create } from 'zustand'
import { type ThemeName, THEME_STORAGE_KEY, VALID_THEMES } from '../constants/themes'

export type { ThemeName }

export type OutputItem =
  | { kind: 'text'; content: string; id: string }
  | { kind: 'command-link'; label: string; command: string; id: string }
  | { kind: 'modal-link'; label: string; modalType: 'project' | 'post'; payload: string; id: string }
  | { kind: 'theme-list'; themes: Array<{ name: ThemeName; hex: string; current: boolean }>; id: string }

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
  history: string[]
  appendOutput: (items: OutputItem[]) => void
  clearOutput: () => void
  pushHistory: (cmd: string) => void

  // Phase 4 additions
  activeModal: ActiveModal | null
  setActiveModal: (modal: ActiveModal | null) => void

  // Phase 5 additions
  theme: ThemeName
  setTheme: (name: ThemeName) => void
}

// Read saved theme at module level — store initializes correctly even before App.tsx runs
const savedTheme = localStorage.getItem(THEME_STORAGE_KEY)
const defaultTheme: ThemeName =
  savedTheme && VALID_THEMES.includes(savedTheme as ThemeName)
    ? (savedTheme as ThemeName)
    : 'green'

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

  // Phase 5: theme state
  theme: defaultTheme,
  setTheme: (name) => {
    document.documentElement.setAttribute('data-theme', name)
    localStorage.setItem(THEME_STORAGE_KEY, name)
    set({ theme: name })
  },
}))
