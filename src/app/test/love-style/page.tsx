import type { Metadata } from 'next';
import LoveStyleClient from './LoveStyleClient';

export const metadata: Metadata = {
  title: '연애 스타일 테스트',
  description: '나의 연애 스타일(열정·친밀·현실·유희)을 가볍게 확인해 보는 테스트입니다.',
};

export default function Page() {
  return <LoveStyleClient />;
}
