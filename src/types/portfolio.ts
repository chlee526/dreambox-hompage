export type PortfolioImageItem = { url: string; width?: number; height?: number };

export type PortfolioCategory = 'plan' | 'savary' | 'dan' | 'shop' | 'print';

export const CATEGORY_LABELS: Record<PortfolioCategory, string> = {
    plan: '시딩박스/기획패키지',
    savary: '싸바리',
    dan: '단상자',
    shop: '쇼핑백',
    print: '인쇄물',
};

export type PortfolioType = {
    seq: string;
    name: string;
    category: PortfolioCategory[];
    isSlide: boolean;
    slideList: PortfolioImageItem[];
    thumbnailList: PortfolioImageItem[];
    imgList: (PortfolioImageItem | undefined)[];
    infos?: { topic: string; info: string }[];
};
