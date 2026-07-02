import React from 'react';
import InquireForm from '@/features/contact/inquire/InquireForm';
import { packageList } from '@/features/contact/inquire/packageData';

export default async function ContactInquirePage() {
    return (
        <section className="l-page page-contact-inquire">
            <div className="l-inner">
                <div className="page-header">
                    <strong className="page-title">견적 문의</strong>
                    <span className="text">문의를 남겨 주시면 담당자가 확인 후 연락처 및 이메일로 답변드립니다</span>
                </div>
                <div className="content-wrap">
                    <InquireForm packageList={packageList} />
                </div>
            </div>
        </section>
    );
}
