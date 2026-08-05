'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PackageSelect from './PackageSelect';
import FileUpload from '@/components/ui/FileUpload';
import OpenPrivacyBtn from './OpenPrivacyBtn';
import { createBrowserSupabaseClient } from '@/lib/supabase/client';
import type { PackageItem, InquireData } from '@/types/contactTypes';

interface InquireFormProps {
    packageList: PackageItem[];
    initialData?: InquireData;
    adminMode?: boolean;
}

const REQUIRED_FIELDS = ['company', 'name', 'phone', 'email', 'pw', 'title', 'amount'] as const;
type RequiredField = (typeof REQUIRED_FIELDS)[number];

// DB 저장 형식 '200 x 150 x 80'을 입력 필드 배열로 파싱
const parseSizes = (val: string | null) => {
    if (!val) return ['', '', ''];
    const parts = val.split(' x ');
    return [parts[0] ?? '', parts[1] ?? '', parts[2] ?? ''];
};

// Supabase Storage에 파일 업로드 후 public URL 배열 반환
async function uploadFiles(files: File[]): Promise<string[]> {
    if (files.length === 0) return [];
    const supabase = createBrowserSupabaseClient();
    const urls: string[] = [];
    for (const file of files) {
        // 한글 등 특수문자가 포함된 파일명은 Storage 경로 오류가 발생하므로 치환
        const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
        const path = `${Date.now()}_${Math.random().toString(36).slice(2)}_${safeName}`;
        const { data, error } = await supabase.storage.from('inquire-files').upload(path, file);
        if (!error && data) {
            const { data: { publicUrl } } = supabase.storage.from('inquire-files').getPublicUrl(data.path);
            urls.push(publicUrl);
        }
    }
    return urls;
}

export default function InquireForm({ packageList, initialData, adminMode = false }: InquireFormProps) {
    const router = useRouter();
    const isEdit = !!initialData;

    const [fields, setFields] = useState<Record<RequiredField, string>>({
        company: initialData?.company ?? '',
        name: initialData?.name ?? '',
        phone: initialData?.phone ?? '',
        email: initialData?.email ?? '',
        pw: initialData?.pw ?? '',
        title: initialData?.title ?? '',
        amount: initialData?.amount ?? '',
    });
    const [selectedPackage, setSelectedPackage] = useState<string | null>(initialData?.package ?? null);
    const [policyChecked, setPolicyChecked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
    const [existingFiles, setExistingFiles] = useState<string[]>(initialData?.files ?? []);

    const [pSizeFields, setPSizeFields] = useState(parseSizes(initialData?.p_size ?? null));
    const [cSizeFields, setCSizeFields] = useState(parseSizes(initialData?.c_size ?? null));
    const [contents, setContents] = useState(initialData?.contents ?? '');
    const [deadline, setDeadline] = useState(initialData?.deadline ?? '');
    const [budget, setBudget] = useState(initialData?.budget ?? '');
    const [content, setContent] = useState(initialData?.content ?? '');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (REQUIRED_FIELDS.includes(name as RequiredField)) {
            setFields((prev) => ({ ...prev, [name]: value }));
        }
    };

    const currentPSize = pSizeFields.filter(Boolean).join(' x ');
    const currentCSize = cSizeFields.filter(Boolean).join(' x ');

    // 수정 모드에서 원본 데이터 대비 변경 여부 확인
    const isChanged =
        fields.company !== initialData?.company ||
        fields.name !== initialData?.name ||
        fields.phone !== initialData?.phone ||
        fields.email !== initialData?.email ||
        fields.title !== initialData?.title ||
        fields.amount !== initialData?.amount ||
        selectedPackage !== initialData?.package ||
        currentPSize !== (initialData?.p_size ?? '') ||
        currentCSize !== (initialData?.c_size ?? '') ||
        contents !== (initialData?.contents ?? '') ||
        deadline !== (initialData?.deadline ?? '') ||
        budget !== (initialData?.budget ?? '') ||
        content !== (initialData?.content ?? '') ||
        existingFiles.length !== (initialData?.files?.length ?? 0) ||
        attachedFiles.length > 0;

    const isValid =
        REQUIRED_FIELDS.every((key) => fields[key].trim() !== '') &&
        selectedPackage !== null &&
        (isEdit ? isChanged : policyChecked);

    const handleDelete = async () => {
        if (!confirm('견적문의를 삭제하시겠습니까?')) return;
        const supabase = createBrowserSupabaseClient();
        const { error } = await supabase.from('inquire').delete().eq('seq', initialData!.seq);
        if (error) {
            alert('삭제에 실패했습니다. 다시 시도해 주세요.');
        } else {
            router.push('/admin/contact');
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isValid || isLoading) return;

        setIsLoading(true);

        const uploadedUrls = await uploadFiles(attachedFiles);
        const allFiles = [...existingFiles, ...uploadedUrls];

        const payload = {
            company: fields.company,
            name: fields.name,
            phone: fields.phone,
            email: fields.email,
            title: fields.title,
            package: selectedPackage!,
            amount: fields.amount,
            p_size: currentPSize || null,
            contents: contents.trim() || null,
            c_size: currentCSize || null,
            deadline: deadline.trim() || null,
            budget: budget.trim() || null,
            content: content.trim() || null,
            files: allFiles.length > 0 ? allFiles : null,
        };

        const supabase = createBrowserSupabaseClient();
        let error;
        if (isEdit) {
            ({ error } = await supabase.from('inquire').update(payload).eq('seq', initialData!.seq));
        } else {
            ({ error } = await supabase.from('inquire').insert([{ ...payload, pw: fields.pw }]));
        }

        setIsLoading(false);

        if (error) {
            alert(isEdit ? '수정에 실패했습니다. 다시 시도해 주세요.' : '문의 등록에 실패했습니다. 다시 시도해 주세요.');
        } else {
            if (!isEdit && window.wcs) {
                window.wcs_add = window.wcs_add ?? {};
                window.wcs_add['wa'] = 's_54bed3cebebc';
                window.wcs.trans({ type: 'lead' });
            }
            alert(isEdit ? '수정이 완료되었습니다.' : '문의가 등록되었습니다.\n빠른 시일 내에 답변드리겠습니다.');
            router.push('/contact');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="info-item default">
                <div className="header">고객 기본 정보</div>
                <div className="row">
                    <div className="row-item w-[50%]">
                        <strong className="require">업체명</strong>
                        <input type="text" name="company" placeholder="업체명 or 개인" value={fields.company} onChange={handleChange} />
                    </div>
                    <div className="row-item w-[50%]">
                        <strong className="require">이름</strong>
                        <input type="text" name="name" placeholder="담당자명 / 직책" value={fields.name} onChange={handleChange} />
                    </div>
                </div>
                <div className="row">
                    <div className="row-item w-[33%]">
                        <strong className="require">연락처</strong>
                        <input type="text" name="phone" value={fields.phone} onChange={handleChange} />
                    </div>
                    <div className="row-item w-[33%]">
                        <strong className="require">이메일</strong>
                        <input type="email" name="email" value={fields.email} onChange={handleChange} />
                    </div>
                    <div className="row-item w-[33%]">
                        <strong className="require">비밀번호</strong>
                        <input type="text" name="pw" placeholder="수정/삭제 시 필요" value={fields.pw} readOnly={isEdit} onChange={isEdit ? undefined : handleChange} />
                    </div>
                </div>
            </div>

            <div className="info-item inquire">
                <div className="header">문의 정보</div>
                <div className="row">
                    <div className="row-item w-[100%]">
                        <strong className="require">제목</strong>
                        <input type="text" name="title" value={fields.title} onChange={handleChange} />
                    </div>
                </div>
                <div className="row">
                    <div className="row-item w-[100%] is-package">
                        <strong className="require">패키지 형태</strong>
                        <PackageSelect packageList={packageList} initialValue={initialData?.package} onPackageChange={setSelectedPackage} />
                    </div>
                </div>
                <div className="row">
                    <div className="row-item w-[50%]">
                        <strong className="require">제작 수량</strong>
                        <input type="text" name="amount" placeholder="제작 수량에 따라 견적 금액 차이가 날 수 있습니다" value={fields.amount} onChange={handleChange} />
                    </div>
                    <div className="row-item w-[50%]">
                        <strong>패키지 사이즈</strong>
                        <input type="text" placeholder="장(가로)mm" value={pSizeFields[0]} onChange={(e) => setPSizeFields((p) => [e.target.value, p[1], p[2]])} />
                        <input type="text" placeholder="폭(세로)mm" value={pSizeFields[1]} onChange={(e) => setPSizeFields((p) => [p[0], e.target.value, p[2]])} />
                        <input type="text" placeholder="고(높이)mm" value={pSizeFields[2]} onChange={(e) => setPSizeFields((p) => [p[0], p[1], e.target.value])} />
                    </div>
                </div>
                <div className="row">
                    <div className="row-item w-[50%]">
                        <strong>내용물 종류</strong>
                        <input type="text" placeholder="정확한 내용물을 기재해주시면 견적 산출에 도움이 됩니다" value={contents} onChange={(e) => setContents(e.target.value)} />
                    </div>
                    <div className="row-item w-[50%]">
                        <strong>내용물 사이즈</strong>
                        <input type="text" placeholder="장(가로)mm" value={cSizeFields[0]} onChange={(e) => setCSizeFields((p) => [e.target.value, p[1], p[2]])} />
                        <input type="text" placeholder="폭(세로)mm" value={cSizeFields[1]} onChange={(e) => setCSizeFields((p) => [p[0], e.target.value, p[2]])} />
                        <input type="text" placeholder="고(높이)mm" value={cSizeFields[2]} onChange={(e) => setCSizeFields((p) => [p[0], p[1], e.target.value])} />
                    </div>
                </div>
                <div className="row">
                    <div className="row-item w-[50%]">
                        <strong>납기 희망일</strong>
                        <input type="text" placeholder="ex)2026년 01월 01일" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
                    </div>
                    <div className="row-item w-[50%]">
                        <strong>예산</strong>
                        <input type="text" placeholder="예산을 기재해 주시면 예산에 맞춘 견적산출 및 제안이 가능합니다" value={budget} onChange={(e) => setBudget(e.target.value)} />
                    </div>
                </div>
                <div className="row">
                    <div className="row-item w-[100%]">
                        <strong>문의 내용</strong>
                        <textarea placeholder="제작에 관한 궁금하신 내용 및 전달 사항을 자유롭게 적어주세요" value={content} onChange={(e) => setContent(e.target.value)} />
                    </div>
                </div>
                <div className="row is-file">
                    <div className="row-item w-[100%]">
                        <strong>첨부파일</strong>
                        <div className="file-upload">
                            <FileUpload onFilesChange={setAttachedFiles} />
                            {existingFiles.length > 0 && (
                                <ul className="file-list">
                                    {existingFiles.map((url, i) => {
                                        const name = decodeURIComponent(
                                            url.split('/').pop()?.replace(/^\d+_[a-z0-9]+_/, '') ?? `파일 ${i + 1}`,
                                        );
                                        return (
                                            <li key={url} className="file-item">
                                                <a href={url} target="_blank" rel="noopener noreferrer" className="file-name">
                                                    {name}
                                                </a>
                                                <button type="button" className="file-remove" onClick={() => setExistingFiles((prev) => prev.filter((f) => f !== url))}>
                                                    ✕
                                                </button>
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}
                        </div>
                    </div>
                    <span className="info-msg">*10MB 넘는 첨부파일은 홈페이지 하단의 이메일로 전달 부탁드립니다.</span>
                </div>
            </div>

            {!isEdit && (
                <div className="policy-area">
                    <div className="policy">
                        <input id="policy" type="checkbox" checked={policyChecked} onChange={(e) => setPolicyChecked(e.target.checked)} />
                        <label htmlFor="policy">개인정보처리방침을 읽었으며 이에 동의합니다.</label>
                    </div>
                    <OpenPrivacyBtn />
                </div>
            )}

            <div className="form-bottom">
                {adminMode ? (
                    <button type="button" className="form-btn delete" onClick={handleDelete}>
                        삭제
                    </button>
                ) : (
                    <button type="submit" className="form-btn submit" disabled={!isValid || isLoading}>
                        {isLoading ? (isEdit ? '수정 중...' : '등록 중...') : isEdit ? '수정하기' : '문의하기'}
                    </button>
                )}
                <button type="button" className="form-btn list" onClick={() => router.push(adminMode ? '/admin/contact' : '/contact')}>
                    목록
                </button>
            </div>
        </form>
    );
}
