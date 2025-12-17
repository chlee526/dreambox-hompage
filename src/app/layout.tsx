import type { Metadata } from 'next';

import ReactQueryClientProvider from 'root/src/app/_provider/ReactQueryClientProvider';
import LayoutClient from './LayoutClient';
import './styles/main.scss';

export const metadata: Metadata = {
  title: {
    default: '드림박스 | Dream Box',
    template: '%s | Dream Box',
  },
  description: '드림박스는 맞춤 패키지 샘플 제작을 기반으로 새로운 형태의 박스를 제작합니다.\n샘플 컨펌 후 생산 연계와 납기 관리를 통해 소량 제작이 가능합니다.',
  keywords: ['맞춤 박스 제작', '소량 박스 제작', '패키지 샘플 제작', '박스 샘플', '새로운 형태의 박스', '맞춤 패키지', '소량 패키지 제작', '종이 박스 제작', '드림박스', 'Dream Box', 'DreamBox', '사바리박스', '싸바리박스', '쇼핑백'],
  authors: [{ name: 'DreamBox' }],
  creator: 'Dream Box',
  publisher: 'Dream Box',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.dreambox.kr'),
  openGraph: {
    title: '드림박스 | 맞춤 패키지 샘플·소량 제작 전문',
    description: '새로운 형태의 패키지를 직접 제작해 샘플로 확인할 수 있습니다. 컨펌 후 생산과 납기까지 관리하여 소량 제작이 가능합니다.',
    url: 'https://www.dreambox.kr',
    siteName: 'DreamBox',
    locale: 'ko_KR',
    type: 'website',
    images: [
      {
        url: '/assets/image/dreambox_og.png',
        width: 1200,
        height: 630,
        alt: 'Dream Box - 소량 맞춤 박스 제작 전문',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '드림박스 | 맞춤 패키지 샘플·소량 제작 전문',
    description: '새로운 형태의 패키지를 직접 제작해 샘플로 확인할 수 있습니다. 컨펌 후 생산과 납기까지 관리하여 소량 제작이 가능합니다.',
    images: ['/assets/image/dreambox_og.png'],
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
