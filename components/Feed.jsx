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
      className="card card-bordered bg-base-100 border-base-300 flex flex-col items-center justify-start mb-4 p-4 pt-6 shadow shadow-sm min-w-64 min-h-72 max-h-72"
    >
      <Link href={`/workouts/${workout.id}/`}>
        <h2 className="text-base-content mb-2 text-xl font-semibold">
          {workout.name}
        </h2>
      </Link>
      <span className="flex gap-3">
        <p className="mb-4 text-base-content font-light">
          Saves: {workout.userCount?.[0].count} 
        </p>
      </span>

      {workout.exercises.map((exercise, i) => {
        return i < 2 ? <Exercise exercise={exercise} key={v4()} /> : <></>;
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
    <section className="flex flex-col w-full items-center p-8 m-2 bg-base-100 text-center">
      <h1 className="text-3xl font-light text-secondary mb-6">Feed</h1>

      <div className="popularWorkouts w-3/4 md:flex-row flex flex-col items-center gap-5">
        {workouts?.map((workout) => {
          return <Workout workout={workout} key={workout.id} />;
        })}
      </div>
    </section>
  );
}

export default Feed;
