// portfolio/src/hooks/useCommandDispatch.ts
import { useTerminalStore } from '../store/terminal'
import type { OutputItem } from '../store/terminal'
import { COMMAND_REGISTRY, PROMPT } from '../constants/terminal'

const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2)

// Compound alias pre-processing — multi-word inputs that map to a single command
// Must be checked before splitting on whitespace (e.g. "cat posts" → "blog")
const COMPOUND_ALIASES: Record<string, string> = {
  'cat posts': 'blog',
  'rm -rf /': 'rm-rf',
}

/**
 * Returns a dispatch function that resolves a command name, appends the
 * simulated prompt echo + output items to the store, and records history.
 *
 * Special case: 'clear' calls clearOutput() instead of appending.
 */
export function useCommandDispatch() {
  const appendOutput = useTerminalStore((s) => s.appendOutput)
  const clearOutput = useTerminalStore((s) => s.clearOutput)
  const pushHistory = useTerminalStore((s) => s.pushHistory)

  return function dispatch(rawInput: string) {
    const input = rawInput.trim()
    if (!input) return

    // Compound alias pre-processing (e.g. "cat posts" → "blog")
    // Must check before split to handle multi-word inputs
    const compoundTarget = COMPOUND_ALIASES[input.toLowerCase()]
    if (compoundTarget) {
      return dispatch(compoundTarget)
    }

    // Push to session history (before resolving — consistent with real shells)
    pushHistory(input)

    // Parse: first token is command name, rest are args
    const [commandName, ...args] = input.split(/\s+/)

    // Special case: clear wipes the screen — no echo, no output items
    if (commandName === 'clear') {
      clearOutput()
      return
    }

    // Prompt echo: shows the command as if typed
    const echoItem: OutputItem = {
      kind: 'text',
      content: `${PROMPT}${input}`,
      id: uid(),
    }

    // Resolve command handler
    const handler = COMMAND_REGISTRY[commandName]
    if (handler) {
      const outputItems = handler(args)
      appendOutput([echoItem, ...outputItems])
    } else {
      // TERM-07: unrecognized command error
      const errorItem: OutputItem = {
        kind: 'text',
        content: `command not found: ${commandName} — try 'help' for available commands`,
        id: uid(),
      }
      appendOutput([echoItem, errorItem])
    }
  }
}
