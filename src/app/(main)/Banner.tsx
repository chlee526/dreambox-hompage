'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useContactModalStore } from '@/stores/useContactModalStore';
import { useState, useEffect } from 'react';

export default function Banner() {
  const openModal = useContactModalStore((state) => state.openModal);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1025);
    };

    // 초기 실행
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 박스 이미지 설정 - 반응형 위치 및 크기
  const getBoxes = () => {
    if (isMobile) {
      return [
        { id: 1, image: '/assets/image/boxes/box3.png', size: 90, delay: 0, duration: 8, x: 10, y: 10, rotation: 15 },
        { id: 2, image: '/assets/image/boxes/box5.png', size: 80, delay: 1, duration: 10, x: 70, y: 18, rotation: -20 },
        { id: 6, image: '/assets/image/boxes/box2.png', size: 50, delay: 0.8, duration: 6, x: 83, y: 52, rotation: 10 },
        { id: 4, image: '/assets/image/boxes/bag1.png', size: 60, delay: 0.5, duration: 9, x: 75, y: 80, rotation: -15 },
        { id: 5, image: '/assets/image/boxes/box1.png', size: 78, delay: 1.5, duration: 11, x: 30, y: 86, rotation: 25 },
        { id: 3, image: '/assets/image/boxes/box4.png', size: 58, delay: 2, duration: 7, x: 7, y: 60, rotation: 10 },
      ];
    } else if (isTablet) {
      return [
        { id: 1, image: '/assets/image/boxes/box3.png', size: 98, delay: 0, duration: 8, x: 8, y: 12, rotation: 15 },
        { id: 2, image: '/assets/image/boxes/box5.png', size: 100, delay: 1, duration: 10, x: 82, y: 16, rotation: -20 },
        { id: 6, image: '/assets/image/boxes/box2.png', size: 70, delay: 0.8, duration: 6, x: 85, y: 50, rotation: 10 },
        { id: 4, image: '/assets/image/boxes/bag1.png', size: 74, delay: 0.5, duration: 9, x: 75, y: 72, rotation: -15 },
        { id: 5, image: '/assets/image/boxes/box1.png', size: 95, delay: 1.5, duration: 11, x: 45, y: 85, rotation: 25 },
        { id: 3, image: '/assets/image/boxes/box4.png', size: 75, delay: 2, duration: 7, x: 8, y: 60, rotation: 10 },
      ];
    } else {
      return [
        { id: 1, image: '/assets/image/boxes/box3.png', size: 120, delay: 0, duration: 8, x: 8, y: 12, rotation: 15 },
        { id: 2, image: '/assets/image/boxes/box5.png', size: 100, delay: 1, duration: 10, x: 82, y: 18, rotation: -20 },
        { id: 6, image: '/assets/image/boxes/box2.png', size: 70, delay: 0.8, duration: 6, x: 88, y: 52, rotation: -10 },
        { id: 4, image: '/assets/image/boxes/bag1.png', size: 90, delay: 0.5, duration: 9, x: 75, y: 72, rotation: -15 },
        { id: 5, image: '/assets/image/boxes/box1.png', size: 110, delay: 1.5, duration: 11, x: 45, y: 85, rotation: 25 },
        { id: 3, image: '/assets/image/boxes/box4.png', size: 80, delay: 2, duration: 7, x: 10, y: 65, rotation: 10 },
      ];
    }
  };

  const boxes = getBoxes();

  return (
    <section className="banner-section">
      {/* 떠다니는 박스 이미지들 */}
      <div className="floating-boxes">
        {boxes.map((box) => (
          <div
            key={box.id}
            className="box-image"
            style={
              {
                '--delay': `${box.delay}s`,
                '--duration': `${box.duration}s`,
                '--x': `${box.x}%`,
                '--y': `${box.y}%`,
                '--size': `${box.size}px`,
                '--rotation': `${box.rotation}deg`,
              } as React.CSSProperties
            }
          >
            <Image src={box.image} alt="box decoration" width={box.size} height={box.size} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
        ))}
      </div>

      {/* 그라데이션 오버레이 */}
      <div className="banner-overlay" />

      {/* 콘텐츠 */}
      <div className="banner-wrapper">
        <div className="banner-content">
          <p className="banner-title">
            <span className="title-line">당신의 브랜드를 담는</span>
            <span className="title-line">첫 번째 패키지</span>

            <span className="title-line highlight">DREAM BOX</span>
          </p>

          <p className="banner-subtitle">
            <span className="subtitle-line">필요한 만큼, 원하는 방식으로</span>
            <span className="subtitle-line">소량 맞춤 제작으로 브랜드 감성을 완성합니다</span>
          </p>
        </div>

        <div className="banner-buttons">
          <button onClick={openModal} className="banner-btn primary-btn">
            <span>문의하기</span>
            <div className="btn-shine" />
          </button>
          <button className="banner-btn secondary-btn">
            <Link href="/portfolio">
              <span>포트폴리오 보기</span>
              <div className="btn-shine" />
            </Link>
          </button>
        </div>
      </div>
    </section>
  );
}
