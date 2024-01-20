'use client'
import Exercise from "@components/Exercise"
import { getWorkout } from "@utils/functions"
import { useEffect, useState } from "react"

function WorkoutPage({ params }) {
  const [workout, setWorkout] = useState({})

  useEffect(() => {

    const invokeGetWorkout = async () => {
      let data = await getWorkout(params.id)
      console.log(data)
      setWorkout(data)
    }

    invokeGetWorkout()
  }, [])

  return (
    <main className="flex flex-col justify-center">
      <section className="flex flex-col max-w-md">
        <h2 className="text-2xl text-primary font-semibold">{workout?.name}</h2>
        <p>Creator: {workout?.creator.name}</p>
        {console.log(workout.userCount)}
        <p>No. Member: {workout.userCount.count}</p>
        <div className="flex flex-col justify-center">
          {
            workout?.exercises?.map((exercise, index) => {
              return <Exercise key={index} exercise={exercise} />
            })
          }
        </div>
      </section>
    </main>
  )
}

export default WorkoutPage