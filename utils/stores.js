import { create } from 'zustand'
import { supabase } from './supabase'

export const useWorkoutsStore = create((set) => ({
    workoutsState: [],
    getUserWorkouts: async (user) => {
        let { data: workouts, error } = await supabase.from('workouts')
            .select(`
            id,
            name,
            exercises,
            users!users_workouts(id,name)
        `)
        
        if (workouts) {
            workouts = workouts.filter((workout) => workout.users.some(u => u.id = user.id))
            
            set(state => ({
                ...state,
                workoutsState: workouts
            }))
        } else {
            console.log(error)
        }
    },
    getAllWorkouts: async (user) => {
        let { data: workouts, error } = await supabase.from('workouts')
            .select(`
            id,
            name,
            exercises,
            users!users_workouts(count)
        `)
        
        if (workouts) {

            set(state => ({
                ...state,
                workoutsState: workouts
            }))
        } else {
            console.log(error)
        }
    },
}))
