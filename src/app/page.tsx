'use client';
/** @jsxImportSource @emotion/react */

import { MainBannerStyles } from './styles';

export default function Home() {
    return (
        <>
            <section css={MainBannerStyles}>
                <div className="word-wrap">
                    <p className="text-xlg">
                        당신의 브랜드를
                        <br />
                        담는 첫 번째 순간
                        <br /> DREAM BOX
                    </p>

                    <p className="text-lg">
                        필요한 만큼, 원하는 방식으로
                        <br /> 소량 맞춤 제작으로 브랜드 감성을 완성합니다.
                    </p>
                </div>

                <div className="cta-wrap">
                    <button className="inquiry-btn">
                        <span>상담 및 견적 문의</span>
                    </button>
                    <button className="portfolio-btn">
                        <span>포트폴리오 보기</span>
                    </button>
                </div>
            </section>
        </>
    );
}
