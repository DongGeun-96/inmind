import type { Metadata } from 'next';
import HealingStyleClient from './HealingStyleClient';

export const metadata: Metadata = {
  title: '힐링 유형 테스트',
  description: '내게 가장 잘 맞는 힐링 방식을 찾아주는 유형 테스트입니다.',
};

export default function Page() {
  return <HealingStyleClient />;
}
