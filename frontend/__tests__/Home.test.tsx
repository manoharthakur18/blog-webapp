import { render, screen, waitFor } from '@testing-library/react'
import * as blogService from '@/lib/blogServices'
import HomePage from '@/app/page'

jest.mock('@/lib/blogServices')

const mockFetchPosts = blogService.fetchPosts as jest.Mock

describe('HomePage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders heading', () => {
    render(<HomePage />)
    const heading = screen.getByRole('heading', { name: /recent posts/i })
    expect(heading).toBeInTheDocument()
  })

  it('shows loading state initially', () => {
    render(<HomePage />)
    expect(screen.getByText(/loading posts/i)).toBeInTheDocument()
  })

  it('renders blog posts after fetch', async () => {
    mockFetchPosts.mockResolvedValue([
      {
        id: 1,
        title: 'Test Post',
        slug: 'test-post',
        excerpt: 'A sample excerpt.',
        created_at: '2025-05-01T10:00:00Z',
      },
    ])

    render(<HomePage />)

    await waitFor(() => {
      expect(screen.getByText('Test Post')).toBeInTheDocument()
      expect(screen.getByText('A sample excerpt.')).toBeInTheDocument()
    })
  })

  it('renders "No posts available" if empty array', async () => {
    mockFetchPosts.mockResolvedValue([])

    render(<HomePage />)

    await waitFor(() => {
      expect(screen.getByText(/no posts available/i)).toBeInTheDocument()
    })
  })

  it('shows error message when fetch fails', async () => {
    mockFetchPosts.mockRejectedValue(new Error('API failed'))

    render(<HomePage />)

    await waitFor(() => {
      expect(
        screen.getByText(/failed to load posts/i)
      ).toBeInTheDocument()
    })
  })
})
