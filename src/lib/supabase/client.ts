'use client';

import { createBrowserClient } from '@supabase/ssr';
import { Database } from '@/types/database';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const createBrowserSupabaseClient = () => createBrowserClient<Database>(url!, anonKey!);
