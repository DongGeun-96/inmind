import type { BoardType } from '@/types/database';
import type { CuratedResource } from '@/data/curated-hubs';

type CurationRule = {
  news: string[];
  youtube: string[];
  required: string[];
  excluded: string[];
  preferredSources: string[];
};

const CURATION_RULES: Partial<Record<BoardType, CurationRule>> = {
  healing_food: {
    news: ['수면 식습관 정신건강', '장 건강 정신건강', '카페인 불안 수면'],
    youtube: ['불안 카페인 줄이는 법 정신건강의학과', '수면에 좋은 식습관 영양사'],
    required: ['수면', '식습관', '영양', '장 건강', '카페인', '정신건강', '스트레스', '불안'],
    excluded: ['맛집', '광고', '주식', '분양', '정치', '연예'],
    preferredSources: ['헬스조선', '하이닥', '코메디닷컴', '정책브리핑', '질병관리청', '서울대학교병원'],
  },
  healing_book: {
    news: ['독서 마음건강 치유', '심리 에세이 마음챙김 책'],
    youtube: ['마음이 힘들 때 읽는 책 추천', '독서치료 마음건강 책 추천'],
    required: ['독서', '책', '에세이', '마음', '심리', '치유', '마음챙김'],
    excluded: ['주식', '분양', '정치', '범죄', '사건'],
    preferredSources: ['한겨레', '경향신문', '서울신문', '한국일보', '문화일보', '채널예스'],
  },
  healing_movie: {
    news: ['힐링 영화 추천', '잔잔한 드라마 추천', '마음이 편해지는 영화'],
    youtube: ['힐링 영화 추천 리뷰', '잔잔한 드라마 추천 힐링'],
    required: ['영화', '드라마', '힐링', '추천', '리뷰', '위로'],
    excluded: ['박스오피스', '주식', '정치', '범죄'],
    preferredSources: ['씨네21', '맥스무비', '한겨레', '경향신문', '한국일보'],
  },
  healing_place: {
    news: ['산림치유 숲길 산책', '서울 산책길 숲길 추천', '걷기 정신건강 스트레스'],
    youtube: ['혼자 걷기 좋은 산책 코스', '숲길 산책 힐링 여행지 추천'],
    required: ['산책', '숲', '숲길', '공원', '걷기', '산림치유', '정신건강', '스트레스', '여행지', '둘레길'],
    excluded: ['반려견', '축산', '예술 감상', '부동산', '분양', '주식', '정치', '사건', '사고', '범죄'],
    preferredSources: ['서울특별시', '대한민국 정책브리핑', '정책브리핑', '한국관광공사', '연합뉴스', '헬스조선', '트래비', '여행신문'],
  },
  healing_quote: {
    news: ['위로 문장 에세이', '마음챙김 명언 에세이'],
    youtube: ['위로 문장 낭독', '마음이 편해지는 글귀 낭독'],
    required: ['위로', '문장', '에세이', '낭독', '명언', '마음'],
    excluded: ['정치', '주식', '분양', '사건', '범죄'],
    preferredSources: ['한겨레', '경향신문', '한국일보', '채널예스', '서울신문'],
  },
  healing_etc: {
    news: ['취미 스트레스 완화', '음악 스트레스 완화 마음건강'],
    youtube: ['마음이 편해지는 음악 플레이리스트', '스트레스 완화 취미 추천'],
    required: ['취미', '음악', '스트레스', '완화', '마음건강', '예술', '루틴'],
    excluded: ['주식', '분양', '정치', '사건', '범죄'],
    preferredSources: ['헬스조선', '하이닥', '코메디닷컴', '정책브리핑', '한겨레', '경향신문'],
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

function hostname(url: string): string | null {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return null;
  }
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

function qualityScore(resource: CuratedResource, rule: CurationRule): number {
  const haystack = `${resource.title} ${resource.summary} ${resource.source}`.toLowerCase();
  if (rule.excluded.some((word) => haystack.includes(word.toLowerCase()))) return -100;

  let score = 0;
  for (const word of rule.required) {
    if (haystack.includes(word.toLowerCase())) score += 2;
  }
  for (const source of rule.preferredSources) {
    if (resource.source.includes(source)) score += 3;
  }
  if (resource.title.length >= 12) score += 1;
  return score;
}

function filterQuality(resources: CuratedResource[], rule: CurationRule) {
  return resources
    .map((resource) => ({ resource, score: qualityScore(resource, rule) }))
    .filter(({ score }) => score >= 5)
    .sort((a, b) => b.score - a.score)
    .map(({ resource }) => resource);
}

async function fetchNaverNews(query: string, limit: number): Promise<CuratedResource[]> {
  const clientId = process.env.NAVER_CLIENT_ID || process.env.NEXT_PUBLIC_NAVER_CLIENT_ID;
  const clientSecret = process.env.NAVER_CLIENT_SECRET;
  if (!clientId || !clientSecret) return [];

  const url = new URL('https://openapi.naver.com/v1/search/news.json');
  url.searchParams.set('query', query);
  url.searchParams.set('display', String(limit));
  url.searchParams.set('sort', 'sim');

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

  return (json.items || []).slice(0, limit).map((item) => {
    const url = item.originallink || item.link || `https://search.naver.com/search.naver?where=news&query=${encodeURIComponent(query)}`;
    return {
      type: 'news' as const,
      title: stripHtml(item.title || query),
      source: hostname(url) || '네이버 뉴스',
      url,
      summary: compactSummary(item.description || '', `${query} 관련 최신 기사입니다.`),
      tags: ['뉴스', ...query.split(/\s+/).slice(0, 2)],
      hideImage: true,
    };
  });
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
      hideImage: true,
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
  const rule = CURATION_RULES[boardType];
  if (!rule) return [];

  const [newsGroups, youtubeGroups] = await Promise.all([
    Promise.all(rule.news.slice(0, 3).map((query) => fetchNews(query, 5).catch(() => []))),
    Promise.all(rule.youtube.slice(0, 1).map((query) => fetchYoutube(query, 2).catch(() => []))),
  ]);

  const qualityNews = filterQuality(newsGroups.flat(), rule).slice(0, 4);
  const videos = youtubeGroups.flat().slice(0, 2);
  return uniqueResources([...qualityNews, ...videos]).slice(0, 6);
}
