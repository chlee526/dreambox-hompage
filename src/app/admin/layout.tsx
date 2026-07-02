import { createClient } from '@/lib/supabase/server';
import AdminHeader from '@/features/admin/AdminHeader';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <div className="admin-layout">
      {session && <AdminHeader user={session.user} />}
      <div className="admin-main">
        <div className="wrap">{children}</div>
      </div>
    </div>
  );
}
