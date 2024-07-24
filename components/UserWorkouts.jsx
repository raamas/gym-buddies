"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Workout from "@components/Workout.jsx";
import { useWorkoutsStore } from "@utils/stores";
import { v4 } from "uuid";
import { redirect } from "next/navigation";

function UserWorkouts() {
  const { data: session } = useSession();
  let workouts = useWorkoutsStore((state) => state.workoutsState);
  const getUserWorkouts = useWorkoutsStore((state) => state.getUserWorkouts);

  useEffect(() => {
    if (!session) {
      redirect("/api/auth/signin");
    }

    const invokeGetUserWorkouts = () => {
      getUserWorkouts({
        id: session.user.id,
        name: session.user.name,
      });
    };

    invokeGetUserWorkouts();
  }, [getUserWorkouts, session]);

  return (
    <div className="text-base-content w-full flex flex-col flex-wrap items-start gap-5 md:flex-row">
      {workouts.map((workout) => {
        return <Workout workout={workout} key={v4()} />;
      })}
    </div>
  );
}

export default UserWorkouts;
