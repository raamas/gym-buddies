"use client";

import { useState } from "react";
import Exercise from "./Exercise";
import { v4 } from "uuid";
import { useSession } from "next-auth/react";

function ExerciseForm({ workout, setWorkout, setShow }) {
  const [exercise, setExercise] = useState({
    name: "",
    reps: 8,
    sets: 3,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(exercise);

    setWorkout({ ...workout, exercises: [...workout.exercises, exercise] });
    setShow(false);
  };

  return (
    <div>
      <div>
        <label>
          <p className="mb-2">Exercise Name</p>
          <input
            type="text"
            name="name"
            id="exerciseName"
            className="input input-secondary w-full mb-4"
            value={exercise.name}
            onChange={(e) => setExercise({ ...exercise, name: e.target.value })}
          />
        </label>
        <label>
          <p className="mb-2">Rep count</p>
          <input
            type="number"
            name="reps"
            id="exerciseReps"
            className="input input-secondary w-full mb-4"
            value={exercise.reps}
            onChange={(e) => setExercise({ ...exercise, reps: e.target.value })}
          />
        </label>
        <label>
          <p className="mb-2">Set count</p>
          <input
            type="number"
            name="sets"
            id="exerciseSets"
            className="input input-secondary w-full mb-4"
            value={exercise.sets}
            onChange={(e) => setExercise({ ...exercise, sets: e.target.value })}
          />
        </label>
        <button
          type="submit"
          className="btn btn-outline btn-secondary w-full"
          onClick={handleSubmit}
        >
          {" "}
          Add Exercise{" "}
        </button>
      </div>
    </div>
  );
}

function CreateWorkoutForm() {
  const [showExerciseForm, setShowExerciseForm] = useState(false);
  const { data: session } = useSession();
  const { push } = useRouter();
  const [workout, setWorkout] = useState({
    name: "",
    exercises: [],
    isPublic: true,
  });

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      let res = await supabase
        .from("workouts")
        .insert({
          name: workout.name.toLowerCase(),
          exercises: workout.exercises,
        })
        .select()
        .single();

      let workoutId = res.data?.id;

      res = await supabase.from("users_workouts").insert({
        userId: session.user.id,
        workoutId: workoutId,
      });

      push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!session) {
      redirect("/api/auth/signin");
    }
  }, []);

  return (
    <div>
      <form onSubmit={handleCreate} className="flex flex-col flex-center">
        <label>
          <span className="label-text">Workout Name</span>
          <input
            type="text"
            name="name"
            id="workoutName"
            className="input input-primary w-full mb-4"
            value={workout.name}
            onChange={(e) =>
              setWorkout({ ...workout, [e.target.name]: e.target.value })
            }
          />
        </label>
        <div>
          <h2 className="mb-4">Exercises:</h2>
          {workout.exercises?.map((exercise) => {
            return <Exercise exercise={exercise} key={v4()} />;
          })}
        </div>

        {showExerciseForm ? (
          <div className="w-3/4 flex flex-col justify-center mb-4">
            <ExerciseForm
              workout={workout}
              setWorkout={setWorkout}
              setShow={setShowExerciseForm}
            />
          </div>
        ) : (
          <button
            type="submit"
            className="btn btn-primary w-full mb-4"
            onClick={() => setShowExerciseForm(true)}
          >
            add exercise
          </button>
        )}

        <label className="label cursor-pointer mb-4">
          <span className="label-text">Make public</span>
          <input
            type="checkbox"
            value={workout.isPublic}
            onClick={(e) => {
              setWorkout({ ...workout, isPublic: e.target.value });
            }}
            className="checkbox"
          />
        </label>

        <button type="submit" className="btn btn-primary w-full mb-4">
          Create workout
        </button>
      </form>
    </div>
  );
}

export default CreateWorkoutForm;
