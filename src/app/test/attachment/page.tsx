import type { Metadata } from 'next';
import AttachmentClient from './AttachmentClient';

export const metadata: Metadata = {
  title: '애착유형 테스트',
  description: '연애와 관계에서 나의 애착 스타일(안정/불안/회피/혼란)을 확인하는 테스트입니다.',
};

export default function Page() {
  return <AttachmentClient />;
}
