import { NextRequest, NextResponse } from 'next/server';
import { getPortfolios, getPreviewPortfolios } from '@/lib/portfolio';

/**
 * 포트폴리오 목록 조회 API
 * GET /api/portfolios
 * GET /api/portfolios?preview=true (미리보기만)
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const preview = searchParams.get('preview') === 'true';

  try {
    const portfolios = preview ? await getPreviewPortfolios() : await getPortfolios();

    return NextResponse.json(portfolios);
  } catch (error) {
    console.error('Failed to fetch portfolios:', error);
    return NextResponse.json({ error: 'Failed to fetch portfolios' }, { status: 500 });
  }
}
