import { requireAuth } from '@/utils/supabase/server';
import { getPortfolios } from '@/lib/services/portfolio';
import PortfolioManagement from '../_components/portfolio/PortfolioManagement';

export default async function AdminPortfolioPage() {
  // 인증 체크
  await requireAuth();

  // 포트폴리오 목록 조회
  const portfolios = await getPortfolios();

  return <PortfolioManagement initialPortfolios={portfolios} />;
}
