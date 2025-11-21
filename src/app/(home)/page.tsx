import Banner from './Banner';
import Portfolio from './Portfolio';
import { getPreviewPortfolios } from '@/services/portfolio.service';

// ISR: 1시간마다 재생성
export const revalidate = 3600;

export default async function Home() {
  // 서버에서 미리보기 포트폴리오 데이터 가져오기
  const previewPortfolios = await getPreviewPortfolios();

  return (
    <>
      {/* 메인 배너 */}
      <Banner />
      {/* 포트폴리오 */}
      <Portfolio portfolios={previewPortfolios} />
    </>
  );
}
