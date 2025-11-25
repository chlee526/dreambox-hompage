'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer>
      <div className="l-inner">
        <div className="footer-top">
          <div className="logo-area">
            <div className="logo">
              <Image src={'/assets/image/logo_light.svg'} alt="logo" width={162} height={40} priority={true} />
            </div>

            <p className="text">당신의 꿈을 담는 상자, 드림박스</p>
          </div>

          <div className="service-area">
            <div className="service">
              <h3>서비스</h3>
              <ul>
                <li>
                  <Link href="/">포트폴리오</Link>
                </li>
                <li>
                  <Link href="/">견적문의</Link>
                </li>
              </ul>
            </div>

            {/* <div className="service">
              <h3>고객지원</h3>
              <ul>
                <li>
                  <Link href="/">이용약관</Link>
                </li>
                <li>
                  <Link href="/">개인정보처리방침</Link>
                </li>
              </ul>
            </div> */}

            <div className="service">
              <h3>연락처</h3>
              <ul>
                <li className="color-gray-400">이메일: contact@dreambox.com</li>
                <li className="color-gray-400">전화: 02-1234-5678</li>
                <li className="color-gray-400">주소: 서울시 강남구 테헤란로 123</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            <p>대표자: 홍길동 | 사업자등록번호: 123-45-67890</p>
            <p>통신판매업신고번호: 2024-서울강남-12345</p>
          </div>
          <div>
            <p>© 2024 Dream Box. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
