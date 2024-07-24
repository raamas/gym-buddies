
import Link from "next/link";
import Exercise from "../Exercise";
import { v4 } from "uuid";


function Workout({ workout }) {
	return (
		<div
			key={workout.id}
			className="card card-bordered bg-base-100 border-base-300 flex flex-col items-center justify-start mb-4 p-4 pt-6 shadow shadow-sm min-w-64 min-h-72 max-h-72"
		>
			<Link href={`/workouts/${workout.id}/`}>
				<h2 className="text-base-content mb-2 text-xl font-semibold text-wrap">
					{workout.name}
				</h2>
			</Link>

			{workout.exercises.map((exercise, i) => {
				return i < 2 ? (
					<Exercise
						exercise={exercise}
						key={v4()}
					/>
				) : (
					<></>
				);
			})}
			<span className="flex flex-start justify-self-end">
				<p className="mb-4 text-neutral-content font-light">
					{workout.userCount?.[0].count} saves
				</p>
			</span>
		</div>
	);
}

export default Workout;
