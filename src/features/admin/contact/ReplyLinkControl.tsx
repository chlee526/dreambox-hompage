'use client';

import { useState, useTransition } from 'react';
import { updateInquireReplyLink } from '@/app/admin/contact/actions';

interface ReplyLinkControlProps {
    seq: number;
    replyLink: string | null;
}

export default function ReplyLinkControl({ seq, replyLink: initialReplyLink }: ReplyLinkControlProps) {
    const [replyLink, setReplyLink] = useState(initialReplyLink ?? '');
    const [inputValue, setInputValue] = useState(initialReplyLink ?? '');
    const [isEditing, setIsEditing] = useState(!initialReplyLink);
    const [isPending, startTransition] = useTransition();

    const handleSave = () => {
        const trimmed = inputValue.trim();
        startTransition(async () => {
            await updateInquireReplyLink(seq, trimmed);
            setReplyLink(trimmed);
            setIsEditing(false);
        });
    };

    const handleCancel = () => {
        setInputValue(replyLink);
        setIsEditing(false);
    };

    return (
        <div className="reply-link-area">
            {isEditing ? (
                <>
                    <input
                        type="url"
                        placeholder="답변 메일 링크를 입력하세요"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        disabled={isPending}
                    />
                    <button className="reply-link-save-btn" onClick={handleSave} disabled={isPending || !inputValue.trim()}>
                        {isPending ? '저장 중...' : '저장'}
                    </button>
                    {replyLink && (
                        <button className="reply-link-cancel-btn" onClick={handleCancel} disabled={isPending}>
                            취소
                        </button>
                    )}
                </>
            ) : (
                <>
                    <a href={replyLink} target="_blank" rel="noopener noreferrer" className="reply-link-value">
                        {replyLink}
                    </a>
                    <button className="reply-link-edit-btn" onClick={() => setIsEditing(true)}>
                        수정
                    </button>
                </>
            )}
        </div>
    );
}
