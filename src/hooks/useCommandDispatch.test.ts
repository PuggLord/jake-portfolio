// portfolio/src/hooks/useCommandDispatch.test.ts
import { describe, it } from 'vitest'

describe('useCommandDispatch', () => {
  // TERM-01
  it.todo('dispatching "help" appends OutputItems to the store (TERM-01)')
  it.todo('dispatching "clear" calls clearOutput on the store (TERM-06)')
  // TERM-07
  it.todo('dispatching an unrecognized command appends error item containing "command not found: xyz" (TERM-07)')
  it.todo('dispatching any command appends a prompt echo line "jake-os $ [command]" first')
  it.todo('dispatching a non-empty command calls pushHistory with the command string')
})
