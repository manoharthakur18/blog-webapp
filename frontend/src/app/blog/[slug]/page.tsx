
import { fetchPostBySlug } from '@/lib/blogServices'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import CommentForm from './CommentForm'

interface Comment {
  id: number
  author: string
  text: string
  created_at: string
}

interface Post {
  id: number
  title: string
  slug: string
  content: string
  created_at: string
  comments: Comment[]
}

async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const response = await fetchPostBySlug(slug)
    return response
  } catch (error) {
    return null
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) return notFound()

  return (
    <article className="prose dark:prose-invert max-w-3xl mx-auto">
      <h1>{post.title}</h1>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Published on {new Date(post.created_at).toLocaleDateString()}
      </p>
      <hr />
      <ReactMarkdown>{post.content}</ReactMarkdown>

      {post.comments?.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">Comments</h2>
          <div className="space-y-6">
            {post.comments.map((comment) => (<div key={comment.id}>
              <p className="font-medium text-gray-900 dark:text-gray-100">{comment.author}</p>
              <div className="bg-gray-100 dark:bg-gray-800 px-4 py-1 rounded-xl">
                <p className="text-gray-700 dark:text-gray-300 mt-1 whitespace-pre-line">
                  {comment.text}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  {new Date(comment.created_at).toLocaleString()}
                </p>
              </div>
              </div>
            ))}
          </div>
        </section>
      )}
      <CommentForm postId={post.id} />
    </article>
  )
}
