export interface PackageItem {
    package: string;
    example: { name: string; url?: string }[];
}

export interface InquireData {
    seq: number;
    company: string;
    name: string;
    phone: string;
    email: string;
    pw: string;
    title: string;
    package: string; // 저장 형식: '싸바리-2단형' 또는 '커스텀박스' (example 없는 경우)
    amount: string;
    p_size: string | null; // 저장 형식: '200 x 150 x 80'
    contents: string | null;
    c_size: string | null; // 저장 형식: '200 x 150 x 80'
    deadline: string | null;
    budget: string | null;
    content: string | null;
    files: string[] | null;
    status?: string; // '접수완료' | '답변완료'
}
