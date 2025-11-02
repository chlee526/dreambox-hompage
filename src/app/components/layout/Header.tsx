'use client';

import Link from 'next/link';
import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';

export default function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isHover, setIsHover] = useState(false);

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
    <header className={`fixed top-0 left-0 w-full h-[6.9rem] bg-cream  z-[1000] transition-all duration-300 ease-in-out ${isVisible ? 'translate-y-0' : '-translate-y-full'} `}>
      <div className="flex justify-between items-center h-full px-16">
        <div className="h-auto">
          <Link href="/" className="flex items-center">
            <Image src={'/assets/image/logo_dark.svg'} alt="logo" width={162} height={40} style={{ width: '162px', height: '40px' }} priority={true} />
          </Link>
        </div>
        <nav>
          <ul className="flex justify-between items-center gap-[1.6rem] font-paperlogy font-semibold text-[2rem] text-primary-dark">
            <li>
              <Link href="/portfolio" className="inline-block py-4 px-8 opacity-80 transition-opacity duration-250 hover:opacity-100">
                포트폴리오
              </Link>
            </li>
            <li>
              <Link href="/" className="inline-block py-4 px-8   opacity-80 transition-opacity duration-250 hover:opacity-100">
                견적문의
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
