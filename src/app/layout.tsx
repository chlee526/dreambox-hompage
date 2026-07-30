import type { Metadata } from 'next';

import ReactQueryClientProvider from '@/app/_provider/ReactQueryClientProvider';
import LayoutClient from './LayoutClient';
import { SITE_URL } from '@/lib/site';
import '@/styles/main.scss';

export const metadata: Metadata = {
  title: {
    default: '드림박스 | DreamBox',
    template: '%s | 드림박스',
  },
  description: '드림박스는 맞춤 패키지 샘플 제작을 기반으로 새로운 형태의 박스를 제작합니다.\n샘플 컨펌 후 생산 연계와 납기 관리를 통해 소량 제작이 가능합니다.',
  // 파비콘 설정 추가
  icons: {
    icon: [
      { url: '/assets/image/favicon/favicon.ico', sizes: 'any' },
      { url: '/assets/image/favicon/icon_32.png', type: 'image/png', sizes: '32x32' },
      { url: '/assets/image/favicon/icon_192.png', type: 'image/png', sizes: '192x192' },
      { url: '/assets/image/favicon/icon_512.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [{ url: '/assets/image/favicon/apple-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  keywords: ['맞춤 박스 제작', '소량 박스 제작', '패키지 샘플 제작', '박스 샘플', '구조 샘플 무료', '샘플 무료', '새로운 형태의 박스', '맞춤 패키지', '소량 패키지 제작', '종이 박스 제작', '드림박스', 'DreamBox', '사바리박스', '싸바리박스', '쇼핑백', '시딩박스', '단상자', '인쇄물 제작', '커스텀박스', '베이커리박스', '약상자', '답례품포장', '화장품박스', '크라프트상자', '패키지 제작 전문업체'],
  authors: [{ name: '드림박스 | DreamBox' }],
  creator: '드림박스 | DreamBox',
  publisher: '드림박스 | DreamBox',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: '싸바리박스 단상자 시딩박스 베이커리박스 약상자 크라프트상자 답례품포장 맞춤패키지 맞춤박스 제작 전문업체 드림박스 | 구조 샘플 무료',
    description: '구조 샘플 무료. 싸바리박스 단상자 베이커리박스 약상자 크라프트상자 답례품포장 맞춤패키지 맞춤박스 제작 전문 업체 드림박스입니다. 무료 샘플 컨펌 후 소량 제작 가능합니다.',
    url: SITE_URL,
    siteName: '드림박스 | DreamBox',
    locale: 'ko_KR',
    type: 'website',
    images: [
      {
        url: '/assets/image/og.png',
        width: 1200,
        height: 630,
        alt: '드림박스 | DreamBox',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '싸바리박스 단상자 시딩박스 베이커리박스 약상자 크라프트상자 답례품포장 맞춤패키지 맞춤박스 제작 전문업체 드림박스 | 구조 샘플 무료',
    description: '구조 샘플 무료. 싸바리박스 단상자 베이커리박스 약상자 크라프트상자 답례품포장 맞춤패키지 맞춤박스 제작 전문 업체 드림박스입니다. 무료 샘플 컨펌 후 소량 제작 가능합니다.',
    images: ['/assets/image/og.png'],
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
      'naver-site-verification': ['0ef9e6c69a9dd9f986a51d3df42bc0d7d443b7cd', '628191e58308b482e2e4f9c6ca549dd521f1ce35'], // 네이버 웹마스터 인증 코드
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      name: '드림박스',
      alternateName: 'DreamBox',
      url: SITE_URL,
      logo: `${SITE_URL}/assets/image/home/logo.svg`,
    },
    {
      '@type': 'WebSite',
      name: '드림박스',
      alternateName: 'DreamBox',
      url: SITE_URL,
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body suppressHydrationWarning>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <ReactQueryClientProvider>
          <LayoutClient>{children}</LayoutClient>
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
