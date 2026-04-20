import type { Metadata } from 'next';
import BreakupRecoveryClient from './BreakupRecoveryClient';

export const metadata: Metadata = {
  title: '이별 회복 지수 테스트',
  description: '최근 이별 이후의 감정·일상 상태를 점검하는 간이 회복 지수 테스트입니다.',
};

export default function Page() {
  return <BreakupRecoveryClient />;
}
