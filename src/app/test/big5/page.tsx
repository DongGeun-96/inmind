import type { Metadata } from 'next';
import Big5Client from './Big5Client';

export const metadata: Metadata = {
  title: 'Big5 성격검사 간이판',
  description: '10문항으로 5가지 성격 요인을 확인하는 Big5 간이 테스트입니다.',
};

export default function Page() {
  return <Big5Client />;
}
