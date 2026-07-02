import { requireAuth } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function EditPortfolioPage() {
  await requireAuth();
  redirect('/admin');
}
