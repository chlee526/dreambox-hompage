'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white py-24 px-16">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex justify-between gap-24 pb-16 border-b border-white/10 max-md:flex-col max-md:gap-12">
          <div className="flex-1 max-w-[350px]">
            <div className="mb-6">
              <Image src={'/assets/image/logo_light.svg'} alt="logo" width={162} height={40} style={{ width: '162px', height: '40px' }} priority={true} />
            </div>

            <p className="text-base leading-relaxed text-gray-300">당신의 꿈을 담는 상자, 드림박스</p>
          </div>

          <div className="flex gap-24 flex-1 max-md:flex-col max-md:gap-8">
            <div>
              <h3 className="text-base font-semibold mb-6 text-white font-paperlogy">서비스</h3>
              <ul className="flex flex-col gap-5">
                <li>
                  <Link href="/" className="text-sm text-gray-400 leading-normal transition-colors hover:text-secondary">
                    포트폴리오
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-sm text-gray-400 leading-normal transition-colors hover:text-secondary">
                    견적문의
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-sm text-gray-400 leading-normal transition-colors hover:text-secondary">
                    회사소개
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-base font-semibold mb-6 text-white font-paperlogy">고객지원</h3>
              <ul className="flex flex-col gap-5">
                <li>
                  <Link href="/" className="text-sm text-gray-400 leading-normal transition-colors hover:text-secondary">
                    이용약관
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-sm text-gray-400 leading-normal transition-colors hover:text-secondary">
                    개인정보처리방침
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-base font-semibold mb-6 text-white font-paperlogy">연락처</h3>
              <ul className="flex flex-col gap-5">
                <li className="text-sm text-gray-400 leading-normal">이메일: contact@dreambox.com</li>
                <li className="text-sm text-gray-400 leading-normal">전화: 02-1234-5678</li>
                <li className="text-sm text-gray-400 leading-normal">주소: 서울시 강남구 테헤란로 123</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center pt-12 gap-8 max-md:flex-col max-md:items-start">
          <div>
            <p className="text-[1.3rem] text-gray-500 leading-loose">대표자: 홍길동 | 사업자등록번호: 123-45-67890</p>
            <p className="text-[1.3rem] text-gray-500 leading-loose">통신판매업신고번호: 2024-서울강남-12345</p>
          </div>
          <div>
            <p className="text-[1.3rem] text-gray-500">© 2024 Dream Box. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
