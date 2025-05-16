import { render, screen, waitFor } from '@testing-library/react'
import DashboardPage from '@/app/dashboard/page'
import * as blogService from '@/lib/blogServices'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
}))

jest.mock('@/lib/blogServices', () => ({
  fetchPosts: jest.fn(),
}))

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    refresh: jest.fn(),
  }),
}))

describe('DashboardPage', () => {
  const mockSession = useSession as jest.Mock
  const mockFetchPosts = blogService.fetchPosts as jest.Mock

  const mockPosts = [
    {
      id: 1,
      title: 'Hello World in FastAPI + Next.js',
      created_at: '2025-04-28T12:00:00Z',
      status: 'Published',
    },
    {
      id: 2,
      title: 'Deploying FastAPI on Render',
      created_at: '2025-04-26T14:20:00Z',
      status: 'Draft',
    },
  ]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('shows loading message when session status is loading', () => {
    mockSession.mockReturnValue({ data: null, status: 'loading' })
    mockFetchPosts.mockResolvedValue([])

    render(<DashboardPage />)

    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('renders dashboard with user and posts', async () => {
    mockSession.mockReturnValue({
      data: { user: { name: 'Test User' } },
      status: 'authenticated',
    })

    mockFetchPosts.mockResolvedValue(mockPosts)

    render(<DashboardPage />)

    expect(await screen.findByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Welcome,')).toBeInTheDocument()
    expect(screen.getByText('Test User')).toBeInTheDocument()
    expect(screen.getByText('Hello World in FastAPI + Next.js')).toBeInTheDocument()
    expect(screen.getByText('Deploying FastAPI on Render')).toBeInTheDocument()
    expect(screen.getAllByText('Edit').length).toBe(2)
    expect(screen.getAllByText('Delete').length).toBe(2)
  })
})
