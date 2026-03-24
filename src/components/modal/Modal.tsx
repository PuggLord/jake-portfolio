import { useEffect, useRef } from 'react'

const FOCUSABLE = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'

interface ModalProps {
  title: string
  onClose: () => void
  children: React.ReactNode
}

export default function Modal({ title, onClose, children }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null)

  // Focus first focusable element on mount
  useEffect(() => {
    const el = panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE)[0]
    el?.focus()
  }, [])

  // Body scroll lock
  useEffect(() => {
    document.body.classList.add('overflow-hidden')
    return () => document.body.classList.remove('overflow-hidden')
  }, [])

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Escape') { onClose(); return }
    if (e.key === 'Tab' && panelRef.current) {
      const focusable = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE))
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus() }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }
  }

  return (
    <div
      className="fixed inset-0 bg-[#0d1117]/80 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="bg-[#161b22] min-w-[320px] max-w-3xl w-full max-h-[80vh] flex flex-col font-mono"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Title bar */}
        <div className="flex items-center gap-4 p-6 border-b border-[#4af626]/30">
          <button
            className="text-[#4af626] font-mono min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer bg-transparent border-none"
            onClick={onClose}
            aria-label="Close modal"
          >
            [x]
          </button>
          <h2
            id="modal-title"
            className="text-[#4af626] font-mono text-xl font-bold"
          >
            {title}
          </h2>
        </div>
        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {children}
        </div>
      </div>
    </div>
  )
}
