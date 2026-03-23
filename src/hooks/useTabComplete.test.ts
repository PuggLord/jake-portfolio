// portfolio/src/hooks/useTabComplete.test.ts
import { describe, it } from 'vitest'

describe('useTabComplete', () => {
  // TERM-04
  it.todo('handleTab with input "h" and command list [help,about,blog] sets input to "help" (TERM-04)')
  it.todo('handleTab again cycles to next h-prefixed match if any (TERM-04)')
  it.todo('handleTab with no matching prefix does nothing — input unchanged (TERM-04)')
  it.todo('handleTab with exact single match completes to that command')
  it.todo('non-Tab input change resets cycle state so next Tab starts fresh (TERM-04)')
})
