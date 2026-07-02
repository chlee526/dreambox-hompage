import { requireAuth } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function NewPortfolioPage() {
  await requireAuth();
  redirect('/admin');
}
