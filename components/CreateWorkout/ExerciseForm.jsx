"use client";

import { useState } from "react";

function ExerciseForm({ workout, setWorkout, setShow }) {
	const [exercise, setExercise] = useState({
		name: "",
		reps: 8,
		sets: 3,
	});

	const handleSubmit = (e) => {
		e.preventDefault();

		console.log(exercise);

		setWorkout({ ...workout, exercises: [...workout.exercises, exercise] });
		setShow(false);
	};

	return (
		<div>
			<div>
				<label>
					<p className="mb-2">Exercise Name</p>
					<input
						type="text"
						name="name"
						id="exerciseName"
						className="input input-accent w-full mb-4"
						value={exercise.name}
						onChange={(e) => setExercise({ ...exercise, name: e.target.value })}
					/>
				</label>
				<label>
					<p className="mb-2">Rep count</p>
					<input
						type="number"
						name="reps"
						id="exerciseReps"
						className="input input-accent w-full mb-4"
						value={exercise.reps}
						onChange={(e) => setExercise({ ...exercise, reps: e.target.value })}
					/>
				</label>
				<label>
					<p className="mb-2">Set count</p>
					<input
						type="number"
						name="sets"
						id="exerciseSets"
						className="input input-accent w-full mb-4"
						value={exercise.sets}
						onChange={(e) => setExercise({ ...exercise, sets: e.target.value })}
					/>
				</label>
				<button
					type="submit"
					className="btn btn-outline btn-accent w-full"
					onClick={handleSubmit}
				>
					{" "}
					Add Exercise{" "}
				</button>
			</div>
		</div>
	);
}

export default ExerciseForm;
