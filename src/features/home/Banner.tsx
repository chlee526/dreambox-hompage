'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

interface Props {
    isActive: boolean;
}

export default function Banner({ isActive }: Props) {
    // text-wrap의 key를 변경해 리마운트 → CSS 애니메이션 재실행
    const [animKey, setAnimKey] = useState(0);
    // 첫 마운트 시에는 CSS 애니메이션이 자동 실행되므로 스킵
    const isFirstMount = useRef(true);

    useEffect(() => {
        if (isFirstMount.current) {
            isFirstMount.current = false;
            return;
        }
        // 슬라이더로 다시 배너 섹션에 진입할 때 애니메이션 재실행
        if (isActive) {
            setAnimKey((k) => k + 1);
        }
    }, [isActive]);

    return (
        <section className="home-banner-section">
            <div className="text-wrap" key={animKey}>
                <h1 className="text-1">
                    <strong>패키지</strong>가 <strong>브랜드</strong>가 됩니다
                </h1>
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
