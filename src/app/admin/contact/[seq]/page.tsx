import { requireAuth } from '@/lib/supabase/server';
import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import InquireForm from '@/features/contact/inquire/InquireForm';
import { packageList } from '@/features/contact/inquire/packageData';
import StatusControl from '@/features/admin/contact/StatusControl';

export default async function AdminContactDetailPage({ params }: { params: Promise<{ seq: string }> }) {
    await requireAuth();

    const { seq } = await params;
    const supabase = await createClient();

    const { data } = await supabase.from('inquire').select('*').eq('seq', Number(seq)).single();
    if (!data) notFound();

    return (
        <div className="l-page page-contact-inquire">
            <div className="l-inner">
                <div className="page-header">
                    <h2 className="page-title">견적 문의 상세</h2>
                </div>
                <StatusControl seq={data.seq} status={data.status ?? '접수완료'} />
                <div className="content-wrap">
                    <InquireForm
                        packageList={packageList}
                        adminMode
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
        </div>
    );
}
