import { requireAuth } from '@/lib/supabase/server';
import PortfolioForm from '@/features/admin/PortfolioForm';

export default async function NewPortfolioPage() {
  // 인증 체크
  await requireAuth();

  return (
    <div className="container" style={{ margin: '0 auto' }}>
      <h3 className="is-title">포트폴리오 생성</h3>
      <PortfolioForm mode="create" />
    </div>
  );
}
