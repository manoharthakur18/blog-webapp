// app/dashboard/page.tsx
'use client'

import { fetchPosts } from '@/lib/blogServices'
import { Post } from '@/lib/constants'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

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

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  const [posts, setPosts] = useState<Post[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedPosts = await fetchPosts()

        const formattedPosts = fetchedPosts.map((post: Post) => ({
          ...post,
          created_at: new Date(post.created_at).toISOString(),
        }))

        setPosts(formattedPosts)
      } catch (err) {
        console.error('Error fetching posts:', err)
        setError('Failed to load posts. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (status === 'loading') {
    return <p className="text-center py-10">Loading...</p>
  }

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <p className="mb-4 text-gray-600 dark:text-gray-400">
        Welcome, <span className="font-medium">{session?.user?.name || 'Admin'}</span>
      </p>

      <h2 className="text-xl font-semibold mb-3">Your Posts</h2>
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="p-4 border rounded-lg dark:border-gray-700">
            <h3 className="text-lg font-semibold">{post.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {new Date(post.created_at).toLocaleDateString()}
            </p>
            <div className="mt-2 space-x-2">
              <button className="text-blue-600 dark:text-blue-400 hover:underline" onClick={()=> console.log("Edit Clicked")}>Edit</button>
              <button className="text-red-600 dark:text-red-400 hover:underline" onClick={()=> console.log(`Post ${post.id} Deleted`)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
