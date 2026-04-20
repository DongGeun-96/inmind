import type { Metadata } from 'next';
import TestHubTabs from './TestHubTabs';

export const metadata: Metadata = {
  title: '자가진단 & 심리 테스트',
  description:
    '우울·불안·스트레스·자존감·번아웃 같은 심리 자가진단과 MBTI·애착·사랑의 언어·동물상·음식성격 등 재미있는 심리 테스트를 모았어요.',
};

export default function TestHubPage() {
  return <TestHubTabs />;
}
