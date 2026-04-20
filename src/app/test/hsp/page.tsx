import type { Metadata } from 'next';
import HspClient from './HspClient';

export const metadata: Metadata = {
  title: '민감도 테스트 (HSP)',
  description: '외부 자극과 감정에 얼마나 예민한지 확인하는 HSP(매우 민감한 사람) 간이 테스트입니다.',
};

export default function Page() {
  return <HspClient />;
}
