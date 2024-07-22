import { supabase } from "./supabase";

export const getWorkout = async (workoutId) => {

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


  if (workout) {
    return workout;
  } else {
    console.log(error);
  }
};

export const joinWorkout = async (workoutId, userId) => {

  const { data: workout, error } = await supabase
    .from("users_workouts")
    .insert({
      workoutId: workoutId,
      userId: userId,
    })
    .select()
    .single();


  if (workout) {
    return workout;
  } else {
    console.log(error);
  }
};

export const deleteExercise = (exercises, exercise)=>{
  let newExercises = exercises.filter((e)=>{
    return e.name != exercise
  })

  return newExercises
}
