import { render, screen } from '@testing-library/react'
import AboutPage from '@/app/about/page'

describe('AboutPage', () => {
  it('renders the main heading', () => {
    render(<AboutPage />)
    const heading = screen.getByRole('heading', { name: /about this blog/i })
    expect(heading).toBeInTheDocument()
  })

  it('renders key content paragraphs', () => {
    render(<AboutPage />)

    expect(
      screen.getByText(/I share deep dives, quick tips, and tutorials/i)
    ).toBeInTheDocument()

    expect(
      screen.getByText(/you’ll find value in real-world examples/i)
    ).toBeInTheDocument()

    expect(
      screen.getByText(/I built this blog to document my learning/i)
    ).toBeInTheDocument()

    expect(
      screen.getByText(/Outside of code, I love writing/i)
    ).toBeInTheDocument()
  })
})
