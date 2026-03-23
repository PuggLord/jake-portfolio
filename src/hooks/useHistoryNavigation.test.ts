// portfolio/src/hooks/useHistoryNavigation.test.ts
import { describe, it } from 'vitest'

describe('useHistoryNavigation', () => {
  // TERM-03
  it.todo('navigateHistory up with history [help, about] sets input to "about" (newest first) (TERM-03)')
  it.todo('navigateHistory up again sets input to "help" (TERM-03)')
  it.todo('navigateHistory up at oldest item clamps — stays on "help" (TERM-03)')
  it.todo('navigateHistory down from oldest sets input to "about" then draft (TERM-03)')
  it.todo('navigateHistory down past newest restores the draft input (TERM-03)')
  it.todo('navigateHistory up saves draft before first navigation')
})
