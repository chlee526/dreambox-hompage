'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useContactModalStore } from '@/stores/useContactModalStore';

export default function Banner() {
  const openModal = useContactModalStore((state) => state.openModal);

  // 박스 이미지 설정 (public/assets/image/boxes/ 폴더에 이미지 추가 필요)
  const boxes = [
    { id: 1, image: '/assets/image/boxes/box3.png', size: 120, delay: 0, duration: 8, x: 10, y: 15, rotation: 15 },
    { id: 2, image: '/assets/image/boxes/box5.png', size: 100, delay: 1, duration: 10, x: 85, y: 20, rotation: -20 },
    { id: 3, image: '/assets/image/boxes/box4.png', size: 80, delay: 2, duration: 7, x: 15, y: 75, rotation: 10 },
    { id: 4, image: '/assets/image/boxes/bag1.png', size: 90, delay: 0.5, duration: 9, x: 78, y: 70, rotation: -15 },
    { id: 5, image: '/assets/image/boxes/box1.png', size: 110, delay: 1.5, duration: 11, x: 50, y: 85, rotation: 25 },
    { id: 6, image: '/assets/image/boxes/box2.png', size: 70, delay: 0.8, duration: 6, x: 92, y: 50, rotation: -10 },
  ];

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
            <span className="title-line">당신의 브랜드를</span>
            <span className="title-line">담는 첫 번째 순간</span>
            <span className="title-line highlight">DREAM BOX</span>
          </p>

          <p className="banner-subtitle">
            <span className="subtitle-line">필요한 만큼, 원하는 방식으로</span>
            <span className="subtitle-line">소량 맞춤 제작으로 브랜드 감성을 완성합니다.</span>
          </p>
        </div>

        <div className="banner-buttons">
          <button onClick={openModal} className="banner-btn primary-btn">
            <span>문의하기</span>
            <div className="btn-shine" />
          </button>
          <Link href="/portfolio">
            <button className="banner-btn secondary-btn">
              <span>포트폴리오 보기</span>
              <div className="btn-shine" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
