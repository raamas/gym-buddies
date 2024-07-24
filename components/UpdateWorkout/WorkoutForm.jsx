"use client";

import { useEffect, useState } from "react";
import ExerciseCard from "./ExerciseCard"; 
import { supabase } from "@utils/supabase";
import { useRouter } from "next/navigation";
import {v4} from "uuid"

function WorkoutForm({ workout }) {
	const [newWorkout, setNewWorkout] = useState({});
	const {push} = useRouter()

	useEffect(() => {
		setNewWorkout({ ...workout });
	}, [workout]);

	const addExercise = () => {
		setNewWorkout({
			...newWorkout,
			exercises: [
				...newWorkout.exercises,
				{ name: "New Exercise", reps: 0, sets: 0 },
			],
		});
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(newWorkout);
		let { data, error } = await supabase
			.from("workouts")
			.update({ exercises: [...newWorkout.exercises], name: newWorkout.name })
			.eq("id", workout.id)
			.select();

		if (error) {
			console.log(error.message);
			return;
		}

		console.log(data);
		push("/dashboard")
	};

	return (
		<div className="w-full">
			<form
				onSubmit={handleSubmit}
				className="card card-bordered bg-base-100 border-base-300 flex flex-col items-center justify-center w-full p-4"
			>
				<label htmlFor="name">Workout Name</label>
				<input
					type="text"
					name="name"
					id=""
					value={newWorkout.name}
					className="input input-secondary mb-3 w-full"
					onChange={(e) =>
						setNewWorkout({ ...newWorkout, name: e.target.value })
					}
				/>

				{newWorkout?.exercises?.map((exercise) => {
					return (
						<ExerciseCard
						key={v4()}
							exercise={exercise}
							workout={newWorkout}
							setWorkout={setNewWorkout}
						/>
					);
				})}
				<button
					onClick={addExercise}
					className="btn btn-outline btn-info p-3 w-full mb-2"
				>
					Add Exercise
				</button>

				<button
					type="submit"
					className="btn btn-outline btn-secondary p-3 w-full"
				>
					Save Workout
				</button>
			</form>
		</div>
	);
}

export default WorkoutForm;
