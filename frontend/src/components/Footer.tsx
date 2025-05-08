// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="w-full py-6 border-t bg-white dark:bg-gray-900">
      <div className="max-w-5xl mx-auto px-4 text-center text-sm text-gray-600 dark:text-gray-400">
        &copy; {new Date().getFullYear()} My Blog. All rights reserved.
      </div>
    </footer>
  )
}
