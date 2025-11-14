/**
 *  브라우저 환경에서 Supabase 클라이언트를 생성하기 위한 함수
 *  createBrowserSupabaseClient(): 브라우저에서 사용할 Supabase 클라이언트를 생성하는 함수
 */

'use client';

import { createBrowserClient } from '@supabase/ssr';
import { Database } from 'root/types_db';

/**
 * process.env.NEXT_PUBLIC_SUPABASE_URL! -> 이 url이 null이 아님을 보장
 * process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! -> 이 anon key가 null이 아님을 보장
 */

// 내 supabase 프로젝트랑 연관된 이 api를 통해서 anon key를 통해서 브라우저 클라이언트가 하나 자동으로 생성이 된다.
export const createBrowserSupabaseClient = () => createBrowserClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
