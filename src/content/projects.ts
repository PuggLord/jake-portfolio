export interface Project {
  slug: string
  name: string
  dateRange: string
  description: string
  stack: string[]
  github: string | null
  live: string | null
  screenshots: string[]  // filenames relative to /screenshots/
}

export const projects: Project[] = [
  {
    slug: 'censor-wav',
    name: 'Censor Wav',
    dateRange: 'Feb 2026 – Present',
    description: 'A Python app that automatically detects and censors heavy profanity in WAV audio files — built for YouTube content creators who don\'t want to manually edit every curse word.',
    stack: ['Python', 'Whisper', 'ffmpeg', 'AWS CLI'],
    github: 'https://github.com/PuggLord/AutoCensor',
    live: null,
    screenshots: ['censor-wav-app.jpg', 'censor-wav-task-manager.jpg', 'censor-wav-github.png'],
  },
  {
    slug: 'homelab',
    name: 'Homelab',
    dateRange: 'Jan 2026 – Present',
    description: 'A self-hosted home server running Proxmox VE with containers and VMs. Currently hosts Auto Clipper AI — a web app that generates highlight clips from uploaded videos or YouTube URLs.',
    stack: ['Proxmox', 'Docker', 'Linux', 'Bash', 'AWS CLI'],
    github: null,
    live: null,
    screenshots: ['homelab-proxmox.jpg', 'homelab-hardware.jpg', 'homelab-autoclip.jpg'],
  },
  {
    slug: 'jarvis-ai',
    name: 'Jarvis AI',
    dateRange: 'Jan 2026 – Present',
    description: 'A personal AI assistant running Ollama on a Raspberry Pi 5, connected globally via a Telegram bot and Docker. Send a message from anywhere in the world and Jarvis routes it through the homelab.',
    stack: ['Ollama', 'Raspberry Pi 5', 'Docker', 'Telegram Bot API', 'Linux', 'OpenClaw'],
    github: null,
    live: null,
    screenshots: ['jarvis-telegram.jpg', 'jarvis-terminal.jpg'],
  },
  {
    slug: 'cybershop',
    name: 'CyberShop',
    dateRange: 'Jun 2025 – Mar 2026',
    description: 'A Y2K-aesthetic e-commerce site combining Lovable (AI web UI builder) with Shopify for product management and checkout. Aggregates products from multiple markets into one storefront.',
    stack: ['Lovable', 'Shopify', 'AI-assisted design'],
    github: null,
    live: null,
    screenshots: ['cybershop-website.png'],
  },
  {
    slug: 'pi-xmrig',
    name: 'Raspberry Pi 5 XMRig Project',
    dateRange: 'Dec 2025 – Jan 2026',
    description: 'A Linux systems learning project: compiled XMRig from source on a Pi 5, diagnosed Linux OOM-killer crashes caused by NUMA memory allocation, implemented a stable fix, and documented the entire process in a beginner-friendly guide.',
    stack: ['Raspberry Pi 5', 'Linux', 'Bash', 'C++', 'XMRig', 'GitHub'],
    github: 'https://github.com/PuggLord/Rasp-coin-miner',
    live: null,
    screenshots: ['pi-xmrig-github.png', 'pi-xmrig-mining.jpg'],
  },
]
