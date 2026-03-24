import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import PostModal from '../PostModal'
import type { Post } from '../../../content/posts'

const mockPost: Post = {
  slug: 'test-post',
  title: 'Test Post Title',
  content: '# Heading One\n\nA paragraph of text.\n\n```bash\necho hello\n```',
}

describe('PostModal', () => {
  it('renders markdown content as React elements via react-markdown (WIND-02)', () => {
    render(<PostModal post={mockPost} />)
    expect(screen.getByText('A paragraph of text.')).toBeDefined()
  })

  it('renders markdown heading with accent color class (WIND-02)', () => {
    render(<PostModal post={mockPost} />)
    const heading = screen.getByText('Heading One')
    expect(heading.className).toContain('text-[#4af626]')
  })

  it('renders markdown paragraph with muted color class (WIND-02)', () => {
    render(<PostModal post={mockPost} />)
    const para = screen.getByText('A paragraph of text.')
    expect(para.className).toContain('text-[#c9d1d9]')
  })
})
