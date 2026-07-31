'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();

  const moveToTop = () => {
    if (pathname === '/') {
      window.dispatchEvent(new CustomEvent('scrollToTop'));
    } else {
      // body가 실제 스크롤 컨테이너인 경우 window.scrollTo만으로는 반영되지 않아 body도 함께 초기화
      window.scrollTo({ top: 0, behavior: 'smooth' });
      document.body.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  return (
    <footer>
      <div className="footer-top">
        <div className="l-inner">
          <button className="policy-btn" onClick={() => window.dispatchEvent(new CustomEvent('openPrivacyModal'))}>
            <span>개인정보처리방침</span>
          </button>

          <button className="top-btn" onClick={moveToTop}></button>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="l-inner">
          <div className="lc">
            <div className="info">
              <span className="tel">Tel. 010-5290-8856</span>
              <span className="email">E-mail. dreambox13@daum.net</span>
            </div>
            <div className="company">
              <span className="name">(주)드림박스</span>
              <span className="address">경기도 파주시 바리골길 196-20</span>
            </div>
            <div className="owner">
              <span className="name">대표자: 이재정</span>
              <span className="number">사업자등록번호: 141-81-37938</span>
            </div>
            <div className="copyright">
              <span>©DREAMBOX. All rights reserved.</span>
            </div>
          </div>
          <div className="rc">
            <div className="logo-wrap">
              <Link href="/" className="logo">
                <Image src="/assets/image/home/logo_white.svg" alt="드림박스 로고" width={237} height={49} unoptimized />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
