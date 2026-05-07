import type { BoardType } from '@/types/database';

export type CuratedContentType = 'official' | 'news' | 'youtube' | 'guide';

export interface CuratedResource {
  type: CuratedContentType;
  title: string;
  source: string;
  url: string;
  summary: string;
  tags: string[];
  /** 카드 상단에 쓰는 안전한 사진 썸네일입니다. */
  imageUrl?: string;
  imageAlt?: string;
  /** 실제 썸네일이 없는 외부 수집 자료는 엉뚱한 대체 이미지를 숨깁니다. */
  hideImage?: boolean;
}

export interface CuratedHub {
  eyebrow: string;
  title: string;
  description: string;
  filters: string[];
  highlights: CuratedResource[];
  resources: CuratedResource[];
  guideTitle: string;
  guideParagraphs: string[];
  quickTips: string[];
  keywords: string[];
  relatedBoards: BoardType[];
  disclaimer: string;
}

const naverNews = (query: string) =>
  `https://search.naver.com/search.naver?where=news&query=${encodeURIComponent(query)}`;

const youtubeSearch = (query: string) =>
  `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;

export const CURATED_HUBS: Partial<Record<BoardType, CuratedHub>> = {
  healing_food: {
    eyebrow: '힐링 음식 큐레이션',
    title: '마음이 지칠 때 도움이 되는 음식과 식습관',
    description:
      '우울감, 불안, 수면, 스트레스 완화에 도움이 될 수 있는 식습관 자료와 뉴스, 영상 탐색 링크, 인마인드 커뮤니티 이야기를 한곳에 모았어요.',
    filters: ['전체', '뉴스', '영상', '공식자료', '수면', '스트레스', '장건강', '카페인'],
    highlights: [
      {
        type: 'guide',
        title: '기분이 가라앉을 때는 혈당을 급하게 흔드는 식사를 줄여보세요',
        source: '인마인드 가이드',
        url: '/board/healing_food',
        summary:
          '단 음식이나 카페인으로 버티는 날이 반복되면 수면과 불안이 같이 흔들릴 수 있어요. 한 끼를 완벽하게 바꾸기보다 단백질, 따뜻한 국물, 물 한 잔부터 시작해보세요.',
        tags: ['식습관', '불안', '수면'],
      },
      {
        type: 'news',
        title: '수면과 식습관 관련 최신 뉴스 보기',
        source: '네이버 뉴스 검색',
        url: naverNews('수면 식습관 정신건강'),
        summary:
          '특정 기사를 복제하지 않고, 검색 결과에서 날짜와 출처를 직접 확인할 수 있게 연결합니다.',
        tags: ['뉴스', '수면', '정신건강'],
      },
      {
        type: 'youtube',
        title: '불안과 카페인 조절 영상 찾아보기',
        source: 'YouTube 검색',
        url: youtubeSearch('불안 카페인 줄이는 법 정신건강의학과'),
        summary:
          '의사·영양사·공공기관 채널 위주로 골라볼 수 있도록 검색어를 좁혀둔 영상 탐색 링크입니다.',
        tags: ['영상', '불안', '카페인'],
      },
    ],
    resources: [
      {
        type: 'official',
        title: '식품안전·영양 정보 확인하기',
        source: '식품안전나라',
        url: 'https://www.foodsafetykorea.go.kr/',
        summary: '식품 안전, 영양성분, 식생활 관련 공공 정보를 확인할 수 있는 공식 자료입니다.',
        tags: ['공식자료', '영양', '식품안전'],
      },
      {
        type: 'official',
        title: '건강정보와 생활습관 자료 확인하기',
        source: '국가건강정보포털',
        url: 'https://health.kdca.go.kr/',
        summary: '질병관리청 국가건강정보포털에서 생활습관과 건강 정보를 확인할 수 있어요.',
        tags: ['공식자료', '건강정보'],
      },
      {
        type: 'news',
        title: '장 건강과 정신건강 뉴스 모아보기',
        source: '네이버 뉴스 검색',
        url: naverNews('장 건강 정신건강'),
        summary: '장 건강, 스트레스, 기분 변화 관련 최신 보도를 검색 결과로 확인합니다.',
        tags: ['뉴스', '장건강', '스트레스'],
      },
      {
        type: 'youtube',
        title: '수면에 도움 되는 식습관 영상 찾아보기',
        source: 'YouTube 검색',
        url: youtubeSearch('수면에 좋은 식습관 영양사'),
        summary: '잠들기 전 식사, 카페인, 야식 습관을 다룬 영상을 찾아볼 수 있어요.',
        tags: ['영상', '수면', '식습관'],
      },
    ],
    guideTitle: '음식이 마음에 영향을 주는 이유',
    guideParagraphs: [
      '음식은 감정을 단번에 치료하는 약은 아니지만, 수면·혈당·장 건강·에너지 수준에 영향을 줍니다. 마음이 힘든 시기에는 끼니를 거르거나 단 음식과 카페인으로 버티는 일이 잦아지고, 그 패턴이 다시 불안과 피로를 키울 수 있어요.',
      '그래서 이 페이지는 “무엇을 먹으면 낫는다”가 아니라, 몸을 덜 흔들리게 만드는 식습관 단서를 모으는 공간입니다. 외부 자료는 원문 링크로 연결하고, 인마인드에서는 핵심만 쉽게 정리합니다.',
      '증상이 오래가거나 식사·수면이 무너졌다면 음식 정보만으로 버티지 말고 전문가 상담이나 진료를 함께 고려해 주세요.',
    ],
    quickTips: ['카페인은 오후 늦게 줄이기', '단 음식만으로 끼니 때우지 않기', '물·따뜻한 국물부터 챙기기', '완벽한 식단보다 반복 가능한 한 끼 만들기'],
    keywords: ['수면', '카페인', '장건강', '스트레스', '혼밥', '소울푸드'],
    relatedBoards: ['healing_book', 'healing_movie', 'healing_place'],
    disclaimer: '인마인드의 음식 정보는 일반 정보이며, 의학적 진단·치료나 영양 상담을 대체하지 않습니다.',
  },
  healing_book: {
    eyebrow: '힐링 책 큐레이션',
    title: '마음이 무너진 날 읽기 좋은 책과 자료',
    description:
      '위로가 되는 책 추천, 독서 관련 뉴스 탐색 링크, 도서관·공식 자료, 인마인드 커뮤니티 후기를 함께 모았어요.',
    filters: ['전체', '책추천', '뉴스', '영상', '공식자료', '에세이', '소설', '상담'],
    highlights: [
      {
        type: 'guide',
        title: '힘든 날에는 “좋은 책”보다 지금 읽히는 책이 먼저예요',
        source: '인마인드 가이드',
        url: '/board/healing_book',
        summary: '집중력이 낮은 날에는 짧은 에세이, 시, 만화처럼 진입 장벽이 낮은 책이 더 도움이 될 수 있어요.',
        tags: ['책추천', '위로', '독서'],
      },
      {
        type: 'news',
        title: '독서와 마음건강 관련 뉴스 보기',
        source: '네이버 뉴스 검색',
        url: naverNews('독서 마음건강 치유'),
        summary: '독서 치료, 마음건강, 도서 추천 관련 최신 보도를 직접 확인할 수 있어요.',
        tags: ['뉴스', '독서', '치유'],
      },
      {
        type: 'official',
        title: '도서관 자료 검색하기',
        source: '국립중앙도서관',
        url: 'https://www.nl.go.kr/',
        summary: '책 제목, 저자, 주제어로 자료를 찾아볼 수 있는 공식 도서관 서비스입니다.',
        tags: ['공식자료', '도서관'],
      },
    ],
    resources: [
      {
        type: 'youtube',
        title: '마음이 힘들 때 읽는 책 추천 영상',
        source: 'YouTube 검색',
        url: youtubeSearch('마음이 힘들 때 읽는 책 추천'),
        summary: '북튜버, 상담 전문가, 출판사 채널의 추천 영상을 찾아볼 수 있어요.',
        tags: ['영상', '책추천'],
      },
      {
        type: 'news',
        title: '심리 에세이·마음챙김 책 뉴스 보기',
        source: '네이버 뉴스 검색',
        url: naverNews('심리 에세이 마음챙김 책'),
        summary: '출간 소식과 인터뷰를 날짜순으로 확인할 수 있는 뉴스 탐색 링크입니다.',
        tags: ['뉴스', '에세이'],
      },
    ],
    guideTitle: '책 추천을 큐레이션으로 보여주는 방식',
    guideParagraphs: [
      '책은 줄거리보다 “어떤 마음에 닿는지”가 중요합니다. 그래서 인마인드에서는 장르보다 감정 상태, 읽기 난이도, 필요한 위로의 종류를 기준으로 소개합니다.',
      '외부 기사나 영상은 제목과 링크 중심으로 연결하고, 본문을 베껴오지 않습니다. 대신 왜 이 자료를 보면 좋은지 인마인드의 짧은 코멘트를 붙입니다.',
    ],
    quickTips: ['짧은 글부터 시작하기', '완독보다 한 문장 기록하기', '스포일러는 피해서 소개하기', '출처와 저자명을 함께 남기기'],
    keywords: ['에세이', '소설', '시집', '마음챙김', '독서치료'],
    relatedBoards: ['healing_quote', 'healing_movie', 'healing_food'],
    disclaimer: '책과 독서 자료는 마음 회복에 도움을 줄 수 있지만 전문 상담이나 치료를 대체하지 않습니다.',
  },
  healing_movie: {
    eyebrow: '힐링 영상 큐레이션',
    title: '위로가 되는 영화·드라마와 영상 자료',
    description:
      '영화·드라마 추천, 관련 뉴스 탐색, 유튜브 리뷰·해설 검색 링크, 인마인드 감상글을 함께 볼 수 있는 공간입니다.',
    filters: ['전체', '영화', '드라마', '뉴스', '영상', '가벼운작품', '울고싶은날'],
    highlights: [
      {
        type: 'guide',
        title: '컨디션이 낮은 날에는 무거운 작품보다 익숙한 장면도 괜찮아요',
        source: '인마인드 가이드',
        url: '/board/healing_movie',
        summary: '새로운 작품을 끝까지 봐야 한다는 부담 없이, 마음이 편해지는 장면 하나를 다시 보는 것도 회복 루틴이 될 수 있어요.',
        tags: ['영화', '드라마', '위로'],
      },
      {
        type: 'news',
        title: '힐링 영화·드라마 관련 뉴스 보기',
        source: '네이버 뉴스 검색',
        url: naverNews('힐링 영화 드라마 추천'),
        summary: '작품 소개, 배우 인터뷰, 추천 리스트를 검색 결과에서 확인할 수 있어요.',
        tags: ['뉴스', '영화', '드라마'],
      },
      {
        type: 'official',
        title: '영화 정보 공식 자료 확인하기',
        source: '영화진흥위원회',
        url: 'https://www.kofic.or.kr/',
        summary: '영화 관련 공식 통계와 자료를 확인할 수 있는 기관 사이트입니다.',
        tags: ['공식자료', '영화'],
      },
    ],
    resources: [
      {
        type: 'youtube',
        title: '힐링 영화 추천 영상 찾아보기',
        source: 'YouTube 검색',
        url: youtubeSearch('힐링 영화 추천 리뷰'),
        summary: '리뷰·해설 영상을 찾을 수 있지만, 스포일러 여부는 제목과 댓글에서 먼저 확인해 주세요.',
        tags: ['영상', '영화추천'],
      },
      {
        type: 'youtube',
        title: '잠들기 전 보기 좋은 잔잔한 드라마 추천',
        source: 'YouTube 검색',
        url: youtubeSearch('잔잔한 드라마 추천 힐링'),
        summary: '가볍게 보기 좋은 작품 추천 영상을 찾아볼 수 있어요.',
        tags: ['영상', '드라마'],
      },
    ],
    guideTitle: '영상 콘텐츠를 마음 상태에 맞춰 고르는 법',
    guideParagraphs: [
      '영화와 드라마는 감정을 대신 흘려보내는 통로가 되기도 합니다. 다만 너무 자극적인 콘텐츠는 불안이나 수면에 영향을 줄 수 있어, 지금 상태에 맞는 강도를 고르는 것이 좋아요.',
      '이 페이지는 작품을 무조건 많이 추천하기보다, 어떤 날 어떤 톤의 작품이 맞을지 고르는 단서를 제공합니다.',
    ],
    quickTips: ['스포일러 표시 확인하기', '자기 전에는 자극적인 장면 줄이기', '완주 부담 없이 한 편만 보기', '감상 후 마음 상태 기록하기'],
    keywords: ['힐링영화', '드라마추천', '리뷰', '명대사', '잠들기전'],
    relatedBoards: ['healing_book', 'healing_quote', 'healing_etc'],
    disclaimer: '영상 추천은 일반적인 콘텐츠 큐레이션이며, 심리적 위기 상황에서는 즉시 주변 도움이나 전문기관을 이용해 주세요.',
  },
  healing_place: {
    eyebrow: '힐링 장소 큐레이션',
    title: '혼자 쉬기 좋은 장소와 산책·여행 자료',
    description:
      '산책길, 숲, 도서관, 조용한 공간 관련 자료와 뉴스 탐색 링크, 인마인드 이용자들의 장소 후기를 모았습니다.',
    filters: ['전체', '산책', '숲', '도서관', '뉴스', '영상', '혼자가기'],
    highlights: [
      {
        type: 'guide',
        title: '멀리 가지 않아도 회복되는 장소가 있어요',
        source: '인마인드 가이드',
        url: '/board/healing_place',
        summary: '동네 산책길, 도서관 창가 자리, 사람이 적은 카페처럼 반복해서 갈 수 있는 공간이 마음의 안전지대가 될 수 있어요.',
        tags: ['산책', '혼자가기', '회복'],
      },
      {
        type: 'official',
        title: '숲길·산림복지 정보 확인하기',
        source: '산림청',
        url: 'https://www.forest.go.kr/',
        summary: '숲길, 산림복지, 자연휴양림 관련 공식 정보를 확인할 수 있어요.',
        tags: ['공식자료', '숲', '산책'],
      },
      {
        type: 'news',
        title: '산책과 정신건강 뉴스 보기',
        source: '네이버 뉴스 검색',
        url: naverNews('산책 정신건강 스트레스'),
        summary: '걷기, 산책, 자연 노출과 마음건강 관련 보도를 찾아볼 수 있어요.',
        tags: ['뉴스', '산책', '스트레스'],
      },
    ],
    resources: [
      {
        type: 'official',
        title: '문화·여가 정책 자료 확인하기',
        source: '문화체육관광부',
        url: 'https://www.mcst.go.kr/',
        summary: '문화공간, 여가, 관광 관련 공공 자료를 확인할 수 있는 공식 사이트입니다.',
        tags: ['공식자료', '문화', '여가'],
      },
      {
        type: 'youtube',
        title: '혼자 걷기 좋은 산책 코스 영상 찾아보기',
        source: 'YouTube 검색',
        url: youtubeSearch('혼자 걷기 좋은 산책 코스'),
        summary: '지역별 산책 코스와 조용한 여행지 영상을 찾아볼 수 있어요.',
        tags: ['영상', '산책', '여행'],
      },
    ],
    guideTitle: '힐링 장소를 고를 때 보는 기준',
    guideParagraphs: [
      '좋은 장소는 유명한 곳보다 “내가 안전하게 머물 수 있는 곳”에 가깝습니다. 접근성, 사람의 밀도, 소음, 돌아오는 길의 피로도까지 함께 보는 것이 좋아요.',
      '인마인드의 장소 허브는 과한 여행 정보보다, 마음이 지친 날 실제로 갈 수 있는 작은 공간을 찾는 데 초점을 둡니다.',
    ],
    quickTips: ['집에서 너무 먼 곳은 피하기', '돌아오는 교통까지 확인하기', '사람 많은 시간대 피하기', '사진보다 소음·혼잡도 보기'],
    keywords: ['산책', '숲길', '도서관', '혼카페', '혼자여행', '조용한곳'],
    relatedBoards: ['healing_food', 'healing_book', 'healing_etc'],
    disclaimer: '장소 정보는 방문 시점에 따라 운영시간·혼잡도·안전 상태가 달라질 수 있으니 공식 정보를 함께 확인해 주세요.',
  },
  healing_quote: {
    eyebrow: '위로 문구 큐레이션',
    title: '마음에 남는 문장과 짧은 위로',
    description:
      '책·영화·강연에서 만난 문장, 직접 쓴 문구, 관련 영상 탐색 링크를 모아 마음이 복잡한 날 짧게 꺼내볼 수 있게 했어요.',
    filters: ['전체', '짧은문장', '책속문장', '영상', '커뮤니티', '잠들기전'],
    highlights: [
      {
        type: 'guide',
        title: '좋은 문장은 정답보다 숨 쉴 틈을 줍니다',
        source: '인마인드 가이드',
        url: '/board/healing_quote',
        summary: '문장을 모을 때는 출처를 남기고, 긴 본문 인용보다 내 마음에 남은 이유를 함께 적는 방식이 안전하고 좋아요.',
        tags: ['문구', '위로', '출처'],
      },
      {
        type: 'youtube',
        title: '짧은 위로 문장·낭독 영상 찾아보기',
        source: 'YouTube 검색',
        url: youtubeSearch('위로 문장 낭독'),
        summary: '낭독, 시, 에세이 문장 관련 영상을 찾아볼 수 있어요.',
        tags: ['영상', '낭독'],
      },
    ],
    resources: [
      {
        type: 'news',
        title: '에세이·문장 관련 뉴스 보기',
        source: '네이버 뉴스 검색',
        url: naverNews('위로 문장 에세이'),
        summary: '작가 인터뷰와 신간 소개를 검색 결과로 확인할 수 있어요.',
        tags: ['뉴스', '에세이'],
      },
    ],
    guideTitle: '문구를 안전하게 공유하는 법',
    guideParagraphs: [
      '좋아하는 문장을 공유할 때는 긴 본문을 그대로 옮기기보다, 짧은 인용과 출처, 그리고 내 해석을 함께 남기는 것이 좋습니다.',
      '직접 쓴 문장도 충분히 가치가 있어요. 누군가에게는 완성된 명언보다 지금의 솔직한 말이 더 큰 위로가 됩니다.',
    ],
    quickTips: ['가능하면 출처 남기기', '긴 본문 복붙하지 않기', '내 해석을 함께 적기', '자극적인 문구는 피하기'],
    keywords: ['위로문구', '명언', '에세이', '낭독', '짧은글'],
    relatedBoards: ['healing_book', 'letter', 'healing_movie'],
    disclaimer: '저작권이 있는 문장은 긴 원문 복제를 피하고, 출처와 짧은 인용 중심으로 공유해 주세요.',
  },
  healing_etc: {
    eyebrow: '힐링 콘텐츠 큐레이션',
    title: '음악·그림·향처럼 작은 회복을 주는 것들',
    description:
      '음악, 그림, 향, 손작업, 취미처럼 분류하기 어려운 위로 콘텐츠를 자료 링크와 커뮤니티 이야기로 모았습니다.',
    filters: ['전체', '음악', '그림', '향', '취미', '영상', '뉴스'],
    highlights: [
      {
        type: 'guide',
        title: '작은 감각 루틴이 마음을 붙잡아줄 때가 있어요',
        source: '인마인드 가이드',
        url: '/board/healing_etc',
        summary: '잔잔한 음악, 손으로 하는 취미, 익숙한 향처럼 작은 자극이 하루의 경계를 만들어줄 수 있어요.',
        tags: ['루틴', '취미', '감각'],
      },
      {
        type: 'youtube',
        title: '마음이 편해지는 음악·플레이리스트 찾아보기',
        source: 'YouTube 검색',
        url: youtubeSearch('마음이 편해지는 음악 플레이리스트'),
        summary: '수면, 집중, 휴식용 플레이리스트를 찾아볼 수 있어요.',
        tags: ['영상', '음악'],
      },
    ],
    resources: [
      {
        type: 'news',
        title: '취미와 스트레스 완화 뉴스 보기',
        source: '네이버 뉴스 검색',
        url: naverNews('취미 스트레스 완화'),
        summary: '취미, 예술활동, 스트레스 관리 관련 보도를 확인할 수 있어요.',
        tags: ['뉴스', '취미', '스트레스'],
      },
    ],
    guideTitle: '분류되지 않는 위로를 모으는 이유',
    guideParagraphs: [
      '회복은 꼭 거창한 상담이나 여행만으로 생기지 않습니다. 어떤 사람에게는 향초 하나, 어떤 사람에게는 밤에 듣는 음악 한 곡이 하루를 견디게 합니다.',
      '이 허브는 그런 작은 도구들을 모아두는 공간입니다. 효과를 과장하지 않고, 실제로 도움이 되었던 맥락을 함께 남기는 방식으로 운영합니다.',
    ],
    quickTips: ['수면 전 자극 낮추기', '작은 루틴 하나만 정하기', '효과를 과장하지 않기', '나에게 맞지 않으면 중단하기'],
    keywords: ['음악', '플레이리스트', '향', '그림', '취미', '루틴'],
    relatedBoards: ['healing_quote', 'healing_place', 'healing_movie'],
    disclaimer: '힐링 콘텐츠는 개인마다 반응이 다르며, 심한 불안·우울·불면이 지속되면 전문적인 도움을 권합니다.',
  },
};

export function isCuratedHubBoard(boardType: BoardType) {
  return Boolean(CURATED_HUBS[boardType]);
}
