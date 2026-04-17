import type { Metadata } from 'next';
import './globals.css';
import styles from './layout.module.css';
import TopBar from '@/components/TopBar';
import Navbar from '@/components/Navbar';
import MenuBar from '@/components/MenuBar';
import Footer from '@/components/Footer';
import { CATEGORIES } from '@/types/database';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://in-mind.dev';
const SITE_NAME = '인마인드';
const SITE_DESCRIPTION =
  '소중한 사람이나 반려동물을 잃거나, 심리적 어려움을 겪는 사람들이 공감과 위로를 나눌 수 있는 따뜻한 커뮤니티';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} - 힐링 커뮤니티`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    '힐링 커뮤니티', '마음 치유', '우울증 커뮤니티', '익명 고민상담',
    '반려동물 무지개다리', '상실 극복', '공감과 위로', '정신건강',
    '우울할때 이야기할 곳', '심리상담', '감정 기록', '회복 후기',
    '고민 나누기', '힐링', '인마인드',
  ],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    siteName: SITE_NAME,
    title: `${SITE_NAME} - 힐링 커뮤니티`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} - 힐링 커뮤니티`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: SITE_URL,
    types: {
      'application/rss+xml': `${SITE_URL}/feed.xml`,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || undefined,
    other: {
      'naver-site-verification': process.env.NEXT_PUBLIC_NAVER_VERIFICATION || '',
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  inLanguage: 'ko',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <TopBar />
        <Navbar />
        <MenuBar categories={CATEGORIES} />
        <main className={styles.main}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
