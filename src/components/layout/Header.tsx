'use client';
import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
    { href: '/', label: '홈' },
    // { href: '/guide', label: '박스제작 가이드' },
    { href: '/portfolio', label: '포트폴리오' },
    { href: '/faq', label: 'FAQ' },
    { href: '/contact', label: '견적문의', className: 'link-button' },
];

export default function Header() {
    const pathname = usePathname();

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const closeMenu = () => setIsMenuOpen(false);

    return (
        <header className={pathname === '/' ? 'gnb is-home' : 'gnb'}>
            <div className="l-inner">
                <div className="header-wrap">
                    <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)} />

                    {isMenuOpen && <div className="menu-overlay" onClick={closeMenu} />}

                    <nav className={`menu-list-mobile${isMenuOpen ? ' is-open' : ''}`}>
                        <button className="menu-close" onClick={closeMenu} />
                        <ul>
                            {NAV_LINKS.map(({ href, label }) => (
                                <li key={href}>
                                    <Link href={href} prefetch={true} onClick={closeMenu}>
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="logo-wrap">
                        <Link href="/" className="logo">
                            <Image src="/assets/image/home/logo.svg" alt="드림박스 로고" width={203} height={42} priority />
                        </Link>
                    </div>

                    <nav className="menu-list">
                        <ul>
                            {NAV_LINKS.map(({ href, label, className }) => (
                                <li key={href} className={className}>
                                    <Link href={href} prefetch={true}>
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="link-button">
                        <Link href="/contact" prefetch={true}>
                            견적문의
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}
