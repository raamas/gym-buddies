import  { withAuth } from 'next-auth/middleware'

export default withAuth({
    secret: process.env.NEXTAUTH_SECRET
})

export const config = {
    matcher: ['/dashboard', '/workouts/:path*/edit', '/workouts/create']
}