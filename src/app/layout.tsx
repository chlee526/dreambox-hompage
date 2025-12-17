import type { Metadata } from 'next';

import ReactQueryClientProvider from 'root/src/app/_provider/ReactQueryClientProvider';
import LayoutClient from './LayoutClient';
import './styles/main.scss';

export const metadata: Metadata = {
  title: {
    default: '드림박스 | Dream Box',
    template: '%s | Dream Box',
  },
  description: '소량 맞춤 박스 제작 전문 업체 Dream Box입니다. 1개부터 제작 가능한 맞춤형 패키지, 빠른 납기, 합리적인 가격으로 고객의 특별한 포장 솔루션을 제공합니다.',
  keywords: ['박스 제작', '소량 박스 제작', '맞춤 박스', '패키지 제작', '포장 박스', '맞춤 포장', '소량 패키지', '주문 제작 박스', '드림박스', 'Dream Box', 'DREAM BOX', 'DreamBox'],
  authors: [{ name: 'Dream Box' }],
  creator: 'Dream Box',
  publisher: 'Dream Box',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.dreambox.kr'), // 실제 도메인으로 변경 필요
  openGraph: {
    title: 'Dream Box | 소량 맞춤 박스 제작 전문',
    description: '1개부터 제작 가능한 맞춤형 박스 패키지. 빠른 납기와 합리적인 가격으로 고객의 특별한 포장 솔루션을 제공합니다.',
    url: 'https://www.dreambox.kr',
    siteName: 'Dream Box',
    locale: 'ko_KR',
    type: 'website',
    images: [
      {
        url: '/assets/image/og_img.png',
        width: 1200,
        height: 630,
        alt: 'Dream Box - 소량 맞춤 박스 제작 전문',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dream Box | 소량 맞춤 박스 제작 전문',
    description: '1개부터 제작 가능한 맞춤형 박스 패키지. 빠른 납기와 합리적인 가격으로 특별한 포장 솔루션을 제공합니다.',
    images: ['/assets/image/og_img.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'APLzo29RwuHS0VcWpgNV_ASjcTvCXUCE3n8h64c_eJ4', // Google Search Console 인증 코드
    other: {
      'naver-site-verification': '0ef9e6c69a9dd9f986a51d3df42bc0d7d443b7cd', // 네이버 웹마스터 인증 코드
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body suppressHydrationWarning>
        <ReactQueryClientProvider>
          <LayoutClient>{children}</LayoutClient>
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
