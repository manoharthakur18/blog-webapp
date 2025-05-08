import { fetchPosts } from '@/lib/blogServices'
import Link from 'next/link'

interface Post {
  id: number
  title: string
  slug: string
  excerpt: string
  created_at: string
}

async function getAllPosts(): Promise<Post[]> {
  const response = await fetchPosts()
  return response.map((post: Post) => ({
    ...post,
    created_at: new Date(post.created_at).toISOString(),
  }))
}

export default async function BlogListingPage() {
  const posts = await getAllPosts()

  return (
    <section>
      <h1 className="text-4xl font-bold mb-6">All Blog Posts</h1>
      <div className="grid gap-6 sm:grid-cols-2">
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
    </section>
  )
}
