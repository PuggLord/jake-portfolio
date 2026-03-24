import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ProjectModal from '../ProjectModal'
import type { Project } from '../../../content/projects'

const mockProject: Project = {
  slug: 'test-project',
  name: 'Test Project',
  dateRange: 'Jan 2026 – Present',
  description: 'A test project description.',
  stack: ['Python', 'Docker'],
  github: 'https://github.com/test',
  live: null,
  screenshots: ['test-screenshot.jpg'],
}

const projectNoLinks: Project = {
  ...mockProject,
  slug: 'no-links',
  name: 'No Links Project',
  github: null,
  live: null,
  screenshots: [],
}

describe('ProjectModal', () => {
  it('renders project date range (WIND-01)', () => {
    render(<ProjectModal project={mockProject} />)
    expect(screen.getByText('Jan 2026 – Present')).toBeDefined()
  })

  it('renders project description text (WIND-01)', () => {
    render(<ProjectModal project={mockProject} />)
    expect(screen.getByText('A test project description.')).toBeDefined()
  })

  it('renders stack tag for each stack item (WIND-01)', () => {
    render(<ProjectModal project={mockProject} />)
    expect(screen.getByText('Python')).toBeDefined()
    expect(screen.getByText('Docker')).toBeDefined()
  })

  it('renders GitHub link when project has github URL (WIND-01)', () => {
    render(<ProjectModal project={mockProject} />)
    expect(screen.getByRole('link', { name: /github/i })).toBeDefined()
  })

  it('omits GitHub line when project github is null (WIND-01)', () => {
    render(<ProjectModal project={projectNoLinks} />)
    expect(screen.queryByRole('link', { name: /github/i })).toBeNull()
  })

  it('renders screenshot img with correct alt text (WIND-01)', () => {
    render(<ProjectModal project={mockProject} />)
    const img = screen.getByRole('img')
    expect(img.getAttribute('alt')).toBe('Test Project screenshot')
  })

  it('omits screenshots section when screenshots array is empty (WIND-01)', () => {
    render(<ProjectModal project={projectNoLinks} />)
    expect(screen.queryByText('Screenshots:')).toBeNull()
  })
})
