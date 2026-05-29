import { NextRequest, NextResponse } from 'next/server';
import { getPortfolio } from '@/lib/portfolio';

/**
 * 개별 포트폴리오 조회 API
 * GET /api/portfolios/[seq]
 */
export async function GET(request: NextRequest, { params }: { params: Promise<{ seq: string }> }) {
  const { seq } = await params;
  const id = Number(seq);

  if (isNaN(id)) {
    return NextResponse.json({ error: 'Invalid portfolio ID' }, { status: 400 });
  }

  try {
    const portfolio = await getPortfolio(id);

    if (!portfolio) {
      return NextResponse.json({ error: 'Portfolio not found' }, { status: 404 });
    }

    return NextResponse.json(portfolio);
  } catch (error) {
    console.error('Failed to fetch portfolio:', error);
    return NextResponse.json({ error: 'Failed to fetch portfolio' }, { status: 500 });
  }
}

