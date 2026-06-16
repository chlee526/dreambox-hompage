'use client';

import { useState, useTransition } from 'react';
import { updateInquireStatus } from '@/app/admin/contact/actions';

interface StatusControlProps {
    seq: number;
    status: string;
}

export default function StatusControl({ seq, status: initialStatus }: StatusControlProps) {
    const [status, setStatus] = useState(initialStatus);
    const [isPending, startTransition] = useTransition();

    const handleToggle = () => {
        const next = status === '답변완료' ? '접수완료' : '답변완료';
        startTransition(async () => {
            await updateInquireStatus(seq, next);
            setStatus(next);
        });
    };

    return (
        <div className="status-area">
            <span className={`status-badge ${status === '답변완료' ? 'is-done' : 'is-received'}`}>{status}</span>
            <button className={`status-change-btn ${status === '답변완료' ? 'is-revert' : ''}`} onClick={handleToggle} disabled={isPending}>
                {isPending ? '처리 중...' : status === '답변완료' ? '접수완료로 변경' : '답변완료로 변경'}
            </button>
        </div>
    );
}
