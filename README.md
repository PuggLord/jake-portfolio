# jake-os — OS-style Terminal Portfolio

An interactive terminal-style portfolio built to feel like a personal operating system. Type commands to navigate, explore projects, and get in touch.

**Live:** https://jake-portfolio.jacobmanis.workers.dev

![Lighthouse](https://img.shields.io/badge/Lighthouse-pending-green)

## Features

- **Terminal interface** — type commands to explore, click links in the output
- **Key commands:** `about`, `projects`, `blog`, `contact`, `resume`, `help`
- **Theme system** — `theme green` / `theme amber` / `theme blue` — full-page color switching via CSS vars
- **Easter eggs** — `sl`, `pug`, `sudo`, `cowsay`, `hack`, `vim` and more
- **Boot sequence** — one-time animated startup for first-time visitors
- **Mobile command bar** — tap-to-run chip strip on small screens
- **Modal system** — project details, blog posts, contact form, resume viewer

## Tech Stack

| Layer | Tech |
|-------|------|
| UI | React 19, TypeScript, Vite |
| State | Zustand |
| Styling | Tailwind CSS v4 |
| Font | JetBrains Mono (self-hosted) |
| Deploy | Cloudflare Workers (Assets) |

## Development

```bash
npm install
npm run dev      # local dev server
npm run build    # production build (tsc + vite)
```

Deploy:
```bash
npx wrangler deploy --name jake-portfolio --compatibility-date 2026-03-22 --assets=./dist
```
