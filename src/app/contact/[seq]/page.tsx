import React from 'react';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import InquireForm from '@/features/contact/inquire/InquireForm';
import { packageList } from '@/features/contact/inquire/packageData';

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
                    <strong className="page-title">견적 문의 상세</strong>
                    <span className="text">문의를 남겨 주시면 담당자가 확인 후 연락처 및 이메일로 답변드립니다</span>
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
