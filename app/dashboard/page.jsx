
import Link from "next/link";
import UserWorkouts from "@components/UserWorkouts.jsx"

function Dashboard() {

  return (
    <main className="min-h-100vh flex flex-col justify-center">
      <section className="shared_workouts max-w-md">
        <h2 className="font-semibold text-base-content mb-4">
          Your shared workouts
        </h2>
        <UserWorkouts />

        <Link href="/workouts/create" className="btn btn-primary w-full">
          Create a new workout
        </Link>
      </section>
    </main>
  );
}

export default Dashboard;
