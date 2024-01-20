import { createClient } from '@supabase/supabase-js'
// console.log(`my key is ${process.env.NEXT_PUBLIC_SUPABASE_KEY}`)
// console.log("coño pelao")

const supabaseUrl = 'https://kvycebmhpaxiqsrkaqxd.supabase.co'

const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY
// console.log(supabaseKey)

export const supabase = createClient(supabaseUrl, supabaseKey)