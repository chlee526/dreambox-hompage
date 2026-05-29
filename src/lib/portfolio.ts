import { createClient } from '@/lib/supabase/server';
import { PortfolioType } from '@/types/portfolio';

export interface CreatePortfolioInput {
  name: string;
  category: string;
  description?: string;
  thumbnail?: string;
  images?: string[];
  infoData?: Array<{ code: string; name: string; value: string }>;
  isPreview?: boolean;
}

export interface UpdatePortfolioInput {
  name: string;
  category: string;
  description?: string;
  thumbnail?: string;
  images?: string[];
  infoData?: Array<{ code: string; name: string; value: string }>;
  isPreview?: boolean;
}

export async function getPortfolios(): Promise<PortfolioType[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from('portfolioList').select('*').order('seq', { ascending: false });
    if (error) return [];
    return data || [];
  } catch {
    return [];
  }
}

export async function getPortfolio(seq: number): Promise<PortfolioType | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from('portfolioList').select('*').eq('seq', seq).single();
    if (error) return null;
    return data;
  } catch {
    return null;
  }
}

export async function getPreviewPortfolios(): Promise<PortfolioType[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from('portfolioList').select('*').eq('isPreview', true).order('seq', { ascending: false });
    if (error) return [];
    return data || [];
  } catch {
    return [];
  }
}

export async function getPortfoliosByCategory(category: string): Promise<PortfolioType[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from('portfolioList').select('*').eq('category', category).order('seq', { ascending: false });
    if (error) return [];
    return data || [];
  } catch {
    return [];
  }
}

export async function createPortfolio(input: CreatePortfolioInput): Promise<PortfolioType | null> {
  try {
    const supabase = await createClient();
    if (!input.name || !input.category) return null;

    const { data: portfolios } = await supabase.from('portfolioList').select('seq').order('seq', { ascending: false }).limit(1);
    const newSeq = portfolios && portfolios.length > 0 ? portfolios[0].seq + 1 : 1;

    const { data, error } = await supabase
      .from('portfolioList')
      .insert({
        seq: newSeq,
        name: input.name,
        category: input.category,
        description: input.description || '',
        thumbnail: input.thumbnail || '',
        images: input.images || [],
        infoData: input.infoData || [],
        isPreview: input.isPreview || false,
      })
      .select()
      .single();

    if (error) return null;
    return data;
  } catch {
    return null;
  }
}

export async function updatePortfolio(seq: number, input: UpdatePortfolioInput): Promise<PortfolioType | null> {
  try {
    const supabase = await createClient();
    if (!input.name || !input.category) return null;

    const { data, error } = await supabase
      .from('portfolioList')
      .update({
        name: input.name,
        category: input.category,
        description: input.description || '',
        thumbnail: input.thumbnail || '',
        images: input.images || [],
        infoData: input.infoData || [],
        isPreview: input.isPreview || false,
      })
      .eq('seq', seq)
      .select()
      .single();

    if (error) return null;
    return data;
  } catch {
    return null;
  }
}

export async function deletePortfolio(seq: number): Promise<boolean> {
  try {
    const supabase = await createClient();

    const { data: portfolio, error: fetchError } = await supabase.from('portfolioList').select('thumbnail, images').eq('seq', seq).single();
    if (fetchError || !portfolio) return false;

    const fileUrls: string[] = [];
    if (portfolio.thumbnail) fileUrls.push(portfolio.thumbnail);
    if (portfolio.images && Array.isArray(portfolio.images)) {
      fileUrls.push(...portfolio.images.filter((img): img is string => typeof img === 'string'));
    }

    if (fileUrls.length > 0) {
      const { deleteFiles, extractFilePathFromUrl } = await import('./storage');
      const filePaths = fileUrls.map(extractFilePathFromUrl).filter((path): path is string => path !== null);
      if (filePaths.length > 0) await deleteFiles(filePaths);
    }

    const { data, error } = await supabase.from('portfolioList').delete().eq('seq', seq).select();
    if (error || !data || data.length === 0) return false;

    return true;
  } catch {
    return false;
  }
}
