import Header from '@components/Header/Header.jsx'
import '@styles/globals.css'
import Provider from '@components/Provider.jsx'
import { DM_Sans } from 'next/font/google'

const dmSans = DM_Sans({
  subsets: ['latin']
})

export const metadata = {
  title: 'Gym Buddies',
  description: 'Take on a physical challenge and compete with your friends',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme='bumblebee' className={dmSans.className}>
      <body >
        <Provider>
          <Header />


          {children}

        </Provider>
      </body>
    </html>
  )
}
 