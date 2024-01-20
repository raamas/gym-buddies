'use client'

import { useSession } from "next-auth/react"
import { useEffect } from 'react'
import Link from 'next/link'
import { v4 } from 'uuid'
import Workout from '@components/Workout.jsx'
import { useWorkoutsStore } from "@utils/stores"

function page() {
    const { data: session } = useSession()
    let workouts = useWorkoutsStore((state) => state.workoutsState)
    const getUserWorkouts =  useWorkoutsStore((state) => state.getUserWorkouts)

    useEffect(() => {
        const invokeGetUserWorkouts =  () => {

            getUserWorkouts({
                id: session.user.id,
                name: session.user.name
            })
        }

        invokeGetUserWorkouts()
    }, [])

    return (
        <main className="flex flex-col justify-center">
            <section className="shared_workouts max-w-md" >
                <h2 className="font-semibold text-base-content mb-4">Your shared workouts</h2>
                <div className="text-base-content">
                    {workouts.map((workout) => {
                        return <Workout workout={workout} key={v4()} />
                    })
                    }
                </div>

                <Link href='/workouts/create' className='btn btn-primary w-full'>Create a new workout</Link>
            </section>
        </main>
    )
}

export default page
