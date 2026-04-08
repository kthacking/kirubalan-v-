import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ppimjedtipxouzohfrmv.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwaW1qZWR0aXB4b3V6b2hmcm12Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU2MzYxMzIsImV4cCI6MjA5MTIxMjEzMn0.4wIVbvpeZT_rNAiKiBsMkFgDWjQVXat6py0Y7rhSD-k';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
