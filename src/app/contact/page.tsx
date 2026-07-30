import React from 'react';
import type { Metadata } from 'next';
import ContactTable from '@/features/contact/ContactTable';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: { absolute: '박스제작 견적문의 | 무료 구조설계 샘플 제공 - 드림박스' },
  description: '박스제작 견적과 함께 구조설계 샘플을 무료로 받아보세요. 제품 종류, 수량, 납기만 알려주시면 빠르게 견적과 샘플 제작을 함께 안내해 드립니다.',
  keywords: ['박스제작 견적', '패키지제작 견적', '소량박스제작', '박스 단가', '맞춤박스 문의', '박스 무료샘플', '구조설계 샘플'],
};

export default async function ContactPage() {
  const supabase = await createClient();

  const { data } = await supabase.from('inquire').select('seq, title, name, created_at').order('created_at', { ascending: false });

  const contactList = (data ?? []).map((item) => ({
    seq: item.seq,
    title: item.title,
    author: item.name,
    date: item.created_at.slice(0, 10).replace(/-/g, '.'),
  }));

  return (
    <section className="l-page page-contact">
      <div className="l-inner">
        <div className="page-header">
          <h1 className="page-title">견적문의</h1>
          <p className="page-desc">문의를 남겨 주시면 담당자가 확인 후 연락처 및 이메일로 답변드립니다</p>
        </div>
        <div className="content-wrap">
          <ContactTable data={contactList} perPage={10} />
        </div>
      </div>
    </section>
  );
}
