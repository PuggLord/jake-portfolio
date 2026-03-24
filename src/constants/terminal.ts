// portfolio/src/constants/terminal.ts
import type { OutputItem } from '../store/terminal'
import { useTerminalStore } from '../store/terminal'
import { projects } from '../content/projects'
import { posts } from '../content/posts'

// ─── Prompt & UI ───────────────────────────────────────────────────────────

/** Prompt prefix displayed before every input line */
export const PROMPT = 'jake-os $ '

/** Fixed status bar content — always visible at bottom of viewport */
export const STATUS_BAR_TEXT = "jake-os v1.0  |  linkedin.com/in/jake-manis-304406311"

// ─── Commands ──────────────────────────────────────────────────────────────

/** All valid command names. Mobile chips and help output derive from this. */
export const COMMAND_NAMES = [
  'help', 'about', 'projects', 'blog', 'contact', 'resume', 'clear',
] as const
export type CommandName = typeof COMMAND_NAMES[number]

/** Commands shown in the mobile tap bar (same list in Phase 3) */
export const MOBILE_COMMANDS: CommandName[] = [
  'help', 'about', 'projects', 'blog', 'contact', 'resume', 'clear',
]

// ─── ASCII Banner ──────────────────────────────────────────────────────────

/**
 * Pre-generated "JAKE MANIS" ASCII art.
 * Font: "Big" from https://patorjk.com/software/taag/
 * Each line is ≤80 characters. Verified before committing.
 */
export const ASCII_BANNER = `      _   _    _  _______   __  __    _    _   _ ___ ____
     | | / \\  | |/ / ____| |  \\/  |  / \\  | \\ | |_ _/ ___|
  _  | |/ _ \\ | ' /|  _|   | |\\/| | / _ \\ |  \\| || |\\___ \\
 | |_| / ___ \\| . \\| |___  | |  | |/ ___ \\| |\\  || | ___) |
  \\___/_/   \\_\\_|\\_\\_____| |_|  |_/_/   \\_\\_| \\_|___|____/`

// ─── Help Output ───────────────────────────────────────────────────────────

/** Unique ID generator for OutputItems — no module-level counter needed */
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2)

/**
 * Help output items. Command names are command-link kind so they are clickable.
 * Column-aligned with spaces (monospace). Em dash (—) separator.
 * Exact copy from UI-SPEC §Copywriting Contract.
 */
export const HELP_OUTPUT_ITEMS: OutputItem[] = [
  { kind: 'command-link', label: 'help       — show available commands', command: 'help',     id: uid() },
  { kind: 'command-link', label: 'about      — who is jake',             command: 'about',    id: uid() },
  { kind: 'command-link', label: 'projects   — view projects',           command: 'projects', id: uid() },
  { kind: 'command-link', label: 'blog       — read writing',            command: 'blog',     id: uid() },
  { kind: 'command-link', label: 'contact    — get in touch',            command: 'contact',  id: uid() },
  { kind: 'command-link', label: 'resume     — view resume',             command: 'resume',   id: uid() },
  { kind: 'command-link', label: 'clear      — clear the terminal',      command: 'clear',    id: uid() },
]

// ─── Command Registry ──────────────────────────────────────────────────────

export type CommandHandler = (args: string[]) => OutputItem[]

/**
 * Extensible command registry.
 * Phase 4 imports this object and adds entries without modifying this file.
 * 'clear' returns [] — the dispatch hook calls clearOutput() separately.
 * 'about', 'projects', etc. are stub entries returning a "coming soon" message
 * so mobile tap buttons work (don't crash) before Phase 4 is built.
 */
export const COMMAND_REGISTRY: Record<string, CommandHandler> = {
  help: (_args) => HELP_OUTPUT_ITEMS,
  clear: (_args) => [],
  // Phase 4 real implementations (CONT-01 through CONT-05)
  about: (_args) => {
    useTerminalStore.getState().setActiveModal({ type: 'about', id: null })
    return []
  },
  projects: (_args) => [
    { kind: 'text' as const, content: 'projects — select one to view details', id: uid() },
    ...projects.map((p) => ({
      kind: 'modal-link' as const,
      label: p.name,
      modalType: 'project' as const,
      payload: p.slug,
      id: uid(),
    })),
  ],
  blog: (_args) => [
    { kind: 'text' as const, content: 'posts — select one to read', id: uid() },
    ...posts.map((p) => ({
      kind: 'modal-link' as const,
      label: p.title,
      modalType: 'post' as const,
      payload: p.slug,
      id: uid(),
    })),
  ],
  contact: (_args) => {
    useTerminalStore.getState().setActiveModal({ type: 'contact', id: null })
    return []
  },
  resume: (_args) => {
    useTerminalStore.getState().setActiveModal({ type: 'resume', id: null })
    return []
  },
  // Silent aliases — not in COMMAND_NAMES, HELP_OUTPUT_ITEMS, or MOBILE_COMMANDS (Decision E)
  whoami: (_args) => COMMAND_REGISTRY['about'](_args),
  ls:     (_args) => COMMAND_REGISTRY['projects'](_args),
  // Easter egg
  pug: (_args) => [
    { kind: 'text', content: '  (\\(\\', id: uid() },
    { kind: 'text', content: '  ( -.-)    woof! you found the secret pug command', id: uid() },
    { kind: 'text', content: "  o_(\")(\")", id: uid() },
  ],
}
