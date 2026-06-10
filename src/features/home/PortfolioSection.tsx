'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

interface Props {
    isActive: boolean;
}

export default function PortfolioSection({ isActive }: Props) {
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

    const prevRef = useRef<HTMLButtonElement>(null);
    const nextRef = useRef<HTMLButtonElement>(null);

    return (
        <section className="portfolio-section">
            <div className="lc">
                <div className="text-wrap" key={animKey}>
                    <strong className="title">PORTFOLIO</strong>
                    <p className="desc">어떤 제품이든, 어떤 형태든 원하는 패키지를 만들어드립니다</p>
                    <button className="more-btn">
                        <Link href="/portfolio">MORE</Link>
                    </button>
                </div>
            </div>
            <div className="rc">
                <div className="image-wrap" key={animKey}>
                    <Swiper
                        className="portfolio-swiper"
                        modules={[Navigation, Pagination, Autoplay, EffectFade]}
                        effect="fade"
                        navigation={{
                            prevEl: prevRef.current,
                            nextEl: nextRef.current,
                        }}
                        onBeforeInit={(swiper) => {
                            if (typeof swiper.params.navigation !== 'boolean') {
                                swiper.params.navigation!.prevEl = prevRef.current;
                                swiper.params.navigation!.nextEl = nextRef.current;
                            }
                        }}
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 3000, disableOnInteraction: false }}
                        loop={true}
                    >
                        <SwiperSlide>
                            <ul className="image-list">
                                <li className="image-list-item">
                                    <img src="/assets/image/portfolio/slide1-item1.png" alt="포트폴리오 이미지 1" />
                                </li>
                                <li className="image-list-item">
                                    <img src="/assets/image/portfolio/slide1-item2.png" alt="포트폴리오 이미지 2" />
                                </li>
                                <li className="image-list-item">
                                    <img src="/assets/image/portfolio/slide1-item3.png" alt="포트폴리오 이미지 3" />
                                </li>
                                <li className="image-list-item">
                                    <img src="/assets/image/portfolio/slide1-item4.png" alt="포트폴리오 이미지 4" />
                                </li>
                            </ul>
                        </SwiperSlide>
                        <SwiperSlide>
                            <ul className="image-list">
                                <li className="image-list-item">
                                    <img src="/assets/image/portfolio/sample1.jpg" alt="포트폴리오 이미지 1" />
                                </li>
                                <li className="image-list-item">
                                    <img src="/assets/image/portfolio/sample2.jpg" alt="포트폴리오 이미지 2" />
                                </li>
                                <li className="image-list-item">
                                    <img src="/assets/image/portfolio/sample3.jpg" alt="포트폴리오 이미지 3" />
                                </li>
                                <li className="image-list-item">
                                    <img src="/assets/image/portfolio/sample4.jpg" alt="포트폴리오 이미지 4" />
                                </li>
                            </ul>
                        </SwiperSlide>
                    </Swiper>
                    <button ref={prevRef} className="portfolio-nav-btn portfolio-nav-btn--prev">
                        <img src="/assets/image/chevron-left.svg" alt="이전" />
                    </button>
                    <button ref={nextRef} className="portfolio-nav-btn portfolio-nav-btn--next">
                        <img src="/assets/image/chevron-right.svg" alt="다음" />
                    </button>
                </div>
            </div>
        </section>
    );
}
