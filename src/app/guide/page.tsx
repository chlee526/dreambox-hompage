import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: { absolute: '박스제작 가이드 | 싸바리박스·단상자·골판지박스 종류부터 후가공까지 - 드림박스' },
    description: '박스제작이 처음이신 분들을 위한 가이드. 형태별 특징과 종이·인쇄·후가공·목형 제작까지 한 번에 정리했습니다.',
    keywords: ['박스제작 방법', '패키지제작 가이드', '싸바리박스', '박스 후가공', '목형제작'],
};

export default async function GuidePage() {
    return (
        <section className="l-page page-guide">
            <div className="l-inner">
                <div className="page-header">
                    <strong className="page-title">박스제작 가이드</strong>
                </div>
                <div className="content-wrap">{/* TODO: 가이드 콘텐츠 추가 예정 */}</div>
            </div>
        </section>
    );
}
