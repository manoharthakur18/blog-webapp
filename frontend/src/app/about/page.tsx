

export const metadata = {
  title: 'About - My Blog',
}

export default function AboutPage() {
  return (
    <section className="prose dark:prose-invert max-w-3xl mx-auto">
      <h1>About This Blog</h1>
      <p>
        Welcome to <strong>My Blog</strong> — a platform where I share deep dives, quick tips, and
        tutorials on full-stack web development, primarily focusing on FastAPI and Next.js.
      </p>
      <p>
        Whether you're just starting out or are already building production apps, you’ll find value
        in real-world examples, deployment strategies, and full walkthroughs.
      </p>
      <h2>About Me</h2>
      <p>
        I built this blog to document my learning and help others along the way.
      </p>
      <p>
        Outside of code, I love writing, teaching, and occasionally sketching system designs on
        napkins ☕.
      </p>
    </section>
  )
}
