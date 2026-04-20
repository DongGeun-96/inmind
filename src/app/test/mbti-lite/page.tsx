import type { Metadata } from 'next';
import MbtiLiteClient from './MbtiLiteClient';

export const metadata: Metadata = {
  title: 'MBTI 간이판 테스트',
  description: '12문항으로 빠르게 확인하는 MBTI 간이판 테스트입니다.',
};

export default function Page() {
  return <MbtiLiteClient />;
}
