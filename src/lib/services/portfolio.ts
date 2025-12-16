import { createClient } from '@/utils/supabase/server';
import { PortfolioType } from '@/types/portfolio';

/**
 * 포트폴리오 서버 서비스
 * Supabase에서 포트폴리오 데이터를 관리하는 서버사이드 로직
 *
 * 이 서비스는 다음 위치에서 재사용됩니다:
 * - 서버 컴포넌트 (page.tsx)
 * - API Routes (/api/portfolios, /api/admin/portfolio)
 * - Server Actions (필요시)
 */

/**
 * ========================================
 * READ 작업
 * ========================================
 */

/**
 * 전체 포트폴리오 목록 조회
 * @returns 포트폴리오 배열
 */
export async function getPortfolios(): Promise<PortfolioType[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from('portfolioList').select('*').order('seq', { ascending: false });

    if (error) {
      console.error('포트폴리오 목록 가져오기 실패:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('서버에서 포트폴리오 목록 가져오기 에러:', error);
    return [];
  }
}

/**
 * 특정 포트폴리오 조회
 * @param seq - 포트폴리오 시퀀스 번호
 * @returns 포트폴리오 객체 또는 null
 */
export async function getPortfolio(seq: number): Promise<PortfolioType | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from('portfolioList').select('*').eq('seq', seq).single();

    if (error) {
      console.error('포트폴리오 가져오기 실패:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('서버에서 포트폴리오 가져오기 에러:', error);
    return null;
  }
}

/**
 * 미리보기 포트폴리오 목록 조회 (isPreview: true)
 * @returns 미리보기 포트폴리오 배열
 */
export async function getPreviewPortfolios(): Promise<PortfolioType[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from('portfolioList').select('*').eq('isPreview', true).order('seq', { ascending: false });

    if (error) {
      console.error('미리보기 포트폴리오 가져오기 실패:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('서버에서 미리보기 포트폴리오 가져오기 에러:', error);
    return [];
  }
}

/**
 * 카테고리별 포트폴리오 조회
 * @param category - 카테고리 ('package' | 'bag' | 'etc')
 * @returns 필터링된 포트폴리오 배열
 */
export async function getPortfoliosByCategory(category: string): Promise<PortfolioType[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from('portfolioList').select('*').eq('category', category).order('seq', { ascending: false });

    if (error) {
      console.error('카테고리별 포트폴리오 가져오기 실패:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('서버에서 카테고리별 포트폴리오 가져오기 에러:', error);
    return [];
  }
}

/**
 * ========================================
 * CREATE 작업
 * ========================================
 */

/**
 * 포트폴리오 생성 데이터 타입
 */
export interface CreatePortfolioInput {
  name: string;
  category: string;
  description?: string;
  thumbnail?: string;
  images?: string[];
  infoData?: Array<{ code: string; name: string; value: string }>;
  isPreview?: boolean;
}

/**
 * 새 포트폴리오 생성
 * @param input - 포트폴리오 생성 데이터
 * @returns 생성된 포트폴리오 또는 null
 */
export async function createPortfolio(input: CreatePortfolioInput): Promise<PortfolioType | null> {
  try {
    const supabase = await createClient();

    // 데이터 검증
    if (!input.name || !input.category) {
      console.error('필수 항목 누락: name, category');
      return null;
    }

    // 현재 최대 seq 값 가져오기
    const { data: portfolios, error: fetchError } = await supabase.from('portfolioList').select('seq').order('seq', { ascending: false }).limit(1);

    if (fetchError) {
      console.error('포트폴리오 조회 실패:', fetchError);
    }

    // 새로운 seq 계산 (최대값 + 1, 없으면 1부터 시작)
    const newSeq = portfolios && portfolios.length > 0 ? portfolios[0].seq + 1 : 1;

    // 포트폴리오 생성
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

    if (error) {
      console.error('포트폴리오 생성 실패:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('서버에서 포트폴리오 생성 에러:', error);
    return null;
  }
}

/**
 * ========================================
 * UPDATE 작업
 * ========================================
 */

/**
 * 포트폴리오 수정 데이터 타입
 */
export interface UpdatePortfolioInput {
  name: string;
  category: string;
  description?: string;
  thumbnail?: string;
  images?: string[];
  infoData?: Array<{ code: string; name: string; value: string }>;
  isPreview?: boolean;
}

/**
 * 포트폴리오 수정
 * @param seq - 포트폴리오 시퀀스 번호
 * @param input - 수정할 데이터
 * @returns 수정된 포트폴리오 또는 null
 */
export async function updatePortfolio(seq: number, input: UpdatePortfolioInput): Promise<PortfolioType | null> {
  try {
    const supabase = await createClient();

    // 데이터 검증
    if (!input.name || !input.category) {
      console.error('필수 항목 누락: name, category');
      return null;
    }

    // 포트폴리오 수정
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

    if (error) {
      console.error('포트폴리오 수정 실패:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('서버에서 포트폴리오 수정 에러:', error);
    return null;
  }
}

/**
 * ========================================
 * DELETE 작업
 * ========================================
 */

/**
 * 포트폴리오 삭제
 * @param seq - 포트폴리오 시퀀스 번호
 * @returns 삭제 성공 여부
 */
export async function deletePortfolio(seq: number): Promise<boolean> {
  try {
    const supabase = await createClient();

    // 1. 먼저 포트폴리오 데이터 조회 (이미지 URL 확인을 위해)
    const { data: portfolio, error: fetchError } = await supabase.from('portfolioList').select('thumbnail, images').eq('seq', seq).single();

    if (fetchError || !portfolio) {
      console.error('포트폴리오 조회 실패:', fetchError);
      return false;
    }

    // 2. Storage에서 이미지 파일들 삭제
    const fileUrls: string[] = [];

    // 썸네일 추가
    if (portfolio.thumbnail) {
      fileUrls.push(portfolio.thumbnail);
    }

    // 상세 이미지들 추가 (타입 가드)
    if (portfolio.images && Array.isArray(portfolio.images)) {
      const imageUrls = portfolio.images.filter((img): img is string => typeof img === 'string');
      fileUrls.push(...imageUrls);
    }

    // 파일들이 있으면 Storage에서 삭제
    if (fileUrls.length > 0) {
      const { deleteFiles, extractFilePathFromUrl } = await import('./storage');

      // URL에서 파일 경로 추출
      const filePaths = fileUrls.map(extractFilePathFromUrl).filter((path): path is string => path !== null);

      if (filePaths.length > 0) {
        const deleteResult = await deleteFiles(filePaths);

        if (!deleteResult) {
          console.warn('일부 파일 삭제에 실패했지만 계속 진행합니다.');
        }
      }
    }

    // 3. DB에서 포트폴리오 레코드 삭제
    const { data, error } = await supabase.from('portfolioList').delete().eq('seq', seq).select();

    if (error) {
      console.error('포트폴리오 삭제 실패:', error);
      return false;
    }

    // 실제로 삭제된 데이터가 없는 경우
    if (!data || data.length === 0) {
      console.error('포트폴리오 삭제 권한 없음 또는 데이터 없음');
      return false;
    }

    return true;
  } catch (error) {
    console.error('서버에서 포트폴리오 삭제 에러:', error);
    return false;
  }
}
