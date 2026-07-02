import { requireAuth } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function AdminPortfolioPage() {
  await requireAuth();
  redirect('/admin');
}
