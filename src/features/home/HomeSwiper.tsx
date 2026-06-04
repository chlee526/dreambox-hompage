'use client';

import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel } from 'swiper/modules';
import 'swiper/css';

import Banner from './Banner';
import PortfolioSection from './PortfolioSection';
import AboutSection from './AboutSection';
import GuideSection from './GuideSection';

export default function HomeSwiper() {
    // 현재 활성 슬라이드 인덱스 (0: Banner, 1: Portfolio, 2: About, 3: Guide)
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <Swiper
            className="home-swiper"
            direction="vertical"
            modules={[Mousewheel]}
            mousewheel={{ sensitivity: 1 }}
            speed={800}
            allowTouchMove={true}
            // 슬라이드 이동 시 swiper 인스턴스에서 현재 인덱스를 읽어 state 업데이트
            // → activeIndex === 0 이면 Banner의 isActive=true가 되어 애니메이션 재실행
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        >
            <SwiperSlide>
                <Banner isActive={activeIndex === 0} />
            </SwiperSlide>
            <SwiperSlide>
                <PortfolioSection />
            </SwiperSlide>
            <SwiperSlide>
                <AboutSection />
            </SwiperSlide>
            <SwiperSlide>
                <GuideSection />
            </SwiperSlide>
        </Swiper>
    );
}
