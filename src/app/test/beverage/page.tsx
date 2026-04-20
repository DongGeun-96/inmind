import type { Metadata } from 'next';
import BeverageClient from './BeverageClient';

export const metadata: Metadata = {
  title: '나를 음료로 표현한다면? 음료 성격 테스트',
  description: '아메리카노·라떼·밀크쉐이크·차·탄산·와인 중 내 성격은? 5문항 테스트.',
};

export default function Page() {
  return <BeverageClient />;
}
