import type { Metadata } from 'next';
import ComfortStyleClient from './ComfortStyleClient';

export const metadata: Metadata = {
  title: '위로 받는 방식 테스트',
  description: '공감형·조언형·행동형·함께있기형 중 나에게 맞는 위로 방식을 찾는 테스트입니다.',
};

export default function Page() {
  return <ComfortStyleClient />;
}
