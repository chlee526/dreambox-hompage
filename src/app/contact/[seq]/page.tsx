import React from 'react';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import InquireForm from '@/features/contact/inquire/InquireForm';
import { packageList } from '@/features/contact/inquire/packageData';

// 개별 문의자의 이름·연락처·이메일이 노출될 수 있어 색인 및 링크 추적 모두 차단
export const metadata: Metadata = {
  title: '견적 문의 - 드림박스',
  robots: { index: false, follow: false },
};

export default async function ContactDetailPage({ params }: { params: Promise<{ seq: string }> }) {
  const { seq } = await params;
  const supabase = await createClient();

  const { data } = await supabase.from('inquire').select('*').eq('seq', Number(seq)).single();

  if (!data) redirect('/contact');

  const status: string = data.status ?? '접수완료';

  return (
    <section className="l-page page-contact-inquire">
      <div className="l-inner">
        <div className="page-header">
          <h1 className="page-title">견적 문의</h1>
          <p className="page-desc">문의를 남겨 주시면 담당자가 확인 후 연락처 및 이메일로 답변드립니다</p>
        </div>
        <div className="status-area">
          <span className={`status-badge ${status === '답변완료' ? 'is-done' : 'is-received'}`}>{status}</span>
        </div>
        <div className="content-wrap">
          <InquireForm
            packageList={packageList}
            initialData={{
              seq: data.seq,
              company: data.company,
              name: data.name,
              phone: data.phone,
              email: data.email,
              pw: data.pw,
              title: data.title,
              package: data.package,
              amount: data.amount,
              p_size: data.p_size,
              contents: data.contents,
              c_size: data.c_size,
              deadline: data.deadline,
              budget: data.budget,
              content: data.content,
              files: data.files,
            }}
          />
        </div>
      </div>
    </section>
  );
}
