'use client'

import { fetchPosts } from '@/lib/blogServices'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface Post {
  id: number
  title: string
  slug: string
  excerpt: string
  created_at: string
}

export default function HomePage() {
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

  return (
    <section>
      <h1 className="text-4xl font-bold mb-6">Recent Posts</h1>

      {loading ? (
        <p className="text-gray-600 dark:text-gray-400">Loading posts...</p>
      ) : error ? (
        <p className="text-red-600 dark:text-red-400">{error}</p>
      ) : posts.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">No posts available.</p>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post.id} className="p-4 border rounded-lg hover:shadow-lg transition-shadow">
              <Link href={`/blog/${post.slug}`}>
                <h2 className="text-2xl font-semibold hover:text-blue-600 dark:hover:text-blue-400">{post.title}</h2>
              </Link>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {new Date(post.created_at).toLocaleDateString()}
              </p>
              <p className="mt-2 text-gray-800 dark:text-gray-200">{post.excerpt}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
