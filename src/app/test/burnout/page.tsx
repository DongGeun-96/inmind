import type { Metadata } from 'next';
import BurnoutClient from './BurnoutClient';

export const metadata: Metadata = {
  title: '번아웃 자가진단',
  description: '최근 삶의 피로도를 기준으로 번아웃 수준을 확인하는 자가진단 테스트입니다.',
};

export default function BurnoutPage() {
  return <BurnoutClient />;
}
