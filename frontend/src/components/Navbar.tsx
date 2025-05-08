'use client'

import Link from 'next/link'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { Sun, Moon, LogIn, LogOut } from 'lucide-react'

export default function Navbar() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { data: session } = useSession()
  const [dropdownOpen, setDropdownOpen] = useState(false)

  useEffect(() => setMounted(true), [])

  return (
    <header className="w-full py-4 border-b bg-white dark:bg-gray-900">
      <div className="max-w-5xl mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white">
          My Blog
        </Link>

        <nav className="flex items-center space-x-4 relative">
          <Link href="/">Home</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/about">About</Link>
          <Link href="/dashboard">Dashboard</Link>

          {/* {mounted && (
            <button
              onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
              className="ml-2"
              aria-label="Toggle theme"
            >
              {resolvedTheme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          )} */}

          {/* Session-based Avatar Dropdown */}
          {session?.user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="flex items-center space-x-2 ml-2 focus:outline-none"
              >
                <img
                  src={session.user.image ?? '/default-avatar.png'}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full border dark:border-gray-700"
                />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border rounded shadow-lg py-2 z-50">
                  <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200">
                    <p className="font-medium">{session.user.name}</p>
                    <p className="text-xs">{session.user.email}</p>
                  </div>
                  <hr className="border-gray-200 dark:border-gray-700" />
                  <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <LogOut className="inline w-4 h-4 mr-1" />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => signIn()}
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center"
            >
              <LogIn className="w-4 h-4 mr-1" />
              Sign in
            </button>
          )}
        </nav>
      </div>
    </header>
  )
}
