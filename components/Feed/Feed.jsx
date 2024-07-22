"use client";
import { useWorkoutsStore } from "@utils/stores";
import { useEffect } from "react";
import Workout from "./Workout";

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

      <div className="popularWorkouts w-3/4 md:flex-row flex flex-col items-center gap-5 flex-wrap justify-center">
        {workouts?.map((workout) => {
          return <Workout workout={workout} key={workout.id} />;
        })}
      </div>
    </section>
  );
}

export default Feed;
