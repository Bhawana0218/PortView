import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://bmsomorkmnkwrgwrphke.supabase.co';
const supabaseAnonKey =  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJtc29tb3JrbW5rd3Jnd3JwaGtlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgxMjY0OTUsImV4cCI6MjA3MzcwMjQ5NX0.YpG5lYeGq_Dod0-y_pwdyQ_umHAVw8DaUmdOm_Ji2-w"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)