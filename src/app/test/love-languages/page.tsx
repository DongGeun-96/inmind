import type { Metadata } from 'next';
import LoveLanguagesClient from './LoveLanguagesClient';

export const metadata: Metadata = {
  title: '사랑의 언어 테스트',
  description: '5가지 사랑의 언어 중 나에게 가장 강한 언어를 확인하는 테스트입니다.',
};

export default function Page() {
  return <LoveLanguagesClient />;
}
