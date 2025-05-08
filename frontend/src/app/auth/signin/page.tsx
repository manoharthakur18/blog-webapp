'use client'

import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'

export default function SignInPage() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'
  const error = searchParams.get('error')

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md border p-6 rounded-lg dark:border-gray-700 shadow-md dark:bg-gray-900 bg-white">
        <h1 className="text-2xl font-bold mb-4 text-center">Sign In to My Blog</h1>
        {error && (
          <p className="text-sm text-red-600 mb-4 text-center">
            Authentication failed. Please try again.
          </p>
        )}
        <div className="space-y-4">
          <button
            onClick={() => signIn('github', { callbackUrl })}
            className="w-full px-4 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Sign in with GitHub
          </button>
          {/* <button
            onClick={() => signIn('google')}
            className="w-full px-4 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Sign in with Google
          </button> */}
        </div>
      </div>
    </div>
  )
}
