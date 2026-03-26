// portfolio/src/constants/themes.ts
export type ThemeName = 'green' | 'amber' | 'blue'

export const THEME_STORAGE_KEY = 'jake-os-theme'

export const VALID_THEMES: ThemeName[] = ['green', 'amber', 'blue']

export interface ThemePalette {
  bg: string
  text: string
  accent: string
}

// Hardcoded hex values here are INTENTIONAL — used for theme-list swatches
// which must show each theme's own color regardless of the active CSS vars.
export const THEMES: Record<ThemeName, ThemePalette> = {
  green: { bg: '#0d1117', text: '#c9d1d9', accent: '#4af626' },
  amber: { bg: '#0d0a00', text: '#e8d5a3', accent: '#ffb347' },
  blue:  { bg: '#0d1117', text: '#c9d1d9', accent: '#58a6ff' },
}
