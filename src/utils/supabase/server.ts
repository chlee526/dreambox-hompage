'use server';

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Database } from 'root/types_db';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceRole = process.env.SUPABASE_SERVICE_ROLE;

// 서버 컴포넌트에서 사용할 Supabase 클라이언트 생성
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
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  });
};

// Admin 권한으로 Supabase 클라이언트 생성
export const createAdminClient = async (cookieStore?: Awaited<ReturnType<typeof cookies>>) => {
  return createClient(cookieStore, true);
};

// 인증 여부 확인 함수
export const requireAuth = async () => {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    // 인증되지 않은 경우 /admin/login으로 리디렉션
    redirect('/admin/login');
  }

  return session; // 인증된 경우 세션 반환
};
