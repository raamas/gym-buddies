"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Link from "next/link";
import { v4 } from "uuid";
import Workout from "@components/Workout.jsx";
import { useWorkoutsStore } from "@utils/stores";
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@app/api/auth/[...nextauth]/route.js"


async function Dashboard() {
  const { data: session } = useSession();
  const serverSession = await getServerSession(authOptions)
  let workouts = useWorkoutsStore((state) => state.workoutsState);
  const getUserWorkouts = useWorkoutsStore((state) => state.getUserWorkouts);

  if(!serverSession || !serverSession.user){
    redirect("/api/auth/signin")
  }
  
  useEffect(() => {
    const invokeGetUserWorkouts = () => {
      getUserWorkouts({
        id: session.user.id,
        name: session.user.name,
      });
    };

    invokeGetUserWorkouts();
  }, []);

  return (
    <main className="min-h-100vh flex flex-col justify-center">
      <section className="shared_workouts max-w-md">
        <h2 className="font-semibold text-base-content mb-4">
          Your shared workouts
        </h2>
        <div className="text-base-content">
          {workouts.map((workout) => {
            return <Workout workout={workout} key={v4()} />;
          })}
        </div>

        <Link href="/workouts/create" className="btn btn-primary w-full">
          Create a new workout
        </Link>
      </section>
    </main>
  );
}

export default Dashboard;
