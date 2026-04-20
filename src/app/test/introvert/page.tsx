import type { Metadata } from 'next';
import IntrovertClient from './IntrovertClient';

export const metadata: Metadata = {
  title: '내향·외향 테스트',
  description: '8문항으로 가볍게 확인하는 내향·외향 성향 테스트입니다.',
};

export default function Page() {
  return <IntrovertClient />;
}
