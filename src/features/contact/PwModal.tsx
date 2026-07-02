'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { verifyInquirePassword } from './verifyInquirePassword';

interface PwModalProps {
    seq: number;
    onClose: () => void;
}

export default function PwModal({ seq, onClose }: PwModalProps) {
    const router = useRouter();
    const [pw, setPw] = useState('');
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const mouseDownTarget = useRef<EventTarget | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(false);

        const isValid = await verifyInquirePassword(seq, pw);
        setIsLoading(false);

        if (isValid) {
            router.push(`/contact/${seq}`);
        } else {
            setError(true);
        }
    };

    return (
        <div
            className="pw-modal-overlay"
            onMouseDown={(e) => {
                mouseDownTarget.current = e.target;
            }}
            onClick={(e) => {
                if (mouseDownTarget.current === e.currentTarget) onClose();
            }}
        >
            <div className="pw-modal" onClick={(e) => e.stopPropagation()}>
                <div className="pw-modal-header">
                    <strong>비밀번호 확인</strong>
                    <button type="button" onClick={onClose}>
                        ✕
                    </button>
                </div>
                <form className="pw-modal-body" onSubmit={handleSubmit}>
                    <p>문의 등록 시 입력한 비밀번호를 입력해주세요.</p>
                    <input type="password" value={pw} onChange={(e) => setPw(e.target.value)} placeholder="비밀번호" autoFocus />
                    {error && <span className="error-msg">비밀번호가 일치하지 않습니다.</span>}
                    <div className="pw-modal-btns">
                        <button type="button" onClick={onClose}>
                            취소
                        </button>
                        <button type="submit" disabled={!pw || isLoading}>
                            {isLoading ? '확인 중...' : '확인'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
