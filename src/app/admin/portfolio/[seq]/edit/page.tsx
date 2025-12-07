import { requireAuth } from '@/utils/supabase/server';
import { getPortfolio } from '@/lib/services/portfolio';
import { notFound } from 'next/navigation';
import PortfolioForm from '../../PortfolioForm';
import '../../style.scss';

interface EditPortfolioPageProps {
  params: Promise<{ seq: string }>;
}

export default async function EditPortfolioPage({ params }: EditPortfolioPageProps) {
  // 인증 체크
  await requireAuth();

  const { seq } = await params;
  const id = Number(seq);

  // 포트폴리오 데이터 조회
  const portfolio = await getPortfolio(id);

  if (!portfolio) {
    notFound();
  }

  return (
    <div className="portfolio-form-page">
      <div className="portfolio-form-page__container">
        <h1 className="portfolio-form-page__title">포트폴리오 수정</h1>
        <PortfolioForm mode="edit" portfolio={portfolio} />
      </div>
    </div>
  );
}

