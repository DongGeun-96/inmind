import Link from 'next/link';
import { MessageCircle, ThumbsUp, Eye } from 'lucide-react';
import { timeAgo, stripHtmlToText } from '@/lib/format';
import { getCategoryColor } from '@/lib/categoryColors';
import { BOARD_CONFIG, type BoardType, type Post } from '@/types/database';
import styles from './PostItem.module.css';

interface PostItemProps {
  post: Post;
  compact?: boolean;
  showBoard?: boolean;
  /** 기본 list. card는 예비 유지용. */
  variant?: 'list' | 'card';
  /** 리스트 본문 2줄 프리뷰 노출 여부 (홈 등) */
  showPreview?: boolean;
}

function getFirstImage(content: string): string | null {
  const htmlMatch = content.match(/<img[^>]+src=["'](https?:\/\/.+?)["']/);
  if (htmlMatch) return htmlMatch[1];
  const mdMatch = content.match(/\[이미지\]\((https?:\/\/.+?)\)/);
  return mdMatch ? mdMatch[1] : null;
}

export default function PostItem({
  post,
  compact = false,
  showBoard = false,
  variant = 'list',
  showPreview = false,
}: PostItemProps) {
  const displayName = post.is_anonymous ? '익명' : (post.user?.nickname || '알 수 없음');
  const commentCount = Array.isArray(post.comment_count)
    ? post.comment_count[0]?.count || 0
    : post.comment_count || 0;
  const empathyCount = Array.isArray(post.empathy_count)
    ? post.empathy_count[0]?.count || 0
    : post.empathy_count || 0;
  const boardConfig = BOARD_CONFIG[post.board_type as BoardType];
  const thumbnail = getFirstImage(post.content);
  const preview = showPreview ? stripHtmlToText(post.content, 90) : '';
  const catColor = getCategoryColor(boardConfig?.category);

  if (variant === 'card') {
    // 레거시 카드 variant 유지(현재 미사용)
    return (
      <Link href={`/post/${post.id}`} className={styles.card}>
        {boardConfig && (
          <span
            className={styles.chip}
            style={{ background: catColor.bg, color: catColor.text, borderColor: catColor.border }}
          >
            {boardConfig.label}
          </span>
        )}
        <h3 className={styles.title}>{post.title}</h3>
        {preview && <p className={styles.preview}>{preview}</p>}
      </Link>
    );
  }

  return (
    <div className={`${styles.item} ${compact ? styles.compact : ''}`}>
      <div className={styles.content}>
        <h3 className={styles.title}>
          <Link href={`/post/${post.id}`} className={styles.titleLink}>
            {post.title}
          </Link>
          {commentCount > 0 && <span className={styles.commentCount}>[{commentCount}]</span>}
        </h3>

        {preview && (
          <p className={styles.preview}>
            <Link href={`/post/${post.id}`} className={styles.previewLink}>
              {preview}
            </Link>
          </p>
        )}

        <div className={styles.meta}>
          {showBoard && boardConfig && (
            <span
              className={styles.chip}
              style={{
                background: catColor.bg,
                color: catColor.text,
                borderColor: catColor.border,
              }}
            >
              {boardConfig.label}
            </span>
          )}
          <span className={styles.author}>{displayName}</span>
          <span className={styles.dot}>·</span>
          <span suppressHydrationWarning>{timeAgo(post.created_at)}</span>
          <span className={styles.dot}>·</span>
          <span className={styles.stat}><ThumbsUp size={12} /> {empathyCount}</span>
          <span className={styles.dot}>·</span>
          <span className={styles.stat}><MessageCircle size={12} /> {commentCount}</span>
          <span className={styles.dot}>·</span>
          <span className={styles.stat}><Eye size={12} /> {post.view_count}</span>
        </div>
      </div>
      {thumbnail && (
        <Link href={`/post/${post.id}`} className={styles.thumbnail}>
          <img src={thumbnail} alt="" />
        </Link>
      )}
    </div>
  );
}
