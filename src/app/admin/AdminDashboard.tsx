'use client';

import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-dashboard__grid">
        <div className="admin-dashboard__card" onClick={() => handleNavigate('/admin/portfolio')}>
          <div className="admin-dashboard__card-icon">🖼️</div>
          <h3 className="admin-dashboard__card-title">포트폴리오 관리</h3>
          <p className="admin-dashboard__card-desc">포트폴리오 추가/수정/삭제</p>
        </div>
      </div>
    </div>
  );
}
