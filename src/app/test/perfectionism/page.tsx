import type { Metadata } from 'next';
import PerfectionismClient from './PerfectionismClient';

export const metadata: Metadata = {
  title: '완벽주의 성향 테스트',
  description: '완벽주의 성향이 내 삶에 얼마나 영향을 주는지 확인하는 간이 테스트입니다.',
};

export default function Page() {
  return <PerfectionismClient />;
}
