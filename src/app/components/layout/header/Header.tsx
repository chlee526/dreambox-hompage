'use client';

import Link from 'next/link';
import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';

export default function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

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
      <div className="l-inner header-wrap">
        <div className="logo-wrap">
          <Link href="/" className="logo">
            <Image src={'/assets/image/logo_dark.svg'} alt="logo" width={162} height={40} style={{ width: '162px', height: '40px' }} priority={true} />
          </Link>
        </div>
        <nav>
          <ul className="menu-list">
            <li>
              <Link href="/portfolio">포트폴리오</Link>
            </li>
            <li>
              <Link href="/company">견적문의</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
