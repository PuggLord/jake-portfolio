import { describe, it, expect, beforeEach } from 'vitest'
import { useTerminalStore } from '../store/terminal'

describe('COMMAND_REGISTRY — Phase 5 easter eggs (EXTR-01)', () => {
  beforeEach(() => {
    useTerminalStore.setState({ output: [], history: [], activeModal: null, theme: 'green' })
  })

  it('COMMAND_REGISTRY["sudo"] returns OutputItem[] with content referencing "sudoers file"', async () => {
    const { COMMAND_REGISTRY } = await import('./terminal')
    const result = COMMAND_REGISTRY['sudo']([])
    expect(result.length).toBeGreaterThan(0)
    const allContent = result.map((r) => ('content' in r ? r.content : '')).join(' ')
    expect(allContent).toContain('sudoers file')
  })

  it('COMMAND_REGISTRY["sl"] returns single OutputItem with multi-line ASCII train content', async () => {
    const { COMMAND_REGISTRY } = await import('./terminal')
    const result = COMMAND_REGISTRY['sl']([])
    expect(result).toHaveLength(1)
    expect('content' in result[0] && result[0].content).toContain('jake-os express')
  })

  it('COMMAND_REGISTRY["cowsay"] returns OutputItem[] with cow ASCII art content', async () => {
    const { COMMAND_REGISTRY } = await import('./terminal')
    const result = COMMAND_REGISTRY['cowsay']([])
    expect(result.length).toBeGreaterThan(0)
    const allContent = result.map((r) => ('content' in r ? r.content : '')).join('\n')
    expect(allContent).toContain('\\   ^__^')
  })

  it('COMMAND_REGISTRY["rm-rf"] returns OutputItem[] ending with content containing "just kidding"', async () => {
    const { COMMAND_REGISTRY } = await import('./terminal')
    const result = COMMAND_REGISTRY['rm-rf']([])
    expect(result.length).toBeGreaterThan(0)
    const allContent = result.map((r) => ('content' in r ? r.content : '')).join('\n')
    expect(allContent).toContain('just kidding')
  })

  it('COMMAND_REGISTRY["pug"] returns OutputItem[] with recognizable pug ASCII art (not generic bunny)', async () => {
    const { COMMAND_REGISTRY } = await import('./terminal')
    const result = COMMAND_REGISTRY['pug']([])
    expect(result.length).toBeGreaterThan(0)
    const allContent = result.map((r) => ('content' in r ? r.content : '')).join('\n')
    // Pug must NOT be the old generic bunny art
    expect(allContent).not.toContain('(\\(\\')
    expect(allContent).toContain('PuggLord')
  })

  it('COMMAND_REGISTRY["vim"] returns multi-line fake vim buffer output', async () => {
    const { COMMAND_REGISTRY } = await import('./terminal')
    const result = COMMAND_REGISTRY['vim']([])
    const allContent = result.map((r) => ('content' in r ? r.content : '')).join('\n')
    expect(allContent).toContain(':q!')
    expect(allContent).toContain('good luck')
  })

  it('COMMAND_REGISTRY["vi"] returns same output as vim', async () => {
    const { COMMAND_REGISTRY } = await import('./terminal')
    const vim = COMMAND_REGISTRY['vim']([])
    const vi = COMMAND_REGISTRY['vi']([])
    expect(vi.map((r) => ('content' in r ? r.content : ''))).toEqual(vim.map((r) => ('content' in r ? r.content : '')))
  })

  it('COMMAND_REGISTRY["hack"] returns multi-line dramatic output ending with "access granted"', async () => {
    const { COMMAND_REGISTRY } = await import('./terminal')
    const result = COMMAND_REGISTRY['hack']([])
    const allContent = result.map((r) => ('content' in r ? r.content : '')).join('\n').toUpperCase()
    expect(allContent).toContain('ACCESS GRANTED')
  })

  it('COMMAND_REGISTRY["matrix"] returns same output as hack', async () => {
    const { COMMAND_REGISTRY } = await import('./terminal')
    const hack = COMMAND_REGISTRY['hack']([])
    const matrix = COMMAND_REGISTRY['matrix']([])
    expect(matrix.map((r) => ('content' in r ? r.content : ''))).toEqual(hack.map((r) => ('content' in r ? r.content : '')))
  })

  it("COMMAND_REGISTRY[\"exit\"] returns single OutputItem with \"Nice try. This terminal doesn't close.\"", async () => {
    const { COMMAND_REGISTRY } = await import('./terminal')
    const result = COMMAND_REGISTRY['exit']([])
    const allContent = result.map((r) => ('content' in r ? r.content : '')).join('')
    expect(allContent).toContain("Nice try. This terminal doesn't close.")
  })

  it('COMMAND_REGISTRY["quit"] returns same output as exit', async () => {
    const { COMMAND_REGISTRY } = await import('./terminal')
    const exit = COMMAND_REGISTRY['exit']([])
    const quit = COMMAND_REGISTRY['quit']([])
    expect(quit.map((r) => ('content' in r ? r.content : ''))).toEqual(exit.map((r) => ('content' in r ? r.content : '')))
  })

  it('COMMAND_REGISTRY["q"] returns same output as exit', async () => {
    const { COMMAND_REGISTRY } = await import('./terminal')
    const exit = COMMAND_REGISTRY['exit']([])
    const q = COMMAND_REGISTRY['q']([])
    expect(q.map((r) => ('content' in r ? r.content : ''))).toEqual(exit.map((r) => ('content' in r ? r.content : '')))
  })

  it('COMMAND_REGISTRY[":q"] returns joke response about being stuck in vim', async () => {
    const { COMMAND_REGISTRY } = await import('./terminal')
    const result = COMMAND_REGISTRY[':q']([])
    const allContent = result.map((r) => ('content' in r ? r.content : '')).join('')
    expect(allContent).toContain('jake-os')
  })

  it('COMMAND_REGISTRY[":q!"] returns joke response about being stuck in vim', async () => {
    const { COMMAND_REGISTRY } = await import('./terminal')
    const result = COMMAND_REGISTRY[':q!']([])
    const allContent = result.map((r) => ('content' in r ? r.content : '')).join('')
    expect(allContent).toContain('jake-os')
  })
})

describe('COMMAND_REGISTRY — Phase 5 theme command (EXTR-02)', () => {
  beforeEach(() => {
    useTerminalStore.setState({ output: [], history: [], activeModal: null, theme: 'green' })
    document.documentElement.setAttribute('data-theme', 'green')
  })

  it('COMMAND_REGISTRY["theme"]([]) returns theme-list OutputItem containing green, amber, blue entries', async () => {
    const { COMMAND_REGISTRY } = await import('./terminal')
    const result = COMMAND_REGISTRY['theme']([])
    expect(result).toHaveLength(1)
    expect(result[0].kind).toBe('theme-list')
    if (result[0].kind === 'theme-list') {
      const names = result[0].themes.map((t) => t.name)
      expect(names).toContain('green')
      expect(names).toContain('amber')
      expect(names).toContain('blue')
    }
  })

  it('COMMAND_REGISTRY["theme"](["amber"]) calls setTheme("amber") and returns confirmation OutputItem', async () => {
    const { COMMAND_REGISTRY } = await import('./terminal')
    const result = COMMAND_REGISTRY['theme'](['amber'])
    expect(useTerminalStore.getState().theme).toBe('amber')
    const allContent = result.map((r) => ('content' in r ? r.content : '')).join('')
    expect(allContent).toContain('amber')
  })

  it('COMMAND_REGISTRY["theme"](["green"]) calls setTheme("green") and returns confirmation', async () => {
    const { COMMAND_REGISTRY } = await import('./terminal')
    const result = COMMAND_REGISTRY['theme'](['green'])
    expect(useTerminalStore.getState().theme).toBe('green')
    expect(result.length).toBeGreaterThan(0)
  })

  it('COMMAND_REGISTRY["theme"](["blue"]) calls setTheme("blue") and returns confirmation', async () => {
    const { COMMAND_REGISTRY } = await import('./terminal')
    COMMAND_REGISTRY['theme'](['blue'])
    expect(useTerminalStore.getState().theme).toBe('blue')
  })

  it('COMMAND_REGISTRY["theme"](["neon"]) returns text OutputItem with unknown theme error', async () => {
    const { COMMAND_REGISTRY } = await import('./terminal')
    const result = COMMAND_REGISTRY['theme'](['neon'])
    const allContent = result.map((r) => ('content' in r ? r.content : '')).join('')
    expect(allContent).toContain('Unknown theme: neon')
    expect(allContent).toContain('available: green, amber, blue')
  })
})
