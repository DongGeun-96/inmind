import type { Metadata } from 'next';
import SelfEsteemClient from './SelfEsteemClient';

export const metadata: Metadata = {
  title: '자존감 자가진단 (RSE)',
  description: '로젠버그 자존감 척도(RSE) 기반 자가진단으로 현재 자존감 수준을 확인해 보세요.',
};

export default function SelfEsteemPage() {
  return <SelfEsteemClient />;
}
