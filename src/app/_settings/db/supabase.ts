import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from 'root/types_db';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = SupabaseClient<Database>;
