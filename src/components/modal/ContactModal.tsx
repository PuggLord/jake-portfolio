export default function ContactModal() {
  return (
    <div className="flex flex-col gap-2">
      <div>
        <span className="text-[#c9d1d9] font-mono text-sm">Email:  </span>
        <a
          href="mailto:jacobmanis@icloud.com"
          className="text-[#4af626] font-mono text-sm hover:underline focus:underline"
        >
          jacobmanis@icloud.com
        </a>
      </div>
      <div>
        <span className="text-[#c9d1d9] font-mono text-sm">LinkedIn:  </span>
        <a
          href="https://linkedin.com/in/jake-manis-304406311"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#4af626] font-mono text-sm hover:underline focus:underline"
        >
          https://linkedin.com/in/jake-manis-304406311
        </a>
      </div>
      <div>
        <span className="text-[#c9d1d9] font-mono text-sm">GitHub:  </span>
        <a
          href="https://github.com/PuggLord"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#4af626] font-mono text-sm hover:underline focus:underline"
        >
          https://github.com/PuggLord
        </a>
      </div>
    </div>
  )
}
