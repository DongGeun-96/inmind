import type { BoardType } from '@/types/database';
import type { CuratedResource } from '@/data/curated-hubs';

const QUERY_BY_BOARD: Partial<Record<BoardType, { news: string[]; youtube: string[] }>> = {
  healing_food: {
    news: ['수면 식습관 정신건강', '장 건강 정신건강', '카페인 불안 수면'],
    youtube: ['불안 카페인 줄이는 법 정신건강의학과', '수면에 좋은 식습관 영양사'],
  },
  healing_book: {
    news: ['독서 마음건강 치유', '심리 에세이 마음챙김 책'],
    youtube: ['마음이 힘들 때 읽는 책 추천', '독서치료 마음건강 책 추천'],
  },
  healing_movie: {
    news: ['힐링 영화 드라마 추천', '마음이 편해지는 영화 추천'],
    youtube: ['힐링 영화 추천 리뷰', '잔잔한 드라마 추천 힐링'],
  },
  healing_place: {
    news: ['산책 정신건강 스트레스', '숲길 산책 마음건강', '혼자 걷기 좋은 산책 코스'],
    youtube: ['혼자 걷기 좋은 산책 코스', '숲길 산책 힐링 여행지 추천'],
  },
  healing_quote: {
    news: ['위로 문장 에세이', '마음챙김 명언 에세이'],
    youtube: ['위로 문장 낭독', '마음이 편해지는 글귀 낭독'],
  },
  healing_etc: {
    news: ['취미 스트레스 완화', '음악 스트레스 완화 마음건강'],
    youtube: ['마음이 편해지는 음악 플레이리스트', '스트레스 완화 취미 추천'],
  },
};

function stripHtml(value: string): string {
  return value
    .replace(/<[^>]+>/g, '')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();
}

function decodeXml(value: string): string {
  return stripHtml(value)
    .replace(/<!\[CDATA\[/g, '')
    .replace(/\]\]>/g, '')
    .trim();
}

function textBetween(block: string, tag: string): string | null {
  const match = block.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`, 'i'));
  return match ? decodeXml(match[1]) : null;
}

function sourceBetween(block: string): string | null {
  const match = block.match(/<source(?:\s[^>]*)?>([\s\S]*?)<\/source>/i);
  return match ? decodeXml(match[1]) : null;
}

function compactSummary(summary: string, fallback: string): string {
  const cleaned = stripHtml(summary || fallback);
  if (!cleaned) return fallback;
  return cleaned.length > 120 ? `${cleaned.slice(0, 117)}...` : cleaned;
}

function uniqueResources(resources: CuratedResource[]) {
  const seen = new Set<string>();
  return resources.filter((resource) => {
    const key = `${resource.type}:${resource.url || resource.title}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

async function fetchNaverNews(query: string, limit: number): Promise<CuratedResource[]> {
  const clientId = process.env.NAVER_CLIENT_ID || process.env.NEXT_PUBLIC_NAVER_CLIENT_ID;
  const clientSecret = process.env.NAVER_CLIENT_SECRET;
  if (!clientId || !clientSecret) return [];

  const url = new URL('https://openapi.naver.com/v1/search/news.json');
  url.searchParams.set('query', query);
  url.searchParams.set('display', String(limit));
  url.searchParams.set('sort', 'date');

  const response = await fetch(url, {
    headers: {
      'X-Naver-Client-Id': clientId,
      'X-Naver-Client-Secret': clientSecret,
    },
    next: { revalidate: 60 * 60 * 6 },
  });
  if (!response.ok) return [];

  const json = (await response.json()) as {
    items?: Array<{ title?: string; originallink?: string; link?: string; description?: string }>;
  };

  return (json.items || []).slice(0, limit).map((item) => ({
    type: 'news' as const,
    title: stripHtml(item.title || query),
    source: '네이버 뉴스',
    url: item.originallink || item.link || `https://search.naver.com/search.naver?where=news&query=${encodeURIComponent(query)}`,
    summary: compactSummary(item.description || '', `${query} 관련 최신 기사입니다.`),
    tags: ['뉴스', ...query.split(/\s+/).slice(0, 2)],
  }));
}

async function fetchGoogleNewsRss(query: string, limit: number): Promise<CuratedResource[]> {
  const url = new URL('https://news.google.com/rss/search');
  url.searchParams.set('q', query);
  url.searchParams.set('hl', 'ko');
  url.searchParams.set('gl', 'KR');
  url.searchParams.set('ceid', 'KR:ko');

  const response = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 InMindCurator/1.0' },
    next: { revalidate: 60 * 60 * 6 },
  });
  if (!response.ok) return [];

  const xml = await response.text();
  const items = xml.match(/<item>[\s\S]*?<\/item>/gi) || [];
  return items.slice(0, limit).map((item) => {
    const title = textBetween(item, 'title') || query;
    const link = textBetween(item, 'link') || `https://news.google.com/search?q=${encodeURIComponent(query)}&hl=ko&gl=KR&ceid=KR:ko`;
    const source = sourceBetween(item) || 'Google 뉴스';
    const description = textBetween(item, 'description') || `${query} 관련 최신 기사입니다.`;

    return {
      type: 'news' as const,
      title,
      source,
      url: link,
      summary: compactSummary(description, `${query} 관련 최신 기사입니다.`),
      tags: ['뉴스', ...query.split(/\s+/).slice(0, 2)],
    };
  });
}

async function fetchNews(query: string, limit: number): Promise<CuratedResource[]> {
  const naverItems = await fetchNaverNews(query, limit);
  if (naverItems.length > 0) return naverItems;
  return fetchGoogleNewsRss(query, limit);
}

async function fetchYoutube(query: string, limit: number): Promise<CuratedResource[]> {
  const key = process.env.YOUTUBE_API_KEY || process.env.GOOGLE_YOUTUBE_API_KEY || process.env.GOOGLE_API_KEY;
  if (!key) return [];

  const url = new URL('https://www.googleapis.com/youtube/v3/search');
  url.searchParams.set('part', 'snippet');
  url.searchParams.set('type', 'video');
  url.searchParams.set('maxResults', String(limit));
  url.searchParams.set('q', query);
  url.searchParams.set('regionCode', 'KR');
  url.searchParams.set('relevanceLanguage', 'ko');
  url.searchParams.set('safeSearch', 'moderate');
  url.searchParams.set('key', key);

  const response = await fetch(url, { next: { revalidate: 60 * 60 * 12 } });
  if (!response.ok) return [];

  const json = (await response.json()) as {
    items?: Array<{
      id?: { videoId?: string };
      snippet?: {
        title?: string;
        description?: string;
        channelTitle?: string;
        thumbnails?: { medium?: { url?: string }; high?: { url?: string }; default?: { url?: string } };
      };
    }>;
  };

  return (json.items || [])
    .filter((item) => item.id?.videoId)
    .slice(0, limit)
    .map((item) => {
      const videoId = item.id!.videoId!;
      const snippet = item.snippet || {};
      return {
        type: 'youtube' as const,
        title: stripHtml(snippet.title || query),
        source: snippet.channelTitle || 'YouTube',
        url: `https://www.youtube.com/watch?v=${videoId}`,
        summary: compactSummary(snippet.description || '', `${query} 관련 영상입니다.`),
        tags: ['영상', ...query.split(/\s+/).slice(0, 2)],
        imageUrl: snippet.thumbnails?.high?.url || snippet.thumbnails?.medium?.url || snippet.thumbnails?.default?.url,
        imageAlt: stripHtml(snippet.title || query),
      };
    });
}

export async function getLiveCuratedResources(boardType: BoardType): Promise<CuratedResource[]> {
  const queries = QUERY_BY_BOARD[boardType];
  if (!queries) return [];

  const [newsGroups, youtubeGroups] = await Promise.all([
    Promise.all(queries.news.slice(0, 2).map((query) => fetchNews(query, 2).catch(() => []))),
    Promise.all(queries.youtube.slice(0, 1).map((query) => fetchYoutube(query, 2).catch(() => []))),
  ]);

  return uniqueResources([...newsGroups.flat(), ...youtubeGroups.flat()]).slice(0, 6);
}
