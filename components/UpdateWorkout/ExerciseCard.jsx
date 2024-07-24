"use client"

import ExerciseForm from "./ExerciseForm";
import { FaTrashCan, FaPen } from "react-icons/fa6";
import {deleteExercise} from "@utils/functions";
import { useState } from "react";

function ExerciseCard({ exercise, workout, setWorkout }) {
	const [showForm, setShowForm] = useState(false);

	const handleDelete = ()=>{
		let newExercises = deleteExercise(workout.exercises, exercise.name)
		console.log(newExercises)
		setWorkout({...workout, exercises: [...newExercises]})
	}

	return showForm ? (
		<ExerciseForm
			exercise={exercise}
			workout={workout}
			setWorkout={setWorkout}
			showForm={showForm}
			setShowForm={setShowForm}
		/>
	) : (
		<div className="flex flex-row w-full items-center justify-between mb-2">
			<p>{exercise.name}</p>
			<span id="actions">
				<button
				type="button"
					className="btn btn-circle btn-outline btn-info mx-1"
					onClick={() => setShowForm(true)}
				>
					{" "}
					<FaPen />{" "}
				</button>
				<button
				type="button"
					className="btn btn-circle btn-outline btn-error"
					onClick={handleDelete}
				>
					{" "}
					<FaTrashCan />{" "}
				</button>

			
			</span>
		</div>
	);
}

export default ExerciseCard; 
