import { useUserStore } from "@utils/stores";
import Exercise from "@components/Exercise";
import { supabase } from "@utils/supabase";
import { v4 } from "uuid";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

function Workout({ workout }) {
	const {push} = useRouter();
	const { data: session } = useSession();
	let getUserWorkouts = useUserStore((state) => state.getUserWorkouts);

	const deleteWorkout = async (workoutId) => {
		let res = await supabase.from("workouts").delete().eq("id", workoutId);

		if (res.error) {
			console.log(error);
			return false;
		}

		getUserWorkouts({ id: session.user.id });
	};

	return (
		<div
			key={workout.id}
			className="card card-bordered bg-base-100 border-base-300 flex flex-col items-center justify-between mb-4 p-4 shadow shadow-sm min-h-80 min-w-full"
		>
			<Link href={`/workouts/${workout.id}/`}>
				<h2 className="text-secondary mb-2 text-xl font-semibold ">
					{workout.name}
				</h2>
			</Link>

			<div className="mb-2">
				<p className="mb font-light">
					{workout.isPublic ? "Public Workout" : "Private Workout"}
				</p>
				<span className="flex gap-1">
					<h3 className="font-light">Saves:</h3>

					{workout?.userCount[0].count}
				</span>
			</div>

			{workout.exercises.map((exercise) => {
				return (
					<Exercise
						exercise={exercise}
						key={v4()}
					/>
				);
			})}

			<button
				type="button"
				className="btn btn-outline btn-info w-full mb-2"
				onClick={() => push(`/workouts/${workout.id}/update`)}
			>
				Update Workout
			</button>
			<button
				type="button"
				className="btn btn-outline btn-error w-full"
				onClick={() => deleteWorkout(workout.id)}
			>
				Delete Workout
			</button>
		</div>
	);
}

export default Workout;
