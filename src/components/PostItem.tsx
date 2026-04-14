import Link from 'next/link';
import { Eye, ThumbsUp } from 'lucide-react';
import { timeAgo } from '@/lib/format';
import { BOARD_CONFIG, type BoardType, type Post } from '@/types/database';
import styles from './PostItem.module.css';

interface PostItemProps {
  post: Post;
  compact?: boolean;
  showBoard?: boolean;
}

function getFirstImage(content: string): string | null {
  // HTML img 태그
  const htmlMatch = content.match(/<img[^>]+src=["'](https?:\/\/.+?)["']/);
  if (htmlMatch) return htmlMatch[1];
  // 기존 마크다운 형식
  const mdMatch = content.match(/\[이미지\]\((https?:\/\/.+?)\)/);
  return mdMatch ? mdMatch[1] : null;
}

export default function PostItem({
  post,
  compact = false,
  showBoard = false,
}: PostItemProps) {
  const displayName = post.is_anonymous ? '익명' : (post.user?.nickname || '알 수 없음');
  const commentCount = Array.isArray(post.comment_count) ? post.comment_count[0]?.count || 0 : post.comment_count || 0;
  const empathyCount = Array.isArray(post.empathy_count) ? post.empathy_count[0]?.count || 0 : post.empathy_count || 0;
  const boardConfig = BOARD_CONFIG[post.board_type as BoardType];
  const thumbnail = getFirstImage(post.content);

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
          {showBoard && boardConfig && <span className={styles.board}>{boardConfig.category} ・ {boardConfig.label}</span>}
          <span className={styles.author}>{displayName}</span>
          <span className={styles.dot}>·</span>
          <span>{timeAgo(post.created_at)}</span>
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
