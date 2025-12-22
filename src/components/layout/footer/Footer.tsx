'use client';

import Image from 'next/image';

export default function Footer() {
  return (
    <footer>
      <div className="l-inner">
        <div className="footer-top">
          <div className="info-section">
            <div className="contact-info">
              <p>연락처: 010-5290-8856</p>
              <p>이메일: dreamboxcom25@gmail.com</p>
              <p>주소: 경기도 파주시 바리골길 196-20</p>
            </div>

            <div className="company-info">
              <p>대표자: 이재정 | 사업자등록번호: 123-45-67890</p>
            </div>
          </div>

          <div className="logo-section">
            <div className="logo">
              <Image src={'/assets/image/logo_light.svg'} alt="logo" width={162} height={40} priority={true} />
            </div>
            <p className="tagline">당신의 꿈을 담는 상자, 드림박스</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © 2025
            {new Date().getFullYear() > 2025 ? `-${new Date().getFullYear()}` : ''} DreamBox. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
