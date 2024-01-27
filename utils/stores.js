import { create } from "zustand";
import { supabase } from "./supabase";

export const useWorkoutsStore = create((set) => ({
  workoutsState: [],
  getUserWorkouts: async (user) => {
    let { data: workouts, error } = await supabase.from("workouts").select(`
            id,
            name,
            isPublic,
            exercises,
            users!users_workouts(id,name)
        `);

    if (workouts) {
      workouts = workouts.filter((workout) =>
        workout.users.find((u) => (u.id == user.id))
      );

      set((state) => ({
        ...state,
        workoutsState: workouts,
      }));
    } else {
      console.log(error);
    }
  },
  getPopularWorkouts: async () => {
    let { data: workouts, error } = await supabase
      .from("workouts")
      .select(
        `
            id,
            isPublic,
            name,
            exercises,
            userCount:users_workouts(count)
        `
      )
      .eq("isPublic", true)
      .limit(50);

    if (workouts) {
      workouts = workouts.sort();

      console.log(workouts);
      set((state) => ({
        ...state,
        workoutsState: workouts,
      }));
    } else {
      console.log(error);
    }
  },
}));
