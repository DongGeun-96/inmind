import type { Metadata } from 'next';
import AnimalFaceClient from './AnimalFaceClient';

export const metadata: Metadata = {
  title: '동물상 테스트',
  description: '강아지상? 고양이상? 토끼상? 6문항으로 알아보는 나의 동물상 테스트.',
};

export default function Page() {
  return <AnimalFaceClient />;
}
