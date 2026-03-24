import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Modal from '../Modal'

function renderModal(onClose = vi.fn()) {
  return render(
    <Modal title="test modal" onClose={onClose}>
      <button>first button</button>
      <button>second button</button>
    </Modal>
  )
}

describe('Modal', () => {
  // WIND-04
  it('pressing Escape key closes the modal (WIND-04)', () => {
    const onClose = vi.fn()
    render(
      <Modal title="test" onClose={onClose}>
        <button>btn</button>
      </Modal>
    )
    const panel = screen.getByRole('dialog')
    fireEvent.keyDown(panel, { key: 'Escape' })
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('clicking [x] button closes the modal (WIND-04)', () => {
    const onClose = vi.fn()
    renderModal(onClose)
    fireEvent.click(screen.getByRole('button', { name: /close modal/i }))
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('clicking backdrop overlay closes the modal (WIND-04)', () => {
    const onClose = vi.fn()
    const { container } = renderModal(onClose)
    // Backdrop is the first fixed div (overlay), click it directly
    fireEvent.click(container.firstChild as HTMLElement)
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('clicking modal panel does NOT close the modal (WIND-04)', () => {
    const onClose = vi.fn()
    renderModal(onClose)
    fireEvent.click(screen.getByRole('dialog'))
    expect(onClose).not.toHaveBeenCalled()
  })

  // ACCS-03
  it('modal panel has role="dialog" (ACCS-03)', () => {
    renderModal()
    expect(screen.getByRole('dialog')).toBeDefined()
  })

  it('modal panel has aria-modal="true" (ACCS-03)', () => {
    renderModal()
    expect(screen.getByRole('dialog').getAttribute('aria-modal')).toBe('true')
  })

  it('modal panel has aria-labelledby="modal-title" (ACCS-03)', () => {
    renderModal()
    expect(screen.getByRole('dialog').getAttribute('aria-labelledby')).toBe('modal-title')
  })

  it('close button has aria-label="Close modal" (ACCS-03)', () => {
    renderModal()
    expect(screen.getByRole('button', { name: /close modal/i })).toBeDefined()
  })

  it('close button has min-h-[44px] and min-w-[44px] classes (ACCS-03)', () => {
    renderModal()
    const btn = screen.getByRole('button', { name: /close modal/i })
    expect(btn.className).toContain('min-h-[44px]')
    expect(btn.className).toContain('min-w-[44px]')
  })
})
