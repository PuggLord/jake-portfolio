import Markdown from 'react-markdown'
import type { Post } from '../../content/posts'

interface Props { post: Post }

export default function PostModal({ post }: Props) {
  return (
    <Markdown
      components={{
        h1: ({ children }) => (
          <h2 className="text-base font-bold text-[#4af626] font-mono mt-4 mb-2">{children}</h2>
        ),
        h2: ({ children }) => (
          <h3 className="text-sm font-bold text-[#4af626] font-mono mt-4 mb-1">{children}</h3>
        ),
        h3: ({ children }) => (
          <h4 className="text-sm font-bold text-[#4af626] font-mono mt-3 mb-1">{children}</h4>
        ),
        p: ({ children }) => (
          <p className="text-[#c9d1d9] font-mono text-sm leading-relaxed mb-3">{children}</p>
        ),
        code: ({ children }) => (
          <code className="bg-[#161b22] text-[#4af626] font-mono px-1 rounded">{children}</code>
        ),
        pre: ({ children }) => (
          <pre className="bg-[#161b22] text-[#4af626] font-mono p-4 rounded mb-3 overflow-x-auto text-sm">{children}</pre>
        ),
        ul: ({ children }) => (
          <ul className="text-[#c9d1d9] font-mono text-sm mb-3 pl-4 list-disc">{children}</ul>
        ),
        li: ({ children }) => <li className="mb-1">{children}</li>,
      }}
    >
      {post.content}
    </Markdown>
  )
}
