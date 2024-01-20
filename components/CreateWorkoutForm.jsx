'use client'

import React, { useEffect, useState } from 'react'
import Exercise from './Exercise'
import { v4 } from 'uuid'

function ExerciseForm({ workout, setWorkout, setShow }) {
    const [exercise, setExercise] = useState({
        name: '',
        reps: 8,
        sets: 3
    })

    const handleSubmit = (e) => {
        e.preventDefault()

        console.log(exercise)

        setWorkout({ ...workout, exercises: [...workout.exercises, exercise] })
        setShow(false)
    }

    return (
        <div>
            <div >
                <label>
                    <p className='mb-2'>Exercise Name</p>
                    <input type="text" name="name" id="exerciseName" className='input input-secondary w-full mb-4' value={exercise.name} onChange={(e) => setExercise({ ...exercise, name: e.target.value })} />
                </label>
                <label>
                    <p className='mb-2'>Rep count</p>
                    <input type="number" name="reps" id="exerciseReps" className='input input-secondary w-full mb-4' value={exercise.reps} onChange={(e) => setExercise({ ...exercise, reps: e.target.value })} />
                </label>
                <label>
                    <p className='mb-2'>Set count</p>
                    <input type="number" name="sets" id="exerciseSets" className='input input-secondary w-full mb-4' value={exercise.sets} onChange={(e) => setExercise({ ...exercise, sets: e.target.value })} />
                </label>
                <button type='submit' className='btn btn-outline btn-secondary w-full' onClick={handleSubmit}  > Add Exercise </button>
            </div>
        </div>
    )
}


function CreateWorkoutForm({ type, handleSubmit, workout, setWorkout }) {
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

export default CreateWorkoutForm