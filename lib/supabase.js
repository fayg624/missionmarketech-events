import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://bbllqljkoszqhmbnhsxw.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJibGxxbGprb3N6cWhtYm5oc3h3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMxNzAwNjMsImV4cCI6MjA4ODc0NjA2M30.57-SM2KGIqp7H8yl619m75piCouqIOXXoLSbfHke3Hs'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
