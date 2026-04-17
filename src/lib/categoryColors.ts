// 카테고리별 색상 토큰
export const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  '마음의공간':  { bg: '#FFF0F3', text: '#D4386B', border: '#FFD6DF' },
  '이야기나눔':  { bg: '#EAF3FF', text: '#2E6BD9', border: '#CFE1FB' },
  '고민상담소':  { bg: '#FFF6DA', text: '#B07A0C', border: '#FCE8AB' },
  '힐링플레이스': { bg: '#E7F8EC', text: '#1E8A4C', border: '#C4ECD2' },
  '커뮤니티':    { bg: '#F1EBFF', text: '#6C3DCF', border: '#DCCFFA' },
  '전문가 안내':  { bg: '#FFE9E9', text: '#C43030', border: '#FAC9C9' },
};

export function getCategoryColor(category: string | undefined) {
  if (!category) return { bg: '#F2F3F5', text: '#666', border: '#E3E5E8' };
  return CATEGORY_COLORS[category] || { bg: '#F2F3F5', text: '#666', border: '#E3E5E8' };
}
