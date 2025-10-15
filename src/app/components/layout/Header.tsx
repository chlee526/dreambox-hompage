'use client';
/** @jsxImportSource @emotion/react */
import Link from 'next/link';

import { HeaderStyles } from './header-styles';

export default function Header() {
    return (
        <header css={HeaderStyles}>
            <div className="container">
                <div className="logo-wrap">
                    <Link href="/">
                        <img src="/assets/image/logo_cream.png" alt="logo" />
                    </Link>
                </div>
                <nav className="nav-wrap">
                    <ul className="nav-list">
                        <li className="nav-item">
                            <Link href="/">포트폴리오</Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/">견적문의</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
