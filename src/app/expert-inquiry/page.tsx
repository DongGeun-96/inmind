import type { Metadata } from 'next';
import ExpertInquiryClient from './ExpertInquiryClient';

export const metadata: Metadata = {
  title: '전문가 등록 문의',
  description: '인마인드에 전문가로 등록하고 싶으신가요? 문의를 남겨주세요.',
};

export default function ExpertInquiryPage() {
  return <ExpertInquiryClient />;
}
