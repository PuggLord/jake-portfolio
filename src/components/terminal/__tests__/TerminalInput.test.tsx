// portfolio/src/components/terminal/__tests__/TerminalInput.test.tsx
import { describe, it } from 'vitest'

describe('TerminalInput', () => {
  // TERM-01
  it.todo('pressing Enter with a non-empty input dispatches the command (TERM-01)')
  it.todo('pressing Enter with empty input does nothing')
  // TERM-03
  it.todo('pressing ArrowUp populates input with last history command (TERM-03)')
  it.todo('pressing ArrowDown past newest history item restores draft input (TERM-03)')
  // TERM-04
  it.todo('pressing Tab with partial prefix h completes to help (TERM-04)')
  it.todo('pressing Tab again cycles to next matching command (TERM-04)')
  it.todo('pressing Tab with no matching prefix does nothing (TERM-04)')
  // TERM-06
  it.todo('pressing Ctrl+L dispatches clear command (TERM-06)')
})
