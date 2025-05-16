import { render, screen } from '@testing-library/react'
import BlogListingPage from '@/app/blog/page'
import * as blogService from '@/lib/blogServices'

jest.mock('@/lib/blogServices', () => ({
  fetchPosts: jest.fn(),
}))

describe('BlogListingPage', () => {
  const mockFetchPosts = blogService.fetchPosts as jest.Mock

  const postsMock = [
    {
      id: 1,
      title: 'My First Blog',
      slug: 'my-first-blog',
      excerpt: 'This is a summary of the first post.',
      created_at: '2025-05-01T12:00:00Z',
    },
    {
      id: 2,
      title: 'Second Post',
      slug: 'second-post',
      excerpt: 'Excerpt of another blog.',
      created_at: '2025-05-05T10:30:00Z',
    },
  ]

  it('renders the blog listing heading and posts', async () => {
    mockFetchPosts.mockResolvedValue(postsMock)

    const tree = await BlogListingPage()
    render(tree)

    // Heading
    expect(screen.getByRole('heading', { name: /all blog posts/i })).toBeInTheDocument()

    // Posts
    expect(screen.getByText('My First Blog')).toBeInTheDocument()
    expect(screen.getByText('This is a summary of the first post.')).toBeInTheDocument()

    expect(screen.getByText('Second Post')).toBeInTheDocument()
    expect(screen.getByText('Excerpt of another blog.')).toBeInTheDocument()
  })

  it('calls fetchPosts', async () => {
    mockFetchPosts.mockResolvedValue(postsMock)

    await BlogListingPage()

    expect(mockFetchPosts).toHaveBeenCalled()
  })
})
