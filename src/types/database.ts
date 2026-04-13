export type BoardType =
  | 'emotion'
  | 'cheer'
  | 'pet_loss'
  | 'human_loss'
  | 'depression'
  | 'recovery'
  | 'love'
  | 'career'
  | 'marriage'
  | 'family'
  | 'relationship'
  | 'workplace'
  | 'study'
  | 'parenting'
  | 'healing_food'
  | 'healing_place'
  | 'healing_book'
  | 'healing_movie'
  | 'healing_quote'
  | 'healing_etc'
  | 'community_free'
  | 'tips';

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

export const BOARD_CONFIG: Record<
  BoardType,
  { label: string; category: string; description: string; requireAuth: boolean }
> = {
  emotion: {
    label: '오늘의 감정 기록',
    category: '마음의공간',
    description: '오늘 느낀 감정을 기록해요',
    requireAuth: false,
  },
  cheer: {
    label: '응원 한마디',
    category: '마음의공간',
    description: '따뜻한 응원의 메시지를 전해요',
    requireAuth: false,
  },
  pet_loss: {
    label: '반려동물 이별',
    category: '이야기나눔',
    description: '소중한 반려동물과의 이별을 나눠요',
    requireAuth: false,
  },
  human_loss: {
    label: '소중한 사람 이별',
    category: '이야기나눔',
    description: '사랑하는 사람을 떠나보낸 이야기',
    requireAuth: false,
  },
  depression: {
    label: '우울·불안 나눔',
    category: '이야기나눔',
    description: '우울과 불안을 함께 나눠요',
    requireAuth: false,
  },
  recovery: {
    label: '회복 후기',
    category: '이야기나눔',
    description: '회복의 경험을 공유해요',
    requireAuth: false,
  },
  love: {
    label: '연애',
    category: '고민상담소',
    description: '연애 고민을 나눠요',
    requireAuth: false,
  },
  career: {
    label: '취업',
    category: '고민상담소',
    description: '취업 고민을 나눠요',
    requireAuth: false,
  },
  marriage: {
    label: '결혼',
    category: '고민상담소',
    description: '결혼 고민을 나눠요',
    requireAuth: false,
  },
  family: {
    label: '가족',
    category: '고민상담소',
    description: '가족 관계 고민을 나눠요',
    requireAuth: false,
  },
  relationship: {
    label: '인간관계',
    category: '고민상담소',
    description: '대인관계 고민을 나눠요',
    requireAuth: false,
  },
  workplace: {
    label: '직장생활',
    category: '고민상담소',
    description: '직장 고민을 나눠요',
    requireAuth: false,
  },
  study: {
    label: '학업',
    category: '고민상담소',
    description: '학업·진로 고민을 나눠요',
    requireAuth: false,
  },
  parenting: {
    label: '육아',
    category: '고민상담소',
    description: '육아 고민을 나눠요',
    requireAuth: false,
  },
  healing_food: {
    label: '음식',
    category: '힐링플레이스',
    description: '힐링되는 음식을 공유해요',
    requireAuth: false,
  },
  healing_place: {
    label: '장소',
    category: '힐링플레이스',
    description: '힐링되는 장소를 공유해요',
    requireAuth: false,
  },
  healing_book: {
    label: '책',
    category: '힐링플레이스',
    description: '힐링되는 책을 공유해요',
    requireAuth: false,
  },
  healing_movie: {
    label: '영화/드라마',
    category: '힐링플레이스',
    description: '힐링되는 영화와 드라마를 공유해요',
    requireAuth: false,
  },
  healing_quote: {
    label: '문구',
    category: '힐링플레이스',
    description: '힐링되는 문구를 공유해요',
    requireAuth: false,
  },
  healing_etc: {
    label: '기타',
    category: '힐링플레이스',
    description: '기타 힐링 콘텐츠를 공유해요',
    requireAuth: false,
  },
  community_free: {
    label: '자유',
    category: '커뮤니티',
    description: '자유롭게 이야기해요',
    requireAuth: false,
  },
  tips: {
    label: '꿀팁공유',
    category: '커뮤니티',
    description: '유용한 꿀팁을 공유해요',
    requireAuth: false,
  },
};

export const CATEGORIES = [
  {
    name: '마음의공간',
    description: '자유롭게 소통하는 공간',
    boards: ['emotion', 'cheer'] as BoardType[],
  },
  {
    name: '이야기나눔',
    description: '경험을 공유하는 공간',
    boards: ['pet_loss', 'human_loss', 'depression', 'recovery'] as BoardType[],
  },
  {
    name: '고민상담소',
    description: '고민을 나누는 공간',
    boards: ['love', 'career', 'marriage', 'family', 'relationship', 'workplace', 'study', 'parenting'] as BoardType[],
  },
  {
    name: '힐링플레이스',
    description: '마음을 치유하는 콘텐츠',
    boards: ['healing_food', 'healing_place', 'healing_book', 'healing_movie', 'healing_quote', 'healing_etc'] as BoardType[],
  },
  {
    name: '커뮤니티',
    description: '공지사항과 이벤트',
    boards: ['community_free', 'tips'] as BoardType[],
  },
];
