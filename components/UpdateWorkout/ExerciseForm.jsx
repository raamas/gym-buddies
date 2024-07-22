"use client";

import { useState, useEffect } from "react";
import { deleteExercise } from "@utils/functions";

function ExerciseForm({ exercise, workout, setWorkout, setShowForm }) {
	const [newExercise, setNewExercise] = useState(exercise);
	const handleChange = (e) => {
		setNewExercise({ ...newExercise, [e.target.name]: e.target.value });
	};
	const saveUpdate = () => {
		let newExercises = deleteExercise(workout.exercises, exercise.name);
		newExercises = [...newExercises, newExercise];
		setWorkout({ ...workout, exercises: [...newExercises] });
		setShowForm(false);
	};

	useEffect(() => {
		setNewExercise({ ...exercise });
	}, [exercise]);
	return (
		<div className="my-2 mb-5 flex flex-col items-center justify-between w-full">
			<label htmlFor="name">Exercise Name</label>
			<input
				type="text"
				name="name"
				value={newExercise.name}
				onChange={handleChange}
				className="input input-accent mb-2 w-full"
			/>

			<div className="flex flex-row items-center justify-between w-full mb-2">
			<label htmlFor="reps">Reps</label>
			<input
				type="number"
				name="reps"
				value={newExercise.reps}
				onChange={handleChange}
				className="input input-accent w-1/2 mx-1"
			/>

			<label htmlFor="sets">Sets</label>
			<input
				type="number"
				name="sets"
				value={newExercise.sets}
				onChange={handleChange}
				className="input input-accent w-1/2 mx-1"
			/>
			</div>

			<button
				onClick={saveUpdate}
				className="btn btn-accent btn-outline w-full"
			>
				Save Exercise
			</button>
		</div>
	);
}

export default ExerciseForm;
