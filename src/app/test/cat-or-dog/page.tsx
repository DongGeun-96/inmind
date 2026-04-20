import type { Metadata } from 'next';
import CatOrDogClient from './CatOrDogClient';

export const metadata: Metadata = {
  title: '강아지상 vs 고양이상 성격 테스트',
  description: '나는 댕댕이형? 냥냥이형? 8문항으로 알아보는 성격 동물 테스트.',
};

export default function Page() {
  return <CatOrDogClient />;
}
