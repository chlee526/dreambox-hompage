'use server';

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Database } from '@/types/database';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceRole = process.env.SUPABASE_SERVICE_ROLE;

export const createClient = async (cookieStore?: Awaited<ReturnType<typeof cookies>>, admin: boolean = false) => {
  const resolvedCookieStore = cookieStore || (await cookies());

  return createServerClient<Database>(url!, admin ? serviceRole! : anonKey!, {
    cookies: {
      getAll() {
        return resolvedCookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => resolvedCookieStore.set(name, value, options));
        } catch {
          // Called from a Server Component — session refresh middleware handles this.
        }
      },
    },
  });
};

export const createAdminClient = async (cookieStore?: Awaited<ReturnType<typeof cookies>>) => {
  return createClient(cookieStore, true);
};

export const requireAuth = async () => {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/admin/login');
  }

  return session;
};
