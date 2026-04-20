import type { Metadata } from 'next';
import InsomniaClient from './InsomniaClient';

export const metadata: Metadata = {
  title: '불면증 자가진단 (ISI)',
  description: '지난 2주간의 수면 상태를 평가하는 ISI(불면증 심각도 지표) 자가진단입니다.',
};

export default function InsomniaPage() {
  return <InsomniaClient />;
}
