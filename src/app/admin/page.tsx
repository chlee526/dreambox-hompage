import { requireAuth } from '@/lib/supabase/server';
import AdminDashboard from '@/features/admin/AdminDashboard';

export default async function AdminPage() {
  // 인증 체크 - 로그인하지 않은 경우 /admin/login으로 리다이렉트
  await requireAuth();

  return <AdminDashboard />;
}
