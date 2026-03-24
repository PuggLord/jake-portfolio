import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useTerminalStore } from '../store/terminal'

// Mock the store's setActiveModal to capture calls
// We need to set up state before importing the registry

describe('COMMAND_REGISTRY — Phase 4 real handlers', () => {
  beforeEach(() => {
    useTerminalStore.setState({
      output: [],
      history: [],
      activeModal: null,
    })
  })

  it('COMMAND_REGISTRY["about"] calls setActiveModal with { type: "about", id: null } and returns []', async () => {
    const { COMMAND_REGISTRY } = await import('./terminal')
    const result = COMMAND_REGISTRY['about']([])
    expect(result).toEqual([])
    expect(useTerminalStore.getState().activeModal).toEqual({ type: 'about', id: null })
  })

  it('COMMAND_REGISTRY["contact"] calls setActiveModal with { type: "contact", id: null } and returns []', async () => {
    const { COMMAND_REGISTRY } = await import('./terminal')
    const result = COMMAND_REGISTRY['contact']([])
    expect(result).toEqual([])
    expect(useTerminalStore.getState().activeModal).toEqual({ type: 'contact', id: null })
  })

  it('COMMAND_REGISTRY["resume"] calls setActiveModal with { type: "resume", id: null } and returns []', async () => {
    const { COMMAND_REGISTRY } = await import('./terminal')
    const result = COMMAND_REGISTRY['resume']([])
    expect(result).toEqual([])
    expect(useTerminalStore.getState().activeModal).toEqual({ type: 'resume', id: null })
  })

  it('COMMAND_REGISTRY["projects"] returns text header + 5 modal-link items with modalType="project"', async () => {
    const { COMMAND_REGISTRY } = await import('./terminal')
    const result = COMMAND_REGISTRY['projects']([])
    expect(result.length).toBe(6) // 1 header + 5 projects
    expect(result[0].kind).toBe('text')
    if (result[0].kind === 'text') {
      expect(result[0].content).toBe('projects — select one to view details')
    }
    const modalLinks = result.filter((item) => item.kind === 'modal-link')
    expect(modalLinks.length).toBe(5)
    modalLinks.forEach((item) => {
      if (item.kind === 'modal-link') {
        expect(item.modalType).toBe('project')
      }
    })
  })

  it('COMMAND_REGISTRY["blog"] returns text header + 2 modal-link items with modalType="post"', async () => {
    const { COMMAND_REGISTRY } = await import('./terminal')
    const result = COMMAND_REGISTRY['blog']([])
    expect(result.length).toBe(3) // 1 header + 2 posts
    expect(result[0].kind).toBe('text')
    if (result[0].kind === 'text') {
      expect(result[0].content).toBe('posts — select one to read')
    }
    const modalLinks = result.filter((item) => item.kind === 'modal-link')
    expect(modalLinks.length).toBe(2)
    modalLinks.forEach((item) => {
      if (item.kind === 'modal-link') {
        expect(item.modalType).toBe('post')
      }
    })
  })

  it('COMMAND_REGISTRY["whoami"] triggers same result as "about"', async () => {
    useTerminalStore.setState({ activeModal: null })
    const { COMMAND_REGISTRY } = await import('./terminal')
    const result = COMMAND_REGISTRY['whoami']([])
    expect(result).toEqual([])
    expect(useTerminalStore.getState().activeModal).toEqual({ type: 'about', id: null })
  })

  it('COMMAND_REGISTRY["ls"] returns same modal-link items as "projects"', async () => {
    const { COMMAND_REGISTRY } = await import('./terminal')
    const result = COMMAND_REGISTRY['ls']([])
    const modalLinks = result.filter((item) => item.kind === 'modal-link')
    expect(modalLinks.length).toBe(5)
  })
})
