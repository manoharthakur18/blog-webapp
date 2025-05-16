import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import * as blogService from '@/lib/blogServices'
import { useRouter } from 'next/navigation'
import CommentForm from '@/app/blog/[slug]/CommentForm'

jest.mock('@/lib/blogServices', () => ({
  submitComment: jest.fn(),
}))

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    refresh: jest.fn(),
  }),
}))

describe('CommentForm', () => {
  const postId = 1

  it('renders name and comment fields', () => {
    render(<CommentForm postId={postId} />)

    expect(screen.getByPlaceholderText(/your name/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/your comment/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /submit comment/i })).toBeInTheDocument()
  })

  it('submits form and calls submitComment with correct data', async () => {
    const mockSubmit = blogService.submitComment as jest.Mock

    render(<CommentForm postId={postId} />)

    fireEvent.change(screen.getByPlaceholderText(/your name/i), {
      target: { value: 'Alice' },
    })
    fireEvent.change(screen.getByPlaceholderText(/your comment/i), {
      target: { value: 'This is great!' },
    })

    fireEvent.submit(screen.getByRole('button'))

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith(postId, {
        author: 'Alice',
        text: 'This is great!',
      })
    })
  })

  it('disables button while submitting', async () => {
    const mockSubmit = blogService.submitComment as jest.Mock
    mockSubmit.mockImplementation(() => new Promise((res) => setTimeout(res, 200)))

    render(<CommentForm postId={postId} />)

    fireEvent.change(screen.getByPlaceholderText(/your name/i), {
      target: { value: 'Bob' },
    })
    fireEvent.change(screen.getByPlaceholderText(/your comment/i), {
      target: { value: 'Nice article!' },
    })

    fireEvent.submit(screen.getByRole('button') ?? screen.getByRole('button'))

    expect(screen.getByRole('button')).toBeDisabled()
    expect(screen.getByText(/submitting/i)).toBeInTheDocument()
  })
})
