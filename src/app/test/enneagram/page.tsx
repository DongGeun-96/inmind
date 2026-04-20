import type { Metadata } from 'next';
import EnneagramClient from './EnneagramClient';

export const metadata: Metadata = {
  title: '에니어그램 9유형 테스트',
  description: '7문항으로 확인하는 에니어그램 9유형 간이 테스트입니다.',
};

export default function Page() {
  return <EnneagramClient />;
}
