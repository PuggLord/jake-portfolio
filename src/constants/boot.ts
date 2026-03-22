// portfolio/src/constants/boot.ts

/** localStorage key used to detect return visitors. Stable — never change after Phase 2. */
export const VISITED_KEY = 'jakeos_visited'

/** Each BIOS line. label = left column text, ok = right-aligned status suffix.
 *  divider lines have ok: '' and isHeader/isDivider flags for rendering decisions. */
export interface BiosLine {
  label: string
  ok: string
  isHeader?: boolean
  isDivider?: boolean
  isMemTest?: boolean
}

export const BIOS_LINES: BiosLine[] = [
  { label: 'JAKE-OS BIOS v2.6.0', ok: '', isHeader: true },
  { label: '────────────────────────────────────────────────────────────', ok: '', isDivider: true },
  { label: 'CPU:  Jake Manis v27.0 @ 3.14GHz', ok: '...OK' },
  { label: 'RAM Bank 0: TypeScript 5.x ................. 16384 MB', ok: '...OK' },
  { label: 'RAM Bank 1: React 19.x ..................... 16384 MB', ok: '...OK' },
  { label: 'RAM Bank 2: Node.js 22.x ................... 8192 MB', ok: '...OK' },
  { label: 'RAM Bank 3: PostgreSQL 16.x ................ 8192 MB', ok: '...OK' },
  { label: 'RAM Bank 4: Python 3.12.x .................. 4096 MB', ok: '...OK' },
  { label: 'RAM Bank 5: Docker 26.x .................... 4096 MB', ok: '...OK' },
  { label: 'GPU:  Figma Pro Max @ 8K Creative ............. 24GB', ok: '...OK' },
  { label: '/dev/projects .............. 47.3 GB   [ext4]', ok: '...OK' },
  { label: '/dev/blog ..................  8.1 GB   [ext4]', ok: '...OK' },
  { label: '/dev/experience ............ 12.7 GB  [ext4]', ok: '...OK' },
  { label: 'Testing RAM ████████████████ 100%', ok: ' OK', isMemTest: true },
]

/** Status labels shown above the ASCII loading bar as progress advances */
export const LOADING_LABELS = [
  'Loading kernel...',          // 0%
  'Mounting /dev/portfolio...',  // ~40%
  'Starting services...',        // ~80%
  'Boot complete.',              // 100%
] as const

/** Timing constants in seconds. Matches UI-SPEC §Animation Timing Contract */
export const BOOT_TIMING = {
  biosLineStagger: 0.1,         // 100ms between BIOS lines
  biosMemTestFill: 0.5,         // memory test bar fill duration
  biosFadeOut: 0.15,            // BIOS container fade to opacity:0 before login
  loadingBarTotal: 1.5,         // total loading bar stage
  loadingTo40: 0.3,             // fast to 40%
  loadingStall1: 0.4,           // stall near 40%
  loadingTo80: 0.3,             // jump to 80%
  loadingStall2: 0.3,           // stall near 80%
  loadingTo100: 0.2,            // complete
  loginUsernameType: 0.5,       // 'visitor' types out
  loginPasswordFill: 0.3,       // asterisks fill
  loginLineStagger: 0.2,        // welcome + last login lines
  postLoginPause: 1.0,          // pause after last login line
  flashOn: 0.08,                // flash overlay to opacity:1
  flashOff: 0.05,               // flash overlay to opacity:0
} as const

/** ASCII bar width (number of # characters at 100%) */
export const BAR_WIDTH = 20

/** Builds the ASCII loading bar string from a 0-100 percent value */
export function buildBar(percent: number): string {
  const filled = Math.round((percent / 100) * BAR_WIDTH)
  const empty = BAR_WIDTH - filled
  return `[${'#'.repeat(filled)}${' '.repeat(empty)}] ${Math.round(percent)}%`
}
