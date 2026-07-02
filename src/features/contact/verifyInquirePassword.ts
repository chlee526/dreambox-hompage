'use server';

import { createClient } from '@/lib/supabase/server';

export async function verifyInquirePassword(seq: number, pw: string): Promise<boolean> {
    const supabase = await createClient();
    const { data } = await supabase.from('inquire').select('pw').eq('seq', seq).single();
    return data?.pw === pw;
}
