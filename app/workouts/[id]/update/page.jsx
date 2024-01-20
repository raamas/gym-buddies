'use client'
// import { supabase } from "@utils/supabase.js"
// import { useSession } from "next-auth/react"
// import { useState } from "react"
// import Form from '@components/Form.jsx'

function WorkoutUpdate() {
  const [workout, setWorkout] = useState()
  const { data: session } = useSession()

  // const handleCreate = async (e) => {
  //   e.preventDefault()

  //   try {
  //     let res = await supabase
  //       .from('workouts')
  //       .update({
  //         ...workout
  //       })
  //       .eq(id, workoutId)

  //     res = await supabase
  //       .from('users_workouts')
  //       .insert({
  //         userId: session.user.id,
  //         workoutId: res.data.id
  //       }
  //       )
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  return (
    <main className="flex flex-col justify-center">
      {/* <section className="shared_workouts max-w-md" >
        <h2 className="font-semibold text-base-content mb-4">Create Workout</h2>

        <div className="text-base-content">
          <Form
            type='create'
            workout={workout}
            setWorkout={setWorkout}
            handleSubmit={handleCreate}
          />
        </div>
      </section> */}
    </main>
  )
}

export default WorkoutUpdate