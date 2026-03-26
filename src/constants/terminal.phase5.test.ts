import { describe, it, beforeEach } from 'vitest'
import { useTerminalStore } from '../store/terminal'

describe('COMMAND_REGISTRY — Phase 5 easter eggs (EXTR-01)', () => {
  beforeEach(() => {
    useTerminalStore.setState({ output: [], history: [], activeModal: null })
  })

  it.todo('COMMAND_REGISTRY["sudo"] returns OutputItem[] with content referencing "sudoers file"')
  it.todo('COMMAND_REGISTRY["sl"] returns single OutputItem with multi-line ASCII train content')
  it.todo('COMMAND_REGISTRY["cowsay"] returns OutputItem[] with cow ASCII art content')
  it.todo('COMMAND_REGISTRY["rm-rf"] returns OutputItem[] ending with content containing "just kidding"')
  it.todo('COMMAND_REGISTRY["pug"] returns OutputItem[] with recognizable pug ASCII art (not generic bunny)')
  it.todo('COMMAND_REGISTRY["vim"] returns multi-line fake vim buffer output')
  it.todo('COMMAND_REGISTRY["vi"] returns same output as vim (alias)')
  it.todo('COMMAND_REGISTRY["hack"] returns multi-line dramatic output ending with "access granted"')
  it.todo('COMMAND_REGISTRY["matrix"] returns same output as hack (alias)')
  it.todo('COMMAND_REGISTRY["exit"] returns single OutputItem with content "Nice try. This terminal doesn\'t close."')
  it.todo('COMMAND_REGISTRY["quit"] returns same output as exit (alias)')
  it.todo('COMMAND_REGISTRY["q"] returns same output as exit (alias)')
  it.todo('COMMAND_REGISTRY[":q"] returns joke response about being stuck in vim')
  it.todo('COMMAND_REGISTRY[":q!"] returns joke response about being stuck in vim')
})

describe('COMMAND_REGISTRY — Phase 5 theme command (EXTR-02)', () => {
  beforeEach(() => {
    useTerminalStore.setState({ output: [], history: [], activeModal: null })
  })

  it.todo('COMMAND_REGISTRY["theme"]([]) returns theme-list OutputItem containing green, amber, blue entries')
  it.todo('COMMAND_REGISTRY["theme"](["amber"]) calls setTheme("amber") and returns confirmation OutputItem')
  it.todo('COMMAND_REGISTRY["theme"](["green"]) calls setTheme("green") and returns confirmation OutputItem')
  it.todo('COMMAND_REGISTRY["theme"](["blue"]) calls setTheme("blue") and returns confirmation OutputItem')
  it.todo('COMMAND_REGISTRY["theme"](["neon"]) returns text OutputItem with "Unknown theme: neon — available: green, amber, blue"')
})
