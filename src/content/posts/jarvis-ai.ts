export interface Post {
  slug: string
  title: string
  content: string
}

const content = `# Building Jarvis: A Personal AI on Raspberry Pi 5

So I finally did it — I built my own personal AI assistant that I can talk to from anywhere in the world. I'm calling it Jarvis (yes, like Iron Man's). Here's how it came together.

## Why a Raspberry Pi 5?

I wanted something always-on and low-power. A Pi 5 with 8GB RAM is actually capable of running small LLMs locally via Ollama. It sits on my desk, connected to my homelab network, and never sleeps.

## Choosing Ollama

Ollama made the local LLM side almost trivial. One command to install, another to pull a model. I started with \`llama3.2:3b\` — small enough to run on the Pi without melting it, smart enough to be useful.

\`\`\`bash
curl -fsSL https://ollama.com/install.sh | sh
ollama pull llama3.2:3b
\`\`\`

## Wiring in the Telegram Bot

The killer feature is the Telegram bot. I can send a message from my phone, it hits the Telegram API, a Python service on the Pi picks it up, routes it to Ollama, and fires back a response — usually in under 10 seconds.

The whole thing runs in Docker so it restarts automatically if the Pi reboots.

\`\`\`python
from telegram.ext import Application, MessageHandler, filters
import httpx

async def handle_message(update, context):
    prompt = update.message.text
    response = httpx.post("http://localhost:11434/api/generate", json={
        "model": "llama3.2:3b",
        "prompt": prompt,
        "stream": False,
    })
    await update.message.reply_text(response.json()["response"])
\`\`\`

## Connecting Globally

The Pi is behind my home router with no public IP. I used OpenClaw to tunnel traffic — it creates a persistent connection from the Pi to a relay server so I can reach it from anywhere without port forwarding or a VPN.

## What's Next

I want to give Jarvis persistent memory (vector DB for chat history) and hook it into my homelab so it can run Docker commands for me. Wild times ahead.
`

export const jarvisAiPost: Post = {
  slug: 'jarvis-ai',
  title: 'Building Jarvis: A Personal AI on Raspberry Pi 5',
  content,
}
