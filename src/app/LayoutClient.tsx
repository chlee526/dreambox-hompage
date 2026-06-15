'use client';

import { usePathname } from 'next/navigation';
import { Header, Footer } from '@/components/layout';
import PrivacyModal from '@/components/ui/PrivacyModal';

export default function LayoutClient({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAdminRoute = pathname?.startsWith('/admin');

    if (isAdminRoute) {
        // 관리자 페이지는 Header/Footer 없이 렌더링
        return <>{children}</>;
    }

    // 일반 페이지는 Header/Footer와 함께 렌더링
    return (
        <>
            <div className="app-container">
                <Header />
                <main>{children}</main>
                <Footer />
            </div>
            <PrivacyModal />
        </>
    );
}
