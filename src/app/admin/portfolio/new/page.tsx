import { requireAuth } from '@/utils/supabase/server';
import PortfolioForm from '../PortfolioForm';
import '../style.scss';

export default async function NewPortfolioPage() {
  // 인증 체크
  await requireAuth();

  return (
    <div className="portfolio-form-page">
      <div className="portfolio-form-page__container">
        <PortfolioForm mode="create" />
      </div>
    </div>
  );
}
