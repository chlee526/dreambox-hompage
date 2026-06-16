import { requireAuth } from '@/lib/supabase/server';
import { createClient } from '@/lib/supabase/server';
import ContactTable from '@/app/contact/ContactTable';

export const dynamic = 'force-dynamic';

export default async function AdminContactPage() {
    await requireAuth();

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
                    <strong className="page-title">견적문의 관리</strong>
                </div>
                <div className="content-wrap">
                    <ContactTable data={contactList} perPage={10} detailBasePath="/admin/contact" />
                </div>
            </div>
        </section>
    );
}
