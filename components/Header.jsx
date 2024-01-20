'use client'

import Link from "next/link"
import { useSession, signIn, signOut, getProviders } from "next-auth/react"
import { useState, useEffect } from 'react'
import Image from "next/image"

function Header() {
    const { data: session } = useSession()
    const [providers, setProviders] = useState(null)

    useEffect(() => {
        const setUpProviders = async () => {
            const response = await getProviders()
            setProviders(response)
        }

        setUpProviders()
    }, [])


    return (
        <nav className="w-full sticky top-0 z-10 bg-base-100/95 border-b border-base-300 backdrop-blur-md flex items-center justify-evenly p-4 shadow shadow-sm">
            <h1 className='text-primary font-bold text-sm'> <Link href='/'>Gym Buddies</Link> </h1>
            <ul className='flex text-primary gap-3 items-center'>
                {
                    session ?
                        <>
                            <li>
                                <details className="dropdown dropdown-bottom dropdown-end">
                                    <summary className="m-1 btn btn-outline btn-primary text-primary-content">Options</summary>
                                    <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                                        <li> <Link href='/dashboard' className='text-primary font-semibold underline underline-sm'>Dashboard</Link> </li>
                                        <li> <button type="button" className='text-primary font-semibold underline underline-sm' onClick={() => signOut()} > Log Out</button> </li>
                                    </ul>
                                </details>
                            </li>
                            {/* <Image src={session?.user.image} width={35} height={35} className='object-contain' /> */}
                        </>
                        :
                        <>
                            {providers && Object.values(providers).map((provider) => {
                                return <li key={providers.id}>
                                    {console.log(provider)}
                                    <button type="button"  onClick={() => signIn(provider.id)} className="btn btn-outline btn-primary">Sign In with {provider.name} </button>
                                </li>
                            })}
                        </>
                }
            </ul>
        </nav>
    )
}

export default Header