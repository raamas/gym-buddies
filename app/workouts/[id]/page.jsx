"use client";
import Exercise from "@components/Exercise";
import { joinWorkout, getWorkout } from "@utils/functions";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

function WorkoutPage({ params }) {
  const { data: session } = useSession();
  const [workout, setWorkout] = useState({});

const handleClick = (e)=>{
  joinWorkout(workout.id, session.user?.id)
  e.target.disabled = true
  e.target.value = 'Your are in this workout!!'
}

  useEffect(() => {
    const invokeGetWorkout = async () => {
      let data = await getWorkout(params.id);
      console.log(data);
      setWorkout(data);
    };

    invokeGetWorkout();
  }, []);

  return (
    <main className="min-h-100vh flex flex-col items-center bg-base-100 text-base-content">
      <section className="flex flex-col max-w-xl justify-center p-8 ">
        <h2 className="text-3xl text-secondary font-semibold mb-4">
          {workout.name}
        </h2>
        <p className="">Creator: {workout.creator?.name}</p>
        {console.log(workout.userCount)}
        <p className="mb-4">No. Member: {workout.userCount?.[0].count}</p>
        <div className="flex flex-col justify-center">
          {workout?.exercises?.map((exercise, index) => {
            return (
              <div key={index} className="card card-bordered border-base-200 backdrop-blur-sm px-4 py-2 mb-2 shadow-sm">
                {" "}
                <Exercise  exercise={exercise} />
              </div>
            );
          })}
        </div>
        <button
          className="btn btn-secondary w-full"
          onClick={() => handleClick(e)}
          disabled={ (session && session.user.id == workout.creator?.id) }
        >
          Join Workout
        </button>
      </section>
    </main>
  );
}

export default WorkoutPage;
