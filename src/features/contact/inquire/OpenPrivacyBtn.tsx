'use client';

export default function OpenPrivacyBtn() {
    return (
        <button
            type="button"
            className="full-content"
            onClick={() => window.dispatchEvent(new CustomEvent('openPrivacyModal'))}
        >
            [내용보기]
        </button>
    );
}
