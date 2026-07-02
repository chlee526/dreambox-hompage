'use client';

import { useRouter } from 'next/navigation';
import './dashboard.scss';

export default function AdminDashboard() {
    const router = useRouter();

    return (
        <div className="admin-dashboard">
            <div className="wrap">
                {/* <div className="dashboard-card" onClick={() => router.push('/admin/portfolio')}>
                    <div>
                        <span className="icon">🖼️</span>
                        <strong className="title">포트폴리오 관리</strong>
                    </div>
                    <p className="desc">포트폴리오 추가/수정/삭제</p>
                </div> */}
                <div className="dashboard-card" onClick={() => router.push('/admin/contact')}>
                    <div>
                        <span className="icon">💻</span>
                        <strong className="title"> 견적문의 관리</strong>
                    </div>
                    <p className="desc">견적문의</p>
                </div>
            </div>
        </div>
    );
}
