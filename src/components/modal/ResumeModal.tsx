const RESUME_PDF_URL = import.meta.env.VITE_RESUME_PDF_URL ?? '#'

export default function ResumeModal() {
  return (
    <div className="flex flex-col gap-6">
      {/* PDF Download button — at top, before all sections */}
      <div>
        <a
          href={RESUME_PDF_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Download resume PDF"
          className="inline-flex border border-[#4af626] text-[#4af626] font-mono px-4 py-2 cursor-pointer hover:bg-[#4af626]/10 focus:bg-[#4af626]/10 min-h-[44px] items-center"
        >
          [ download pdf ]
        </a>
      </div>

      {/* Header */}
      <div>
        <p className="text-[#4af626] font-mono text-base font-bold">Jake Manis — Data Science Student</p>
        <a
          href="https://linkedin.com/in/jake-manis-304406311"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#4af626] font-mono text-sm hover:underline focus:underline"
        >
          linkedin.com/in/jake-manis-304406311
        </a>
      </div>

      {/* Education */}
      <div>
        <p className="text-[#4af626] font-mono text-base font-bold mb-2">Education:</p>
        <p className="text-[#c9d1d9] font-mono text-sm">BS Data Science — University of North Texas (Jan 2024 – Mar 2028)</p>
        <p className="text-[#c9d1d9] font-mono text-sm">AS Texas Core Curriculum — University of North Texas (Aug 2022 – May 2024)</p>
      </div>

      {/* Skills */}
      <div>
        <p className="text-[#4af626] font-mono text-base font-bold mb-2">Skills:</p>
        <p className="text-[#c9d1d9] font-mono text-sm">
          Python, Bash, C++, Linux, AWS CLI, Docker, Proxmox, AI/ML, Git, Technical Documentation, Debugging, Memory Management, Web Applications
        </p>
      </div>

      {/* Projects */}
      <div>
        <p className="text-[#4af626] font-mono text-base font-bold mb-2">Projects:</p>
        <p className="text-[#c9d1d9] font-mono text-sm">Censor Wav — Python app that auto-detects and censors profanity in WAV audio files</p>
        <p className="text-[#c9d1d9] font-mono text-sm">Homelab — Self-hosted Proxmox server running containers and Auto Clipper AI</p>
        <p className="text-[#c9d1d9] font-mono text-sm">Jarvis AI — Personal AI assistant on Raspberry Pi 5 via Ollama and Telegram bot</p>
        <p className="text-[#c9d1d9] font-mono text-sm">CyberShop — Y2K e-commerce site built with Lovable and Shopify</p>
        <p className="text-[#c9d1d9] font-mono text-sm">Raspberry Pi 5 XMRig Project — Compiled XMRig from source, debugged Linux OOM-killer crashes</p>
      </div>

      {/* Experience */}
      <div>
        <p className="text-[#4af626] font-mono text-base font-bold mb-2">Experience:</p>
        <p className="text-[#c9d1d9] font-mono text-sm">Lifeguard — Lifetime Fitness</p>
        <p className="text-[#c9d1d9] font-mono text-sm">Warehouse Manager — Parrent's Painting</p>
      </div>
    </div>
  )
}
