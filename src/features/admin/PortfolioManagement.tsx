'use client';

import { useRouter } from 'next/navigation';
import { PortfolioType } from '@/types/portfolio';
import { useDeletePortfolio } from '@/hooks/queries/usePortfolios';
import './portfolio.scss';

interface PortfolioManagementProps {
  initialPortfolios: PortfolioType[];
}

export default function PortfolioManagement({ initialPortfolios }: PortfolioManagementProps) {
  const router = useRouter();

  const { mutateAsync: deletePortfolio, isPending: isDeleting } = useDeletePortfolio({
    onSuccess: () => {
      alert('포트폴리오가 삭제되었습니다.');
      router.refresh();
    },
    onError: (error) => {
      console.error('삭제 오류:', error);
      alert('포트폴리오 삭제에 실패했습니다.');
    },
  });

  const handleDelete = async (seq: number) => {
    if (!confirm('정말 이 포트폴리오를 삭제하시겠습니까?')) return;
    await deletePortfolio(seq);
  };

  return (
    <div className="portfolio-management">
      <div className="header">
        <h1 className="is-title">포트폴리오 관리</h1>
        <button onClick={() => router.push('/admin/portfolio/new')} className="add-portfolio-btn" disabled={isDeleting}>
          + 새 포트폴리오 추가
        </button>
      </div>

      <div className="container">
        {initialPortfolios.length === 0 ? (
          <div className="empty">
            <p>등록된 포트폴리오가 없습니다.</p>
            <button onClick={() => router.push('/admin/portfolio/new')} className="add-portfolio-btn">
              첫 포트폴리오 만들기
            </button>
          </div>
        ) : (
          <div className="portfolio-wrapper">
            {initialPortfolios.map((portfolio) => (
              <div key={portfolio.seq} className="portfolio-card">
                <div className="portfolio-card__image">
                  {portfolio.thumbnail ? <img src={portfolio.thumbnail} alt={portfolio.name} /> : <div className="portfolio-card__no-image">이미지 없음</div>}
                </div>
                <div className="portfolio-card__content">
                  <h3 className="name">{portfolio.name}</h3>
                  <div className="badges">
                    <span className="badge category">{portfolio.category}</span>
                    {portfolio.isPreview && <span className="badge preview">메인</span>}
                    <span className="badge seq">ID: {portfolio.seq}</span>
                  </div>
                </div>
                <div className="portfolio-card__actions">
                  <button onClick={() => router.push(`/admin/portfolio/${portfolio.seq}/edit`)} className="action-btn is-edit" disabled={isDeleting}>
                    수정
                  </button>
                  <button onClick={() => handleDelete(portfolio.seq)} className="action-btn is-delete" disabled={isDeleting}>
                    {isDeleting ? '삭제 중...' : '삭제'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
