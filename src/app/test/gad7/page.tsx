import type { Metadata } from 'next';
import GAD7Client from './GAD7Client';

export const metadata: Metadata = {
  title: '불안 자가진단 (GAD-7)',
  description: 'GAD-7 불안 자가진단 검사. 최근 2주간의 불안 증상을 확인해 보세요.',
};

export default function GAD7Page() {
  return <GAD7Client />;
}
