import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://prvvkyzzxvvkeimesipp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBydnZreXp6eHZ2a2VpbWVzaXBwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ4OTcwOTcsImV4cCI6MjA4MDQ3MzA5N30.M36kvsq_4n49emvNdPhXZlcRFHYsuG7zs_4A-rI7W7I';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);