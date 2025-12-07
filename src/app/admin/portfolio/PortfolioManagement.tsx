'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PortfolioType } from '@/types/portfolio';

interface PortfolioManagementProps {
  initialPortfolios: PortfolioType[];
}

export default function PortfolioManagement({ initialPortfolios }: PortfolioManagementProps) {
  const [portfolios, setPortfolios] = useState<PortfolioType[]>(initialPortfolios);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async (seq: number) => {
    if (!confirm('정말 이 포트폴리오를 삭제하시겠습니까?')) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/admin/portfolio/${seq}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('삭제에 실패했습니다.');
      }

      // 목록에서 제거
      setPortfolios((prev) => prev.filter((p) => p.seq !== seq));
      alert('포트폴리오가 삭제되었습니다.');
    } catch (error) {
      console.error('삭제 오류:', error);
      alert('포트폴리오 삭제에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (seq: number) => {
    router.push(`/admin/portfolio/${seq}/edit`);
  };

  const handleCreate = () => {
    router.push('/admin/portfolio/new');
  };

  return (
    <div className="portfolio-management">
      <div className="portfolio-management__header">
        <h1 className="portfolio-management__title">포트폴리오 관리</h1>
        <button onClick={handleCreate} className="portfolio-management__btn-create">
          + 새 포트폴리오 추가
        </button>
      </div>

      <div className="portfolio-management__container">
        {portfolios.length === 0 ? (
          <div className="portfolio-management__empty">
            <p>등록된 포트폴리오가 없습니다.</p>
            <button onClick={handleCreate} className="portfolio-management__btn-create">
              첫 포트폴리오 만들기
            </button>
          </div>
        ) : (
          <div className="portfolio-management__grid">
            {portfolios.map((portfolio) => (
              <div key={portfolio.seq} className="portfolio-card">
                <div className="portfolio-card__image">
                  {portfolio.thumbnail ? (
                    <img src={portfolio.thumbnail} alt={portfolio.name} />
                  ) : (
                    <div className="portfolio-card__no-image">이미지 없음</div>
                  )}
                </div>
                <div className="portfolio-card__content">
                  <h3 className="portfolio-card__name">{portfolio.name}</h3>
                  <p className="portfolio-card__category">{portfolio.category}</p>
                  <p className="portfolio-card__description">{portfolio.description || '설명 없음'}</p>
                  <div className="portfolio-card__meta">
                    <span className={`portfolio-card__badge ${portfolio.isPreview ? 'active' : ''}`}>
                      {portfolio.isPreview ? '미리보기 노출' : '미리보기 숨김'}
                    </span>
                    <span className="portfolio-card__seq">ID: {portfolio.seq}</span>
                  </div>
                </div>
                <div className="portfolio-card__actions">
                  <button onClick={() => handleEdit(portfolio.seq)} className="portfolio-card__btn portfolio-card__btn--edit" disabled={loading}>
                    수정
                  </button>
                  <button onClick={() => handleDelete(portfolio.seq)} className="portfolio-card__btn portfolio-card__btn--delete" disabled={loading}>
                    삭제
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

