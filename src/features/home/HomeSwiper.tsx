'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel } from 'swiper/modules';
import 'swiper/css';

import Banner from './Banner';
import PortfolioSection from './PortfolioSection';
import AboutSection from './AboutSection';
import GuideSection from './GuideSection';

export default function HomeSwiper() {
    return (
        <Swiper
            className="home-swiper"
            direction="vertical"
            modules={[Mousewheel]}
            mousewheel={{ sensitivity: 1 }}
            speed={800}
            allowTouchMove={true}
        >
            <SwiperSlide><Banner /></SwiperSlide>
            <SwiperSlide><PortfolioSection /></SwiperSlide>
            <SwiperSlide><AboutSection /></SwiperSlide>
            <SwiperSlide><GuideSection /></SwiperSlide>
        </Swiper>
    );
}
