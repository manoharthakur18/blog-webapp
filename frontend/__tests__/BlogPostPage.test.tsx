import { render, screen } from '@testing-library/react'
import BlogPostPage from '@/app/blog/[slug]/page'
import * as blogService from '@/lib/blogServices'
import { notFound } from 'next/navigation'

// 🧱 MOCK REACT-MARKDOWN (ESM package)
jest.mock('react-markdown', () => {
  return ({ children }: { children: React.ReactNode }) => <div>{children}</div>
})

// 🧱 MOCK API + COMMENT FORM + NEXT NAV
jest.mock('@/lib/blogServices', () => ({
  fetchPostBySlug: jest.fn(),
}))
jest.mock('next/navigation', () => ({
  notFound: jest.fn(),
}))
jest.mock('@/app/blog/[slug]/CommentForm', () => () => <div>MockCommentForm</div>)

describe('BlogPostPage', () => {
  const mockFetchPost = blogService.fetchPostBySlug as jest.Mock

  const postMock = {
    id: 1,
    title: 'Test Post',
    slug: 'test-post',
    content: '## Markdown Title\nSome content here.',
    created_at: '2025-05-01T12:00:00Z',
    comments: [
      {
        id: 1,
        author: 'Alice',
        text: 'Nice post!',
        created_at: '2025-05-02T09:00:00Z',
      },
    ],
  }
  it('renders post content and comments', async () => {
    mockFetchPost.mockResolvedValue(postMock)
  
    const tree = await BlogPostPage({ params: { slug: 'test-post' } }) // ✅ async call
    render(tree)
  
    expect(await screen.findByText('Test Post')).toBeInTheDocument()
    expect(screen.getByText('Nice post!')).toBeInTheDocument()
    expect(screen.getByText('Alice')).toBeInTheDocument()
    expect(screen.getByText('MockCommentForm')).toBeInTheDocument()
  })  

  it('calls fetchPostBySlug with slug', async () => {
    mockFetchPost.mockResolvedValue(postMock)

    const tree = await BlogPostPage({ params: { slug: 'test-post' } })

    render(tree)

    expect(mockFetchPost).toHaveBeenCalledWith('test-post')
  })

  it('calls notFound if post is null', async () => {
    mockFetchPost.mockResolvedValue(null)
    const tree = await BlogPostPage({ params: { slug: 'invalid-post' } })
    render(tree)

    expect(notFound).toHaveBeenCalled()
  })
})
