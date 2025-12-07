'use client';

import { usePathname } from 'next/navigation';
import { Header, Footer } from '@/components/layout';
import { ContactModal } from '@/components/ui';

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
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <ContactModal />
    </>
  );
}
