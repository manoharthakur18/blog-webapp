// app/layout.tsx
import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Providers } from '@/components/Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'My Blog',
  description: 'A fullstack blog platform built with Next.js and FastAPI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300`}>
        <Providers>
          <Navbar />
          <main className="min-h-[85vh] px-4 md:px-12 max-w-5xl mx-auto py-6">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
