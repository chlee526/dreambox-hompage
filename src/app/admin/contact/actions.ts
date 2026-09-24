'use server';

import { createClient } from '@/lib/supabase/server';

export async function updateInquireStatus(seq: number, status: string): Promise<void> {
    const supabase = await createClient();
    await supabase.from('inquire').update({ status }).eq('seq', seq);
}

export async function updateInquireReplyLink(seq: number, replyLink: string): Promise<void> {
    const supabase = await createClient();
    await supabase.from('inquire').update({ reply_link: replyLink || null }).eq('seq', seq);
}
