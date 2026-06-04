'use client';

import Link from 'next/link';

export default function Banner() {
    return (
        <section className="home-banner-section">
            <div className="text-wrap">
                <p className="text-1">
                    <strong>패키지</strong>가 <strong>브랜드</strong>가 됩니다
                </p>
                <p className="text-2">
                    소량 맞춤형부터 대량 생산까지 <br />
                    제품에 맞는 패키지를 제안합니다
                </p>
                <strong className="text-3">DREAMBOX</strong>
                <div className="link-button">
                    <Link href="/portfolio">포트폴리오</Link>
                </div>
            </div>
            <div className="scroll-indicator" />
        </section>
    );
}
