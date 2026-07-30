'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

interface Props {
    isActive: boolean;
}

export default function AboutSection({ isActive }: Props) {
    const [animKey, setAnimKey] = useState(0);
    const isFirstMount = useRef(true);

    useEffect(() => {
        if (isFirstMount.current) {
            isFirstMount.current = false;
            return;
        }
        if (isActive) {
            setAnimKey((k) => k + 1);
        }
    }, [isActive]);

    return (
        <section className="about-section">
            <div className="content-wrap" key={animKey}>
                <div className="text-wrap">
                    <h2 className="title">ABOUT DREAMBOX</h2>
                    <p className="desc">
                        30년 경력의 패키지 전문 기업입니다
                        <br />
                        기획부터 납품까지 고객이 원하는 것을 정확하게 반영하여 제작합니다
                        <br />
                        생산 전 구조 샘플을 <strong>무료</strong>로 제공해드리니 직접 확인 후 결정하세요
                    </p>
                </div>

                <div className="process-wrap">
                    <h3 className="sub-title">HOW WE WORK</h3>

                    <div className="process">
                        <span className="no-1">상담 및 가견적</span>
                        <span className="no-2">제품 설계</span>
                        <span className="no-3">샘플 제작 </span>
                        <span className="no-4">컨펌 및 최종견적</span>
                        <span className="no-5">제품 생산</span>
                        <span className="no-6">납품</span>
                    </div>
                </div>

                <div className="info-wrap">
                    <span>*자세한 내용은 FAQ를 확인해주세요</span>
                    <Link href="/faq" className="more-btn">
                        자세히보기
                    </Link>
                </div>
            </div>
        </section>
    );
}
