import { requireAuth } from '@/lib/supabase/server';
import { createClient } from '@/lib/supabase/server';
import ContactTable from '@/features/contact/ContactTable';

export const dynamic = 'force-dynamic';

const formatDateTime = (iso: string) => {
    const parts = new Intl.DateTimeFormat('ko-KR', {
        timeZone: 'Asia/Seoul',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    }).formatToParts(new Date(iso));
    const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '';
    return `${get('year')}.${get('month')}.${get('day')} ${get('hour')}:${get('minute')}:${get('second')}`;
};

export default async function AdminContactPage() {
    await requireAuth();

    const supabase = await createClient();
    const { data } = await supabase.from('inquire').select('seq, title, name, created_at').order('created_at', { ascending: false });

    const contactList = (data ?? []).map((item) => ({
        seq: item.seq,
        title: item.title,
        author: item.name,
        date: formatDateTime(item.created_at),
    }));

    return (
        <section className="l-page page-contact">
            <div className="l-inner">
                <div className="page-header">
                    <strong className="page-title">견적문의 관리</strong>
                </div>
                <div className="content-wrap">
                    <ContactTable data={contactList} perPage={10} detailBasePath="/admin/contact" />
                </div>
            </div>
        </section>
    );
}
