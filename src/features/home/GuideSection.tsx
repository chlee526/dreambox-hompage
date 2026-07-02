'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

interface Props {
    isActive: boolean;
}

export default function GuideSection({ isActive }: Props) {
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
        <section className="guide-section">
            <div className="lc" key={animKey}>
                <div className="image-wrap">
                    <img src={'/assets/image/home/guide-banner.png'} alt="guide-banner" />
                </div>
            </div>
            <div className="rc">
                <div className="text-wrap" key={animKey}>
                    <strong className="title">PACKAGING GUIDE</strong>
                    <p className="desc">어떤 제품이든, 어떤 형태든 원하는 패키지를 만들어드립니다</p>
                    <button className="more-btn">
                        <Link href="/guide">MORE</Link>
                    </button>
                </div>
            </div>
        </section>
    );
}
