import type { Metadata } from 'next';
import StressClient from './StressClient';

export const metadata: Metadata = {
  title: '스트레스 자가진단 (PSS-10)',
  description: '지난 한 달간의 스트레스 수준을 확인하는 PSS-10 자가진단 테스트입니다.',
};

export default function StressPage() {
  return <StressClient />;
}
