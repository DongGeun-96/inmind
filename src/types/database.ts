export type BoardType =
  | 'emotion'
  | 'letter'
  | 'pet_loss'
  | 'human_loss'
  | 'depression'
  | 'anxiety'
  | 'trauma'
  | 'recovery'
  | 'love'
  | 'career'
  | 'marriage'
  | 'family'
  | 'relationship'
  | 'workplace'
  | 'study'
  | 'parenting'
  | 'breakup'
  | 'appearance'
  | 'finance'
  | 'identity'
  | 'health'
  | 'healing_food'
  | 'healing_place'
  | 'healing_book'
  | 'healing_movie'
  | 'healing_quote'
  | 'healing_etc'
  | 'daily'
  | 'community_free'
  | 'tips'
  | 'professional';

export interface User {
  id: string;
  nickname: string;
  email: string;
  username?: string | null;
  created_at: string;
  is_banned: boolean;
  role: 'user' | 'admin';
}

export interface Post {
  id: string;
  user_id: string;
  board_type: BoardType;
  title: string;
  content: string;
  is_anonymous: boolean;
  is_public: boolean;
  is_notice: boolean;
  view_count: number;
  created_at: string;
  updated_at: string;
  // joined
  user?: Pick<User, 'nickname'>;
  comment_count?: number;
  empathy_count?: number;
}

export interface Comment {
  id: string;
  post_id: string;
  user_id: string;
  parent_id: string | null;
  content: string;
  is_anonymous: boolean;
  created_at: string;
  // joined
  user?: Pick<User, 'nickname'>;
  empathy_count?: number;
  replies?: Comment[];
}

export interface Empathy {
  id: string;
  user_id: string;
  post_id: string | null;
  comment_id: string | null;
  created_at: string;
}

export interface Report {
  id: string;
  reporter_id: string;
  target_type: 'post' | 'comment';
  target_id: string;
  reason: string;
  created_at: string;
  is_handled: boolean;
}

export interface Notification {
  id: string;
  user_id: string;
  type: 'comment' | 'empathy';
  message: string;
  post_id: string;
  is_read: boolean;
  created_at: string;
}

// Mood & Diary types
export type MoodType = 'happy' | 'okay' | 'tired' | 'sad' | 'angry';

export interface MoodEntry {
  id: string;
  user_id: string;
  mood: MoodType;
  note: string | null;
  entry_date: string;
  created_at: string;
}

export interface DailyQuote {
  id: string;
  text: string;
  author: string | null;
  created_at: string;
}

export interface DiaryEntry {
  id: string;
  user_id: string;
  emotion: string;
  reason: string | null;
  message_to_self: string | null;
  entry_date: string;
  created_at: string;
}

export const MOOD_CONFIG: Record<MoodType, { emoji: string; label: string }> = {
  happy: { emoji: '😊', label: '좋아요' },
  okay: { emoji: '🙂', label: '괜찮아요' },
  tired: { emoji: '😮‍💨', label: '피곤해요' },
  sad: { emoji: '😔', label: '우울해요' },
  angry: { emoji: '😤', label: '화가나요' },
};

export const BOARD_CONFIG: Record<
  BoardType,
  { label: string; category: string; description: string; requireAuth: boolean; adminOnly?: boolean }
> = {
  emotion: {
    label: '오늘의 감정 기록',
    category: '마음의공간',
    description: '오늘 느낀 감정을 솔직하게 기록하고 공감받을 수 있는 힐링 공간',
    requireAuth: false,
  },
  letter: {
    label: '너에게 쓰는 편지',
    category: '마음의공간',
    description: '소중한 사람에게 전하지 못한 마음을 편지로 쓰는 공간',
    requireAuth: false,
  },
  pet_loss: {
    label: '반려동물 이별',
    category: '이야기나눔',
    description: '반려동물 무지개다리, 펫로스 극복을 함께 나누는 커뮤니티',
    requireAuth: false,
  },
  human_loss: {
    label: '소중한 사람 이별',
    category: '이야기나눔',
    description: '소중한 사람과의 이별, 상실의 슬픔을 함께 나누는 공간',
    requireAuth: false,
  },
  depression: {
    label: '우울·불안 나눔',
    category: '이야기나눔',
    description: '우울증, 불안장애 등 심리적 어려움을 익명으로 나누는 커뮤니티',
    requireAuth: false,
  },
  anxiety: {
    label: '불안/공황',
    category: '이야기나눔',
    description: '불안장애, 공황장애 등 마음의 어려움을 나누는 공간',
    requireAuth: false,
  },
  trauma: {
    label: '트라우마',
    category: '이야기나눔',
    description: '과거의 상처, 트라우마를 안전하게 이야기하는 공간',
    requireAuth: false,
  },
  recovery: {
    label: '회복 후기',
    category: '이야기나눔',
    description: '마음의 회복 경험과 극복 이야기를 공유하는 희망의 공간',
    requireAuth: false,
  },
  love: {
    label: '연애',
    category: '고민상담소',
    description: '연애 고민, 이별 후 마음 정리를 함께 나누는 익명 상담 공간',
    requireAuth: false,
  },
  career: {
    label: '취업',
    category: '고민상담소',
    description: '취업 스트레스, 진로 고민을 솔직하게 나누는 공간',
    requireAuth: false,
  },
  marriage: {
    label: '결혼',
    category: '고민상담소',
    description: '결혼 고민, 부부 관계 이야기를 나누는 익명 상담 공간',
    requireAuth: false,
  },
  family: {
    label: '가족',
    category: '고민상담소',
    description: '가족 갈등, 부모 자녀 관계 고민을 나누는 공간',
    requireAuth: false,
  },
  relationship: {
    label: '인간관계',
    category: '고민상담소',
    description: '대인관계 스트레스, 친구 관계 고민을 나누는 익명 상담 공간',
    requireAuth: false,
  },
  workplace: {
    label: '직장생활',
    category: '고민상담소',
    description: '직장 스트레스, 번아웃, 직장 내 인간관계 고민을 나누는 공간',
    requireAuth: false,
  },
  study: {
    label: '학업',
    category: '고민상담소',
    description: '학업 스트레스, 시험 불안, 진로 고민을 나누는 공간',
    requireAuth: false,
  },
  parenting: {
    label: '육아',
    category: '고민상담소',
    description: '육아 스트레스, 양육 고민을 솔직하게 나누는 부모 커뮤니티',
    requireAuth: false,
  },
  breakup: {
    label: '이별/이혼',
    category: '고민상담소',
    description: '이별, 이혼 후 마음 정리와 회복을 함께하는 공간',
    requireAuth: false,
  },
  appearance: {
    label: '외모/자존감',
    category: '고민상담소',
    description: '외모 고민, 자존감 회복을 함께 나누는 공간',
    requireAuth: false,
  },
  finance: {
    label: '금전/사업',
    category: '고민상담소',
    description: '경제적 어려움, 사업 스트레스를 나누는 공간',
    requireAuth: false,
  },
  identity: {
    label: '자아/성격',
    category: '고민상담소',
    description: '나는 누구인가, 성격 고민을 나누는 공간',
    requireAuth: false,
  },
  health: {
    label: '신체건강',
    category: '고민상담소',
    description: '건강 불안, 질병 스트레스를 나누는 공간',
    requireAuth: false,
  },
  healing_food: {
    label: '음식',
    category: '힐링플레이스',
    description: '마음이 힐링되는 맛집, 위로가 되는 음식을 공유하는 공간',
    requireAuth: false,
  },
  healing_place: {
    label: '장소',
    category: '힐링플레이스',
    description: '마음이 편안해지는 힐링 여행지, 산책 장소를 공유하는 공간',
    requireAuth: false,
  },
  healing_book: {
    label: '책',
    category: '힐링플레이스',
    description: '마음을 치유해주는 힐링 도서, 위로가 되는 책 추천 공간',
    requireAuth: false,
  },
  healing_movie: {
    label: '영화/드라마',
    category: '힐링플레이스',
    description: '힐링되는 영화, 위로가 되는 드라마를 추천하는 공간',
    requireAuth: false,
  },
  healing_quote: {
    label: '문구',
    category: '힐링플레이스',
    description: '마음에 위로가 되는 명언, 힐링 문구를 공유하는 공간',
    requireAuth: false,
  },
  healing_etc: {
    label: '기타',
    category: '힐링플레이스',
    description: '음악, 그림 등 다양한 힐링 콘텐츠를 공유하는 공간',
    requireAuth: false,
  },
  daily: {
    label: '오늘 한 줄',
    category: '커뮤니티',
    description: '오늘의 기분을 한 줄로 나누는 공간',
    requireAuth: false,
  },
  community_free: {
    label: '자유',
    category: '커뮤니티',
    description: '일상 이야기, 잡담을 자유롭게 나누는 커뮤니티 공간',
    requireAuth: false,
  },
  tips: {
    label: '꿀팁공유',
    category: '커뮤니티',
    description: '생활 속 유용한 꿀팁과 정보를 공유하는 공간',
    requireAuth: false,
  },
  professional: {
    label: '전문가 상담/병원',
    category: '전문가 안내',
    description: '상담사, 심리상담센터, 정신건강 관련 병원 정보를 안내하는 공간',
    requireAuth: false,
    adminOnly: true,
  },
};

export const CATEGORIES = [
  {
    name: '마음의공간',
    description: '자유롭게 소통하는 공간',
    boards: ['emotion', 'letter'] as BoardType[],
  },
  {
    name: '이야기나눔',
    description: '경험을 공유하는 공간',
    boards: ['pet_loss', 'human_loss', 'depression', 'anxiety', 'trauma', 'recovery'] as BoardType[],
  },
  {
    name: '고민상담소',
    description: '고민을 나누는 공간',
    boards: ['love', 'breakup', 'career', 'marriage', 'family', 'relationship', 'workplace', 'study', 'parenting', 'appearance', 'finance', 'identity', 'health'] as BoardType[],
  },
  {
    name: '힐링플레이스',
    description: '마음을 치유하는 콘텐츠',
    boards: ['healing_food', 'healing_place', 'healing_book', 'healing_movie', 'healing_quote', 'healing_etc'] as BoardType[],
  },
  {
    name: '커뮤니티',
    description: '공지사항과 이벤트',
    boards: ['daily', 'community_free', 'tips'] as BoardType[],
  },
  {
    name: '전문가 안내',
    description: '상담사 및 병원 홍보',
    boards: ['professional'] as BoardType[],
  },
];
