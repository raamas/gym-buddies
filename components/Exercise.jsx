import React from 'react'

function Exercise({exercise}) {
    return (
        <div className='flex-flex-row w-4/5 items-center justify-evenly max-w-sm mb-4' >
            <h3 className='text-secondary font-semibold'>Exercise: {exercise.name}</h3>
            <p className='text-base-content'>{exercise.reps} x {exercise.sets} sets</p>
        </div>
    )
}

export default Exercise