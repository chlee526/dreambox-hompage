import React from 'react';
import type { Metadata } from 'next';
import InquireForm from '@/features/contact/inquire/InquireForm';
import { packageList } from '@/features/contact/inquire/packageData';

export const metadata: Metadata = {
  title: { absolute: '박스제작 견적 문의하기 | 무료 구조 샘플 제공 - 드림박스' },
  description: '박스제작 견적 문의를 남겨주시면 담당자가 확인 후 연락처 및 이메일로 답변드립니다. 무료 구조 샘플도 함께 안내해 드립니다.',
};

export default async function ContactInquirePage() {
  return (
    <section className="l-page page-contact-inquire">
      <div className="l-inner">
        <div className="page-header">
          <h1 className="page-title">견적 문의</h1>
          <p className="page-desc">문의를 남겨 주시면 담당자가 확인 후 연락처 및 이메일로 답변드립니다</p>
        </div>
        <div className="content-wrap">
          <InquireForm packageList={packageList} />
        </div>
      </div>
    </section>
  );
}
