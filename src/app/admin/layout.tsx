import { createClient } from '@/utils/supabase/server';
import AdminHeader from './AdminHeader';
import './style.scss';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <div className="admin-layout">
      {session && <AdminHeader user={session.user} />}
      {children}
    </div>
  );
}
