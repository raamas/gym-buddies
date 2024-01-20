'use client'

import React from 'react'
import { useSession } from "next-auth/react"

function Layout({ children }) {
  const { data: session } = useSession()

  const userFirstName = session?.user.name.split(' ')[0]


  return (
    <div className="main bg-base-100 p-8">
      <h1 className="text-3xl font-thin text-primary mb-6">{userFirstName + "'s "} Dashboard</h1>

      {children}
    </div>
  )
}

export default Layout