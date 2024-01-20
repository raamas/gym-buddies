import { useWorkoutsStore } from "@utils/stores"
import Exercise from "@components/Exercise"
import { supabase } from "@utils/supabase"
import { v4 } from 'uuid'
import { useSession } from "next-auth/react"
import Link from "next/link"

function WorkoutMember({ memberName, isLast }) {
    if (isLast) {
        return <p>{memberName}.</p>
    } else {
        return <p>{memberName}, </p>
    }
}


function Workout({ workout }) {
    const { data: session } = useSession()
    let getUserWorkouts = useWorkoutsStore((state) => state.getUserWorkouts)

    const deleteWorkout = async (workoutId) => {

        let res = await supabase.from('workouts')
            .delete()
            .eq('id', workoutId)

        if (res.error) {
            console.log(error)
            return false
        }

        getUserWorkouts({ id: session.user.id})
    }

    return (
        <div key={workout.id} className='card card-bordered bg-base-100 flex flex-col items-center mb-4 p-4 shadow shadow-sm'>
            <Link href={`/workouts/${workout.id}/`}><h2 className='text-primary mb-4 text-xl'>{workout.name}</h2></Link>
            <span className='flex gap-3'>
                <h3>Members:</h3>

                {workout.users.map((member, index) => {
                    return <WorkoutMember memberName={member.name.split(' ')[0]} isLast={(index + 1 == workout.users.length)} key={v4()} />
                })}
            </span>

            {workout.exercises.map((exercise) => {
                return <Exercise exercise={exercise} key={v4()} />
            })}
            <button type="button" className='btn btn-outline btn-error w-full' onClick={() => deleteWorkout(workout.id)}>Delete Workout</button>
        </div>
    )

}

export default Workout