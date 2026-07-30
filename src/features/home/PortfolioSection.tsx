'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { portfolioData } from '@/features/portfolio/portfolioData';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { useRouter } from 'next/navigation';

interface Props {
  isActive: boolean;
}

export default function PortfolioSection({ isActive }: Props) {
  const [animKey, setAnimKey] = useState(0);
  const router = useRouter();

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

  const slideList = portfolioData.filter((item) => item.isSlide);

  return (
    <section className="portfolio-section">
      <div className="lc">
        <div className="text-wrap" key={animKey}>
          <h2 className="title">PORTFOLIO</h2>
          <p className="desc">시딩박스 등 시중에 없는 형태도, 어떤 제품이든 원하는 패키지로 만들어드립니다</p>
          <Link href="/portfolio" className="more-btn">
            MORE
          </Link>
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
            {slideList.map((slide) => (
              <SwiperSlide key={slide.seq}>
                <ul className="image-list" onClick={() => router.push(`/portfolio/${slide.seq}`)}>
                  {slide.slideList?.map((img, idx) => (
                    <li key={idx} className="image-list-item">
                      <Image src={img.url} alt={`${slide.name} 이미지 ${idx + 1}`} fill sizes="(max-width: 768px) 50vw, 27vw" />
                    </li>
                  ))}
                </ul>
              </SwiperSlide>
            ))}
          </Swiper>
          <button ref={prevRef} className="portfolio-nav-btn portfolio-nav-btn--prev">
            <Image src="/assets/image/icon/chevron-left.svg" alt="이전" width={24} height={24} unoptimized />
          </button>
          <button ref={nextRef} className="portfolio-nav-btn portfolio-nav-btn--next">
            <Image src="/assets/image/icon/chevron-right.svg" alt="다음" width={24} height={24} unoptimized />
          </button>
        </div>
      </div>
    </section>
  );
}
