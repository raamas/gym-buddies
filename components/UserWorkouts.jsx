"use client"
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Workout from "@components/Workout.jsx";
import { useWorkoutsStore } from "@utils/stores";
import { v4 } from "uuid";

function UserWorkouts(){
  const { data: session } = useSession();
  let workouts = useWorkoutsStore((state) => state.workoutsState);
  const getUserWorkouts = useWorkoutsStore((state) => state.getUserWorkouts);


  useEffect(() => {
    const invokeGetUserWorkouts = () => {
      getUserWorkouts({
        id: session.user.id,
        name: session.user.name,
      });
    };

    invokeGetUserWorkouts();
  }, []);

return(
  <div className="text-base-content">
          {workouts.map((workout) => {
            return <Workout workout={workout} key={v4()} />;
          })}
        </div>
)
}
