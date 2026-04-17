'use client';

import { CornerDownRight, Send } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Input';
import Checkbox from '@/components/ui/Checkbox';
import { timeAgo } from '@/lib/format';
import type { Comment } from '@/types/database';
import styles from './CommentItem.module.css';

interface CommentItemProps {
  comment: Comment;
  replies: Comment[];
  currentUserId: string | null;
  replyTo: string | null;
  replyText: string;
  isAnonymousComment: boolean;
  setReplyTo: (id: string | null) => void;
  setReplyText: (text: string) => void;
  setIsAnonymousComment: (v: boolean) => void;
  onReply: (parentId: string | null) => void;
  onDelete: (id: string) => void;
  onReport: (type: 'post' | 'comment', id: string) => void;
}

export default function CommentItem({
  comment,
  replies,
  currentUserId,
  replyTo,
  replyText,
  isAnonymousComment,
  setReplyTo,
  setReplyText,
  setIsAnonymousComment,
  onReply,
  onDelete,
  onReport,
}: CommentItemProps) {
  const displayName = comment.is_anonymous ? '익명' : comment.user?.nickname || '알 수 없음';
  const isAuthor = currentUserId === comment.user_id;

  return (
    <div className={styles.comment}>
      <div className={styles.header}>
        <span className={styles.nickname}>{displayName}</span>
        <span className={styles.time} suppressHydrationWarning>{timeAgo(comment.created_at)}</span>
      </div>
      <p className={styles.content}>{comment.content}</p>
      <div className={styles.actions}>
        {currentUserId && (
          <button
            onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
            className={styles.actionBtn}
          >
            답글
          </button>
        )}
        {isAuthor && (
          <button onClick={() => onDelete(comment.id)} className={styles.actionBtnDanger}>
            삭제
          </button>
        )}
        <button onClick={() => onReport('comment', comment.id)} className={styles.actionBtnDanger}>
          신고
        </button>
      </div>

      {/* Reply Input */}
      {replyTo === comment.id && (
        <div className={styles.replyWrapper}>
          <CornerDownRight size={16} className={styles.replyIcon} />
          <div className={styles.replyBody}>
            <Textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="답글을 작성해주세요..."
              rows={2}
            />
            <div className={styles.replyFooter}>
              <Checkbox
                checked={isAnonymousComment}
                onChange={(e) => setIsAnonymousComment(e.target.checked)}
              >
                익명
              </Checkbox>
              <Button size="sm" disabled={!replyText.trim()} onClick={() => onReply(comment.id)}>
                <Send size={12} /> 답글
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Replies */}
      {replies.length > 0 && (
        <div className={styles.replies}>
          {replies.map((reply) => {
            const replyName = reply.is_anonymous ? '익명' : reply.user?.nickname || '알 수 없음';
            const isReplyAuthor = currentUserId === reply.user_id;
            return (
              <div key={reply.id}>
                <div className={styles.replyHeader}>
                  <CornerDownRight size={12} className={styles.replyIcon} />
                  <span className={styles.nickname}>{replyName}</span>
                  <span className={styles.time} suppressHydrationWarning>{timeAgo(reply.created_at)}</span>
                </div>
                <p className={styles.replyContent}>{reply.content}</p>
                <div className={styles.replyActions}>
                  {isReplyAuthor && (
                    <button onClick={() => onDelete(reply.id)} className={styles.actionBtnDanger}>
                      삭제
                    </button>
                  )}
                  <button onClick={() => onReport('comment', reply.id)} className={styles.actionBtnDanger}>
                    신고
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
