'use client'

import React, { useEffect, useState } from 'react'
import Exercise from './Exercise'
import { v4 } from 'uuid'

'use client'
import { useState } from 'react'




function UpdateExerciseForm({ exercise, workout, setWorkout, index }) {
    const [updatedExercise, setUpdatedExercise] = useState({
        name:  exercise.name,
        reps: exercise.reps,
        sets: exercise.sets
    })

    const deleteExercise = ()=>{
        setWorkout({ ...workout, exercises: [ ...workout.exercises.slice(0,index - 1), ...workout.exercises.slice(index+1)  ] })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        console.log(exercise)

        setWorkout({ ...workout, exercises: [...workout.exercises, updatedExercise] })
    
    }

    return (
        <div>
            <div >
                <label>
                    <p className='mb-2'>Exercise Name</p>
                    <input type="text" name="name" id="exerciseName" className='input input-secondary w-full mb-4' value={updatedExercise.name} disabled />
                </label>
                <label>
                    <p className='mb-2'>Rep count</p>
                    <input type="number" name="reps" id="exerciseReps" className='input input-secondary w-full mb-4' value={updatedExercise.reps} onChange={(e) => setUpdatedExercise({ ...updatedExercise, reps: e.target.value })} />
                </label>
                <label>
                    <p className='mb-2'>Set count</p>
                    <input type="number" name="sets" id="exerciseSets" className='input input-secondary w-full mb-4' value={updatedExercise.sets} onChange={(e) => setUpdatedExercise({ ...updatedExercise, sets: e.target.value })} />
                </label>
                <button type="button" className='btn btn-outline btn-error w-full' onClick={deleteExercise}> Delete Exercise</button>  
                <button type='submit' className='btn btn-outline btn-secondary w-full' onClick={handleSubmit}  > Add Exercise </button>
            </div>
        </div>
    )
}



function UpdateWorkoutForm({ type, handleSubmit, workout, setWorkout }) {
    const [showExerciseForm, setShowExerciseForm] = useState(false)
    const [updatedWorkout, setUpdatedWorkout] = useState({
        name: workout.name,
        exercises: [
            ...workout.exercises
        ]
    })

    return (
        <div>
            <form onSubmit={handleSubmit} className='flex flex-col flex-center'>
                <label>
                    <p>Workout Name</p>
                    <input type="text" name="name" id="workoutName" className='input input-primary w-full mb-4' value={updatedWorkout.name} onChange={(e) => setUpdatedWorkout({ ...updatedWorkout, [e.target.name]: e.target.value })} />
                </label>
                <div>
                    <h2 className='mb-4'>Exercises:</h2>
                    {
                        workout.exercises?.map((exercise,index) => {
                            return <UpdateExerciseForm exercise={exercise} workout={updatedWorkout} setWorkout={setUpdatedWorkout} key={v4()} index={index} />
                        })
                    }
                </div>

                <button type="submit" className='btn btn-primary w-full mb-4'>{type} workout</button>
            </form>
        </div>
    )
}

export default UpdateWorkoutForm