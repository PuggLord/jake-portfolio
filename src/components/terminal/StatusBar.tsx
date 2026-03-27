// portfolio/src/components/terminal/StatusBar.tsx
export default function StatusBar() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-30 border-t px-4 py-1"
      style={{ backgroundColor: 'var(--bg)', borderColor: 'color-mix(in srgb, var(--accent) 30%, transparent)' }}
    >
      <span className="font-mono text-sm whitespace-nowrap" style={{ color: 'var(--accent)' }}>
        jake-os v1.0{'  |  '}
        <a
          href="https://linkedin.com/in/jake-manis-304406311"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline focus:underline"
          style={{ color: 'var(--accent)' }}
        >
          linkedin.com/in/jake-manis-304406311
        </a>
      </span>
    </div>
  )
}
