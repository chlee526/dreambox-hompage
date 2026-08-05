declare module '*.scss' {
  const content: Record<string, string>;
  export default content;
}

declare module '*.css' {
  const content: Record<string, string>;
  export default content;
}

// 네이버 검색광고 전환추적(wcs.js)
interface Window {
  wcs_add?: Record<string, string>;
  wcs?: {
    inflow: (url?: string) => void;
    trans: (conv: { type: string; value?: string }) => void;
  };
  wcs_do?: (nasa?: Record<string, unknown>) => void;
  _nasa?: Record<string, unknown>;
}
