import { withAuth } from 'next-auth/middleware'

export default withAuth({
  pages: {
    signIn: '/auth/signin', // 👈 redirect to your custom sign-in page
  },
})

export const config = {
  matcher: ['/dashboard'], // protect any route here
}
