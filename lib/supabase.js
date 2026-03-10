import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://bbllqljkoszqhmbnhsxw.supabase.co'
const supabaseAnonKey = 'sb_publishable_Ye1UWnUX_rv8llsAKmURPQ_xCBemmEh'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
