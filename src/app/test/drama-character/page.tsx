import type { Metadata } from 'next';
import DramaCharacterClient from './DramaCharacterClient';

export const metadata: Metadata = {
  title: '내가 드라마 속 캐릭터라면?',
  description: '주인공·2인자·미스터리·개그조연·빌런·힐링 중 내 드라마 캐릭터는? 5문항 테스트.',
};

export default function Page() {
  return <DramaCharacterClient />;
}
