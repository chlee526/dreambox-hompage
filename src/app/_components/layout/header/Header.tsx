'use client';

import Link from 'next/link';
import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { useContactModalStore } from '@/stores/useContactModalStore';

export default function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const openModal = useContactModalStore((state) => state.openModal);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;

    // 최상단에 있으면 항상 헤더 표시
    if (currentScrollY === 0) {
      setIsVisible(true);
    }
    // 스크롤 다운
    else if (currentScrollY > lastScrollY && currentScrollY > 100) {
      setIsVisible(false);
    }
    // 스크롤 업
    else if (currentScrollY < lastScrollY) {
      setIsVisible(true);
    }

    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <header className={isVisible ? 'is-visible gnb' : 'gnb'}>
      <div className="header-wrap">
        <div className="logo-wrap">
          <Link href="/" className="logo">
            <Image src={'/assets/image/logo_dark.svg'} alt="logo" width={162} height={40} priority={true} />
          </Link>
        </div>
        <nav>
          <ul className="menu-list">
            <li>
              <Link href="/portfolio">포트폴리오</Link>
            </li>
            <li>
              <button onClick={openModal} className="contact-btn">
                문의하기
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
