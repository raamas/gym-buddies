'use client'

import React, { useEffect, useState } from 'react'
import ExerciseForm from './ExerciseForm'
// import EditExerciseForm from './ExerciseForm'
import Exercise from './Exercise'
import { v4 } from 'uuid'

function Form({ type, handleSubmit, workout, setWorkout }) {
    const [showExerciseForm, setShowExerciseForm] = useState(false)

    return (
        <div>
            <form onSubmit={handleSubmit} className='flex flex-col flex-center'>
                <label>
                    <p>Workout Name</p>
                    <input type="text" name="name" id="workoutName" className='input input-primary w-full mb-4' value={workout.name} onChange={(e) => setWorkout({ ...workout, [e.target.name]: e.target.value })} />
                </label>
                <div>
                    <h2 className='mb-4'>Exercises:</h2>
                    {
                        workout.exercises?.map((exercise) => {
                            return <Exercise exercise={exercise} key={v4()} />
                        })
                    }
                </div>

                {/* {
                    (type == 'Edit') ?
                        workout.exercises?.map(() => {
                            return <EditExerciseForm exercise={exercise} />
                        })
                        : <></>
                } */}

                {
                    showExerciseForm ?
                        <div className="w-3/4 flex flex-col justify-center mb-4">
                            <ExerciseForm workout={workout} setWorkout={setWorkout} setShow={setShowExerciseForm} />
                        </div>
                        :
                        <button type="submit" className='btn btn-primary w-full mb-4' onClick={() => setShowExerciseForm(true)}>add exercise</button>
                }

                <button type="submit" className='btn btn-primary w-full mb-4'>{type} workout</button>
            </form>
        </div>
    )
}

export default Form