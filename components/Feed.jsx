"use client";
import { useWorkoutsStore } from "@utils/stores";
import { useEffect } from "react";
import Link from "next/link";
import Exercise from "./Exercise";
import { v4 } from "uuid";

function Workout({ workout }) {
  return (
    <div
      key={workout.id}
      className="card card-bordered bg-base-100 flex flex-col items-center mb-4 p-4 shadow shadow-sm"
    >
      <Link href={`/workouts/${workout.id}/`}>
        <h2 className="text-primary mb-4 text-xl">{workout.name}</h2>
      </Link>
      <span className="flex gap-3">
        <p className="mb-4 text-base-content">
          No. Member: {workout.userCount?.[0].count}
        </p>
      </span>

      {workout.exercises.map((exercise) => {
        return <Exercise exercise={exercise} key={v4()} />;
      })}
    </div>
  );
}

function Feed() {
  let workouts = useWorkoutsStore((state) => state.workoutsState);
  const getWorkouts = useWorkoutsStore((state) => state.getPopularWorkouts);

  useEffect(() => {
    const invokeGetWorkouts = () => {
      console.log("working");
      getWorkouts();
      console.log(workouts);
    };

    invokeGetWorkouts();
  }, []);

  return (
    <section className="flex flex-col max-w-lg items-center p-8 bg-base-100">
      <div className="bg-clip-text bg-gradient-to-r from-primary from-75% to-secondary to-90% mb-4">
        <h1 className="text-2xl font-light text-transparent">Feed</h1>
      </div>

      <div className="popularWorkouts w-3/4">
        {workouts?.map((workout) => {
          return <Workout workout={workout} />;
        })}
      </div>
    </section>
  );
}

export default Feed;
