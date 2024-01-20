import { supabase } from "./supabase";

export const getWorkout = async (workoutId) => {
  console.log(`getting workout ${workoutId}`);

  const { data: workout, error } = await supabase
    .from("workouts")
    .select(
      `
                id,
                name,
                exercises,
                userCount:users_workouts(count),
                creator:workouts_creatorId_fkey(id, name)
      `
    )
    .eq("id", workoutId)
    .single();

  console.log(workout);
  console.log(error);

  if (workout) {
    console.log(workout);
    return workout;
  } else {
    console.log(error);
  }
};

export const joinWorkout = async (workoutId, userId) => {
  console.log(`joining workout ${workoutId}`);

  const { data: workout, error } = await supabase
    .from("users_workouts")
    .insert({
      workoutId: workoutId,
      userId: userId,
    })
    .select()
    .single();

  console.log(workout);
  console.log(error);

  if (workout) {
    console.log(workout);
    return workout;
  } else {
    console.log(error);
  }
};
