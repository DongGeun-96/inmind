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
  /** 카드형(홈/리스트 권장), list=기존 한 줄형 */
  variant?: 'card' | 'list';
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
  const preview = stripHtmlToText(post.content, 90);
  const catColor = getCategoryColor(boardConfig?.category);

  // list variant: 기존 한 줄형 유지(보드 페이지 기본 테이블)
  if (variant === 'list') {
    return (
      <div className={`${styles.item} ${compact ? styles.compact : ''}`}>
        <div className={styles.content}>
          <h3 className={styles.title}>
            <Link href={`/post/${post.id}`} className={styles.titleLink}>
              {post.title}
            </Link>
            {commentCount > 0 && <span className={styles.commentCount}>[{commentCount}]</span>}
          </h3>
          <div className={styles.meta}>
            {showBoard && boardConfig && (
              <span
                className={styles.boardChip}
                style={{
                  background: catColor.bg,
                  color: catColor.text,
                  borderColor: catColor.border,
                }}
              >
                {boardConfig.category} · {boardConfig.label}
              </span>
            )}
            <span className={styles.author}>{displayName}</span>
            <span className={styles.dot}>·</span>
            <span suppressHydrationWarning>{timeAgo(post.created_at)}</span>
            <span className={styles.dot}>·</span>
            <span className={styles.stat}><Eye size={12} /> {post.view_count}</span>
            <span className={styles.dot}>·</span>
            <span className={styles.stat}><ThumbsUp size={12} /> {empathyCount}</span>
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

  // card variant
  return (
    <Link href={`/post/${post.id}`} className={styles.card}>
      {boardConfig && (
        <span
          className={styles.cardChip}
          style={{
            background: catColor.bg,
            color: catColor.text,
            borderColor: catColor.border,
          }}
        >
          {boardConfig.label}
        </span>
      )}
      <h3 className={styles.cardTitle}>
        {post.title}
        {commentCount > 0 && <span className={styles.commentCount}>[{commentCount}]</span>}
      </h3>
      {preview && <p className={styles.cardPreview}>{preview}</p>}
      {thumbnail && (
        <div className={styles.cardThumbnail}>
          <img src={thumbnail} alt="" />
        </div>
      )}
      <div className={styles.cardMeta}>
        <span className={styles.author}>{displayName}</span>
        <span className={styles.dot}>·</span>
        <span suppressHydrationWarning>{timeAgo(post.created_at)}</span>
        <span className={styles.spacer} />
        <span className={styles.stat}><ThumbsUp size={13} /> {empathyCount}</span>
        <span className={styles.stat}><MessageCircle size={13} /> {commentCount}</span>
        <span className={styles.stat}><Eye size={13} /> {post.view_count}</span>
      </div>
    </Link>
  );
}
