'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

// 공통 스크립트(layout.tsx)가 최초 진입 시 wcs_do()를 1회 실행하므로,
// 이후 클라이언트 라우팅(페이지 이동)마다 다시 실행해 페이지뷰 로그가 누락되지 않게 한다.
export default function NaverWcsPageviewTracker() {
    const pathname = usePathname();
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        if (window.wcs) {
            window.wcs_add = window.wcs_add ?? {};
            window.wcs_add['wa'] = 's_54bed3cebebc';
            window.wcs_do?.();
        }
    }, [pathname]);

    return null;
}
