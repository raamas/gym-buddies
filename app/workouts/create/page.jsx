'use client'
import { supabase } from "@utils/supabase.js"
import { useSession } from "next-auth/react"
import { useState } from "react"
import CreateWorkoutForm from '@components/CreateWorkoutForm.jsx'
import { useRouter } from 'next/navigation'

function WorkoutCreate() {
  const { data: session } = useSession()
  const { push } = useRouter()
  const [workout, setWorkout] = useState({
    name: '',
    exercises: [],
    isPublic: true
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
    <main className="min-h-100vh flex flex-col justify-center bg-base-100">
      <section className="flex flex-col max-w-md items-center p-8 bg-base-100" >
        <h2 className="font-semibold text-base-content mb-4">Create Workout</h2>

        <div className="text-base-content">
          <CreateWorkoutForm
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

export default WorkoutCreate