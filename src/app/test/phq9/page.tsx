import type { Metadata } from 'next';
import PHQ9Client from './PHQ9Client';

export const metadata: Metadata = {
  title: '우울증 자가진단 (PHQ-9)',
  description: 'PHQ-9 우울증 자가진단 검사. 최근 2주간의 기분 상태를 확인해 보세요.',
};

export default function PHQ9Page() {
  return <PHQ9Client />;
}
