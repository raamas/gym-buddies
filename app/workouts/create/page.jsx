'use client'
import { supabase } from "@utils/supabase.js"
import { useSession } from "next-auth/react"
import { useState } from "react"
import Form from '@components/WorkoutForm.jsx'
import { useRouter } from 'next/navigation'

function page() {
  const { data: session } = useSession()
  const { push } = useRouter()
  const [workout, setWorkout] = useState({
    name: '',
    exercises: []
  })

  const handleCreate = async (e) => {
    e.preventDefault()

    try {
      let res = await supabase
        .from('workouts')
        .insert({
          name: workout.name.toLowerCase(),
          exercises: workout.exercises
        }).select()
        .single()

      let workoutId = res.data?.id

      res = await supabase
        .from('users_workouts')
        .insert({
          userId: session.user.id,
          workoutId: workoutId
        })

      push('/dashboard')

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <main className="flex flex-col justify-center">
      <section className="shared_workouts max-w-md" >
        <h2 className="font-semibold text-base-content mb-4">Create Workout</h2>

        <div className="text-base-content">
          <Form
            type='Create'
            workout={workout}
            setWorkout={setWorkout}
            handleSubmit={handleCreate}
          />
        </div>
      </section>
    </main>
  )
}

export default page