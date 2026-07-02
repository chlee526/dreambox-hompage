'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PwModal from './PwModal';

interface ContactItem {
    seq: number;
    title: string;
    author: string;
    date: string;
}

interface ContactTableProps {
    data: ContactItem[];
    perPage?: number;
    detailBasePath?: string; // 설정 시 클릭하면 해당 경로로 바로 이동 (관리자용)
}

const maskName = (name: string) => {
    if (name.length === 2) return name[0] + 'O';
    if (name.length === 3) return name[0] + 'O' + name[2];
    if (name.length === 4) return name[0] + 'OO' + name[3];
    return name;
};

const maskAuthor = (author: string) => {
    if (author.includes(' / ')) {
        const [name, ...rest] = author.split(' / ');
        return maskName(name) + ' / ' + rest.join(' / ');
    }
    const spaceIndex = author.indexOf(' ');
    if (spaceIndex !== -1) {
        return maskName(author.slice(0, spaceIndex)) + author.slice(spaceIndex);
    }
    return maskName(author);
};

const today = new Date().toISOString().slice(0, 10).replace(/-/g, '.');

export default function ContactTable({ data, perPage = 10, detailBasePath }: ContactTableProps) {
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);
    const [inputValue, setInputValue] = useState('');
    const [searchKeyword, setSearchKeyword] = useState('');
    const [modalSeq, setModalSeq] = useState<number | null>(null);

    const handleTitleClick = (seq: number) => {
        if (detailBasePath) {
            router.push(`${detailBasePath}/${seq}`);
        } else {
            setModalSeq(seq);
        }
    };

    const filtered = data.filter((item) => item.title.includes(searchKeyword) || item.author.includes(searchKeyword));
    const totalPages = Math.ceil(filtered.length / perPage);
    const startIndex = (currentPage - 1) * perPage;
    const currentData = filtered.slice(startIndex, startIndex + perPage);

    const handleSearch = () => {
        setSearchKeyword(inputValue);
        setCurrentPage(1);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') handleSearch();
    };

    return (
        <div className="contact-table-wrap">
            <div className="search-area">
                <input placeholder="제목 / 작성자" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={handleKeyDown} />
                <button className="search-btn" onClick={handleSearch}></button>
            </div>
            <table className="contact-table">
                <colgroup>
                    <col className="col-no" />
                    <col className="col-title" />
                    <col className="col-author" />
                    <col className="col-date" />
                </colgroup>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>등록일</th>
                    </tr>
                </thead>
                <tbody>
                    {currentData.map((item) => (
                        <tr key={item.seq}>
                            <td>{item.seq}</td>
                            <td className="title">
                                <span onClick={() => handleTitleClick(item.seq)}>{item.title}</span>
                                {item.date === today && <span className="new-badge">N</span>}
                            </td>
                            <td>{maskAuthor(item.author)}</td>
                            <td>{item.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="inquire-area">
                <button onClick={() => router.push(`/contact/inquire`)}>글쓰기</button>
            </div>

            <div className="pagination">
                <button className="page-btn prev" onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1}>
                    이전
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button key={page} className={`page-btn${currentPage === page ? ' active' : ''}`} onClick={() => setCurrentPage(page)}>
                        {page}
                    </button>
                ))}
                <button className="page-btn next" onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>
                    다음
                </button>
            </div>

            {modalSeq !== null && <PwModal seq={modalSeq} onClose={() => setModalSeq(null)} />}
        </div>
    );
}
