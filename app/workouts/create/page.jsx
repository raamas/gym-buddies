import CreateWorkoutForm from "@components/CreateWorkout/CreateWorkoutForm.jsx";

function WorkoutCreate() {
  return (
    <main className="min-h-100vh flex flex-col justify-center bg-base-100">
      <section className="flex flex-col max-w-md items-center p-8 bg-base-100">
        <h2 className="font-semibold text-base-content mb-4">Create Workout</h2>

        <div className="text-base-content">
          <CreateWorkoutForm />
        </div>
      </section>
    </main>
  );
}

export default WorkoutCreate;
