import  { withAuth } from 'next-auth/middleware'

export default withAuth({
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        authorized: ({ req, token }) => {
          console.log('req', req);
          console.log('token: ', token);
          // /admin requires admin role, but /me only requires the user to be logged in.
          if(token) return true
        },
      },
})

export const config = {
    matcher: ['/dashboard', '/workouts/:path*/edit', '/workouts/create']
}




