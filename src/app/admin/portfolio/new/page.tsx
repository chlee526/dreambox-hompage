import { requireAuth } from '@/utils/supabase/server';
import PortfolioForm from '../../_components/portfolio/PortfolioForm';

export default async function NewPortfolioPage() {
  // 인증 체크
  await requireAuth();

  return (
    <div className="container">
      <h3 className="is-title">포트폴리오 생성</h3>
      <PortfolioForm mode="create" />
    </div>
  );
}
