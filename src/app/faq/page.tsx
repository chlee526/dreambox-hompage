import React from 'react';
import type { Metadata } from 'next';
import FaqItem from './FaqItem';

export const metadata: Metadata = {
    title: { absolute: '자주 묻는 질문 | 박스제작 최소수량·샘플·납기 안내 - 드림박스' },
    description: '구조설계 샘플이 무료인지, 최소 주문 수량은 몇 개인지, 제작 기간은 어떻게 되는지, 디자인 파일 준비 방법 등 자주 묻는 질문을 모았습니다.',
    keywords: ['박스제작 최소수량', '박스제작 납기', '박스제작 문의', '패키지 제작기간', '박스 무료샘플', '구조설계 샘플'],
};

const faqList = [
    {
        question: '어떤 형태의 패키지 제작이 가능한가요?',
        answer: '단상자, 싸바리, 쇼핑백, 엽서 및 리플렛 등 다양한 형태의 패키지 제작이 가능하며, 제품에 맞는 맞춤 제작도 가능합니다.\n형태에 상관없이 문의 주시면 친절하게 상담해드립니다.',
    },
    {
        question: '최소 주문 수량이 있나요?',
        answer: '최소 수량 제한 없이 소량 맞춤 제작이 가능합니다.\n 다만 수량과 관계없이 기본 제작 비용이 발생하며, 수량에 따라 단가가 달라지니 상담 후 확인해드립니다.',
    },
    {
        question: '샘플 비용이 발생하나요? ',
        answer: '무지·구조 샘플은 기본 무료로 제공됩니다.\n 인쇄가 포함된 샘플은 형태에 따라 비용이 발생할 수 있습니다.',
    },
    {
        question: '견적은 어떻게 받을 수 있나요? ',
        answer: '홈페이지 견적 문의를 통해 제품 정보를 알려주시면 가견적을 먼저 안내드립니다.\n 이후 구조 샘플 확인 및 디자인 완료 후 최종 견적을 안내해드립니다.',
    },
    {
        question: '디자인 작업은 어떻게 진행되나요?',
        answer: '구조 샘플 확인 후 이메일로 도면(칼선)을 제공해드립니다.\n 도면(칼선) 파일에 디자인을 적용한 완성 파일을  전달해주시면 검토 후 인쇄 및 생산을 진행합니다.\n *전달해주신 데이터의 오류는 당사에서 책임지지 않으므로, 발송 전 반드시 꼼꼼히 확인해주시기 바랍니다.',
    },
    {
        question: '제작 기간은 얼마나 걸리나요?',
        answer: '구조 샘플 확인 및 디자인 완료 후 영업일 기준 평균 10~15일 소요됩니다.\n 수량 및 작업 난이도에 따라 변동될 수 있으며, 납기가 촉박한 경우 상담 시 말씀해주세요.',
    },
    {
        question: '결제는 어떻게 진행되나요?',
        answer: '양산 확정 시 선수금 50% 입금 후 생산을 시작하며, 납품 완료 후 잔금 50%를 납부하시면 됩니다.',
    },
];

export default async function FaqPage() {
    return (
        <section className="l-page page-faq">
            <div className="l-inner">
                <div className="page-header">
                    <strong className="page-title">FAQ</strong>
                </div>
                <div className="content-wrap">
                    <ul className="faq-list">
                        {faqList.map((item, index) => (
                            <FaqItem key={index} question={item.question} answer={item.answer} />
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
