// portfolio/src/components/terminal/StatusBar.tsx
export default function StatusBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-[#0d1117] border-t border-[#4af626]/30 px-4 py-1">
      <span className="text-[#4af626] font-mono text-sm whitespace-nowrap">
        jake-os v1.0{'  |  '}
        <a
          href="https://linkedin.com/in/jake-manis-304406311"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#4af626] hover:underline focus:underline"
        >
          linkedin.com/in/jake-manis-304406311
        </a>
      </span>
    </div>
  )
}
