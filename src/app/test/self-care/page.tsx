import type { Metadata } from 'next';
import SelfCareClient from './SelfCareClient';

export const metadata: Metadata = {
  title: '자기돌봄 지수 테스트',
  description: '나를 얼마나 잘 챙기고 있는지 확인하는 자기돌봄 지수 테스트입니다.',
};

export default function Page() {
  return <SelfCareClient />;
}
