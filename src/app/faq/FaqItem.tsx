'use client';

import { useState } from 'react';
import ChevronIcon from '@/components/ui/ChevronIcon';

interface FaqItemProps {
    question: string;
    answer: string;
}

export default function FaqItem({ question, answer }: FaqItemProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <li className={`faq-list-item${isOpen ? ' is-open' : ''}`}>
            <div className="question" onClick={() => setIsOpen((prev) => !prev)}>
                <span>{question}</span>
            </div>
            <div className="answer">
                <div className="answer-body">
                    <p>{answer}</p>
                </div>
            </div>
            <button className="toggle-btn">
                <ChevronIcon direction={isOpen ? 'up' : 'down'} color="#252525" />
            </button>
        </li>
    );
}
