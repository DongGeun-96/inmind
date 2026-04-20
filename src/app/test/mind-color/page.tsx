import type { Metadata } from 'next';
import MindColorClient from './MindColorClient';

export const metadata: Metadata = {
  title: '내 마음 컬러 테스트',
  description: '지금의 마음 상태를 한 가지 색으로 표현해 보는 감성 테스트입니다.',
};

export default function Page() {
  return <MindColorClient />;
}
