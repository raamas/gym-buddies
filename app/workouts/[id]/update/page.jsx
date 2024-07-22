"use client";

import WorkoutForm from "@components/UpdateWorkout/WorkoutForm";
import { useState, useEffect } from "react";
import { getWorkout } from "@utils/functions";

function WorkoutUpdate({ params }) {
	const [workout, setWorkout] = useState({});

	useEffect(() => {
		const invokeGetWorkout = async () => {
			let data = await getWorkout(params.id);
			setWorkout(data);
		};

		invokeGetWorkout();
	}, [params.id]);

	return (
		<main className="min-h-100vh flex flex-col justify-center bg-base-100 ">
			<section className="flex flex-col max-w-md justify-center items-center p-8 bg-base-100">
				<h2 className="font-semibold text-base-content mb-4">Create Workout</h2>

				<div className="text-base-content flex flex-col items-center justify-center w-full">
					<WorkoutForm workout={workout} />
				</div>
			</section>
		</main>
	);
}

export default WorkoutUpdate;
