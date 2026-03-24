import type { Post } from './jarvis-ai'

const content = `# Debugging Linux OOM Kills on a Raspberry Pi 5

This is the story of how I spent three days debugging a crash that turned out to be Linux's own memory manager murdering my process. And how I fixed it.

## The Setup

I was compiling XMRig (a CPU miner) from source on a Raspberry Pi 5. This is a learning project — I wanted to understand the full Linux build toolchain: \`cmake\`, \`make\`, linking against \`libuv\` and \`OpenSSL\`. The Pi 5 has 8GB RAM so I figured, plenty of room.

## The Crash

It would compile fine, start mining, run for 10-20 minutes, and then just... die. No error message. Process just gone.

\`\`\`bash
$ ./xmrig
[2025-12-15 02:14:37.432]  miner    speed 10s/60s/15m 245.3 245.1 n/a H/s max 261.4 H/s
[2025-12-15 02:27:11.109]  (silence)
\`\`\`

## Diagnosing the OOM Killer

After some Googling I checked \`dmesg\`:

\`\`\`bash
$ dmesg | grep -i "oom"
[1432.891234] Out of memory: Killed process 3421 (xmrig) total-vm:892736kB, anon-rss:743218kB
[1432.891235] oom_reaper: reaped process 3421 (xmrig), now anon-rss:0kB
\`\`\`

The OOM killer was executing my process. But why? I had 8GB of RAM.

## The NUMA Culprit

The Pi 5 uses a Broadcom BCM2712 chip that exposes memory in NUMA-style zones even though it's technically a single-node system. XMRig's huge page allocation was requesting memory from a specific zone and exhausting it, even though other zones had free memory.

\`\`\`bash
$ cat /proc/buddyinfo
Node 0, zone   Normal  128  64  32  16   8   4   2   1   0   0   0
Node 0, zone  HighMem    0   0   0   0   0   0   0   0   0   0   0
\`\`\`

HighMem zone: completely empty. That's your culprit.

## The Fix

Disable huge pages for XMRig (it doesn't need them on ARM):

\`\`\`json
{
  "cpu": {
    "huge-pages": false,
    "huge-pages-jit": false
  }
}
\`\`\`

After that: zero crashes. Ran for 72 hours straight.

## Lessons Learned

1. Always check \`dmesg\` first when a process silently dies
2. Linux OOM killer leaves no output on stdout — you have to look at kernel logs
3. \`/proc/buddyinfo\` is your friend for memory zone diagnostics
4. "8GB of RAM" doesn't mean you can allocate 8GB from any single memory zone
`

export const xmrigOomPost: Post = {
  slug: 'pi-xmrig-oom',
  title: 'Debugging Linux OOM Kills on a Raspberry Pi 5',
  content,
}
