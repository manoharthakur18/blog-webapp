'use client'

import { useState } from 'react'
import { submitComment } from '@/lib/blogServices'
import { useRouter } from 'next/navigation'

export default function CommentForm({ postId }: { postId: number }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(event.currentTarget)
    const name = formData.get('name') as string
    const comment = formData.get('comment') as string

    setLoading(true)
    try {
      await submitComment(postId, { author: name, text: comment })
      form.reset()
      router.refresh()
    } catch (error) {
      console.error('Comment submission failed:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="mt-10">
      <h2>Leave a Comment</h2>
      <form className="space-y-4 max-w-xl" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="w-full p-2 border rounded dark:bg-gray-800"
          required
        />
        <textarea
          name="comment"
          placeholder="Your comment..."
          rows={4}
          className="w-full p-2 border rounded dark:bg-gray-800"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Submitting...' : 'Submit Comment'}
        </button>
      </form>
    </section>
  )
}
