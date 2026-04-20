import type { Metadata } from 'next';
import PastLifeClient from './PastLifeClient';

export const metadata: Metadata = {
  title: '전생 직업 테스트',
  description: '내가 전생에 어떤 직업이었을까? 귀족·학자·농부·방랑자·예술가·현자. 6문항으로 알아보세요.',
};

export default function Page() {
  return <PastLifeClient />;
}
