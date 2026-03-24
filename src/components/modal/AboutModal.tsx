export default function AboutModal() {
  return (
    <div className="flex flex-col gap-6">
      {/* Bio */}
      <p className="text-[#c9d1d9] font-mono text-sm leading-relaxed">
        Jake Manis is a Data Science student at the University of North Texas, pursuing a minor in Information & Data Systems. He's passionate about artificial intelligence and building intelligent systems that solve real-world problems. His long-term goal is to launch a technology-driven business focused on AI development and interactive software.
      </p>

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

      {/* LinkedIn — VISL-02 */}
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
    </div>
  )
}
