import type { Metadata } from 'next';
import FoodTypeClient from './FoodTypeClient';

export const metadata: Metadata = {
  title: '나를 음식으로 표현한다면? 음식 성격 테스트',
  description: '흰쌀밥·라면·마라탕·케이크·치킨·김밥 중 나는 어떤 음식? 6문항으로 알아보는 MZ 음식 성격 테스트.',
};

export default function Page() {
  return <FoodTypeClient />;
}
