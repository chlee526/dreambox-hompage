'use client';

import { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';

import Banner from './Banner';
import PortfolioSection from './PortfolioSection';
import AboutSection from './AboutSection';
// import GuideSection from './GuideSection';

function setPageScroll(enabled: boolean) {
    const val = enabled ? 'auto' : 'hidden';
    document.documentElement.style.overflow = val;
    document.body.style.overflow = val;
}

// body가 스크롤 컨테이너일 때 window.scrollY는 항상 0 → body.scrollTop을 함께 확인
function getScrollTop(): number {
    return document.documentElement.scrollTop + document.body.scrollTop;
}

function resetScrollTop(): void {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
}

export default function HomeSwiper() {
    const [activeIndex, setActiveIndex] = useState(0);
    const swiperRef = useRef<SwiperType | null>(null);
    const isFooterMode = useRef(false);
    const canScroll = useRef(true);
    const lastWheelTime = useRef(0);
    const unlockTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    // 애니메이션 완료를 기다리지 않고 minDelay 후부터 wheel 멈춤(200ms idle)을 감지해 unlock
    const scheduleUnlock = (minDelay: number) => {
        if (unlockTimer.current) clearTimeout(unlockTimer.current);

        const startTime = Date.now();
        const check = () => {
            const elapsed = Date.now() - startTime;
            const idle = Date.now() - lastWheelTime.current;
            if (elapsed >= minDelay && idle >= 200) {
                canScroll.current = true;
            } else {
                unlockTimer.current = setTimeout(check, 100);
            }
        };

        unlockTimer.current = setTimeout(check, minDelay);
    };

    useEffect(() => {
        history.scrollRestoration = 'manual';
        resetScrollTop();
        setPageScroll(false);

        return () => {
            // 인라인 스타일을 완전히 제거해 다른 페이지의 스크롤 컨테이너 동작 복원
            document.documentElement.style.overflow = '';
            document.body.style.overflow = '';
            history.scrollRestoration = 'auto';
            if (unlockTimer.current) clearTimeout(unlockTimer.current);
        };
    }, []);

    useEffect(() => {
        // wheel/touch 공통 판단 로직: footer 진입/복귀 감지, 슬라이드 전환, lock 처리
        const handleScrollAttempt = (deltaY: number, preventDefault?: () => void) => {
            const swiper = swiperRef.current;
            if (!swiper) return;

            if (isFooterMode.current) {
                // 푸터 복귀 감지: body.scrollTop 기준 (html이 아닌 body가 스크롤 컨테이너)
                // window.scrollY / window scroll event는 body 스크롤을 반영하지 않음
                if (deltaY < 0 && getScrollTop() < 1) {
                    preventDefault?.();
                    resetScrollTop();
                    isFooterMode.current = false;
                    setPageScroll(false);
                    canScroll.current = false;
                    scheduleUnlock(400);
                }
                return;
            }

            preventDefault?.();
            if (!canScroll.current) return;

            if (swiper.isEnd && deltaY > 0) {
                canScroll.current = false;
                isFooterMode.current = true;
                setPageScroll(true);
            } else if (!swiper.isEnd && deltaY > 0) {
                canScroll.current = false;
                swiper.slideNext(800);
                scheduleUnlock(400);
            } else if (!swiper.isBeginning && deltaY < 0) {
                canScroll.current = false;
                swiper.slidePrev(800);
                scheduleUnlock(400);
            }
        };

        const handleWheel = (e: WheelEvent) => {
            lastWheelTime.current = Date.now();
            handleScrollAttempt(e.deltaY, () => e.preventDefault());
        };

        // 모바일/태블릿은 wheel 이벤트가 없으므로 touchmove의 이동량을 deltaY로 환산해 동일 로직 재사용
        let lastTouchY = 0;
        const handleTouchStart = (e: TouchEvent) => {
            lastTouchY = e.touches[0].clientY;
        };

        const handleTouchMove = (e: TouchEvent) => {
            const currentY = e.touches[0].clientY;
            const deltaY = lastTouchY - currentY; // 손가락이 위로 이동 = 양수 (wheel deltaY 부호와 동일)
            lastTouchY = currentY;
            lastWheelTime.current = Date.now();
            handleScrollAttempt(deltaY, () => e.preventDefault());
        };

        const handleScrollToTop = () => {
            const swiper = swiperRef.current;
            resetScrollTop();
            isFooterMode.current = false;
            setPageScroll(false);
            canScroll.current = false;
            swiper?.slideTo(0, 800);
            scheduleUnlock(900);
        };

        window.addEventListener('wheel', handleWheel, { passive: false });
        window.addEventListener('touchstart', handleTouchStart, { passive: true });
        window.addEventListener('touchmove', handleTouchMove, { passive: false });
        window.addEventListener('scrollToTop', handleScrollToTop);

        return () => {
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('scrollToTop', handleScrollToTop);
        };
    }, []);

    return (
        <Swiper
            className="home-swiper"
            direction="vertical"
            speed={800}
            allowTouchMove={false}
            onSwiper={(swiper) => {
                swiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        >
            <SwiperSlide>
                <Banner isActive={activeIndex === 0} />
            </SwiperSlide>
            <SwiperSlide>
                <PortfolioSection isActive={activeIndex === 1} />
            </SwiperSlide>
            <SwiperSlide>
                <AboutSection isActive={activeIndex === 2} />
            </SwiperSlide>
            {/* <SwiperSlide>
                <GuideSection isActive={activeIndex === 3} />
            </SwiperSlide> */}
        </Swiper>
    );
}
