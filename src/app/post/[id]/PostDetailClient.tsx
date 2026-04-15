'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, MessageCircle, Eye, Flag, Pencil, Trash2, Send } from 'lucide-react';
import DOMPurify from 'isomorphic-dompurify';
import { createClient } from '@/lib/supabase-client';
import { formatDate } from '@/lib/format';
import { BOARD_CONFIG, CATEGORIES, type Post, type Comment, type BoardType } from '@/types/database';
import Button from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Input';
import Checkbox from '@/components/ui/Checkbox';
import EmpathyButton from '@/components/EmpathyButton';
import CommentItem from '@/components/CommentItem';
import PostItem from '@/components/PostItem';
import styles from './post.module.css';

interface Props {
  post: Post & { empathy_count: number };
  comments: Comment[];
  config: (typeof BOARD_CONFIG)[BoardType];
  currentUserId: string | null;
  initialHasEmpathy: boolean;
  relatedPosts: Post[];
  categoryName: string;
}

export default function PostDetailClient({
  post,
  comments: initialComments,
  config,
  currentUserId,
  initialHasEmpathy,
  relatedPosts,
  categoryName,
}: Props) {
  const router = useRouter();
  const supabase = createClient();
  const [empathyCount, setEmpathyCount] = useState(post.empathy_count);
  const [hasEmpathy, setHasEmpathy] = useState(initialHasEmpathy);
  const [comments, setComments] = useState(initialComments);
  const [commentText, setCommentText] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [isAnonymousComment, setIsAnonymousComment] = useState(false);
  const [loadingEmpathy, setLoadingEmpathy] = useState(false);

  const viewCountCalled = useRef(false);

  useEffect(() => {
    if (viewCountCalled.current) return;
    viewCountCalled.current = true;

    const VIEWED_KEY = 'viewed_posts';
    const EXPIRY_MS = 24 * 60 * 60 * 1000; // 24시간

    try {
      const stored = localStorage.getItem(VIEWED_KEY);
      const viewedMap: Record<string, number> = stored ? JSON.parse(stored) : {};

      // 만료된 항목 정리
      const now = Date.now();
      for (const key of Object.keys(viewedMap)) {
        if (now - viewedMap[key] > EXPIRY_MS) {
          delete viewedMap[key];
        }
      }

      if (!viewedMap[post.id]) {
        viewedMap[post.id] = now;
        localStorage.setItem(VIEWED_KEY, JSON.stringify(viewedMap));
        supabase.rpc('increment_view_count', { post_id: post.id }).then();
      } else {
        localStorage.setItem(VIEWED_KEY, JSON.stringify(viewedMap));
      }
    } catch {
      // localStorage 접근 불가 시 그냥 증가
      supabase.rpc('increment_view_count', { post_id: post.id }).then();
    }
  }, [post.id, supabase]);

  const displayName = post.is_anonymous ? '익명' : post.user?.nickname || '알 수 없음';
  const isAuthor = currentUserId === post.user_id;

  const rootComments = comments.filter((c) => !c.parent_id);
  const getReplies = (parentId: string) => comments.filter((c) => c.parent_id === parentId);

  // Check if user is banned before performing an action
  const checkBanned = async (): Promise<boolean> => {
    if (!currentUserId) return false;
    const { data } = await supabase
      .from('users')
      .select('is_banned')
      .eq('id', currentUserId)
      .single();
    if (data?.is_banned) {
      await supabase.auth.signOut();
      window.location.href = '/banned';
      return true;
    }
    return false;
  };

  const handleEmpathy = async () => {
    if (!currentUserId) { router.push('/auth/login'); return; }
    if (loadingEmpathy) return;
    if (await checkBanned()) return;
    setLoadingEmpathy(true);

    if (hasEmpathy) {
      await supabase.from('empathies').delete().eq('post_id', post.id).eq('user_id', currentUserId);
      setEmpathyCount((c) => c - 1);
      setHasEmpathy(false);
    } else {
      await supabase.from('empathies').insert({ user_id: currentUserId, post_id: post.id });
      setEmpathyCount((c) => c + 1);
      setHasEmpathy(true);

      // Create notification for post author (empathy)
      if (post.user_id !== currentUserId) {
        await supabase.from('notifications').insert({
          user_id: post.user_id,
          type: 'empathy',
          message: '내 글에 공감을 받았어요.',
          post_id: post.id,
        });
      }
    }
    setLoadingEmpathy(false);
  };

  const handleComment = async (parentId: string | null = null) => {
    if (!currentUserId) { router.push('/auth/login'); return; }
    const text = parentId ? replyText : commentText;
    if (!text.trim()) return;
    if (await checkBanned()) return;

    const { data, error } = await supabase
      .from('comments')
      .insert({
        post_id: post.id,
        user_id: currentUserId,
        parent_id: parentId,
        content: text.trim(),
        is_anonymous: isAnonymousComment,
      })
      .select('*, user:users(nickname)')
      .single();

    if (!error && data) {
      setComments((prev) => [...prev, data]);
      if (parentId) { setReplyText(''); setReplyTo(null); }
      else { setCommentText(''); }

      // Create notification for post author (comment)
      if (post.user_id !== currentUserId) {
        await supabase.from('notifications').insert({
          user_id: post.user_id,
          type: 'comment',
          message: '내 글에 새 댓글이 달렸어요.',
          post_id: post.id,
        });
      }
    }
  };

  const handleDeletePost = async () => {
    if (!confirm('정말 삭제하시겠어요?')) return;
    await supabase.from('posts').delete().eq('id', post.id);
    router.push(`/board/${post.board_type}`);
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!confirm('댓글을 삭제하시겠어요?')) return;
    await supabase.from('comments').delete().eq('id', commentId);
    setComments((prev) => prev.filter((c) => c.id !== commentId));
  };

  const handleReport = async (targetType: 'post' | 'comment', targetId: string) => {
    if (!currentUserId) { router.push('/auth/login'); return; }

    // 관리자 글/댓글은 신고 불가
    let targetUserId: string | null = null;
    if (targetType === 'post') {
      const { data } = await supabase.from('posts').select('user_id').eq('id', targetId).single();
      targetUserId = data?.user_id || null;
    } else {
      const { data } = await supabase.from('comments').select('user_id').eq('id', targetId).single();
      targetUserId = data?.user_id || null;
    }
    if (targetUserId) {
      const { data: targetUser } = await supabase.from('users').select('role').eq('id', targetUserId).single();
      if (targetUser?.role === 'admin') {
        alert('관리자의 글은 신고할 수 없어요.');
        return;
      }
    }

    const reason = prompt('신고 사유를 입력해주세요.');
    if (!reason) return;
    await supabase.from('reports').insert({
      reporter_id: currentUserId,
      target_type: targetType,
      target_id: targetId,
      reason,
    });
    alert('신고가 접수되었어요. 운영진이 확인할게요.');
  };

  return (
    <div className={styles.page}>
      <div className={styles.breadcrumb}>
        <Link href={`/board/${post.board_type}`} className={styles.backLink}>
          <ArrowLeft size={16} />
        </Link>
        <span className={styles.breadcrumbCategory}>{config.category}</span>
        <span className={styles.breadcrumbSep}>&gt;</span>
        <span className={styles.breadcrumbBoard}>{config.label}</span>
      </div>

      {/* Article */}
      <article className={styles.article}>
        <h1 className={styles.articleTitle}>{post.title}</h1>

        <div className={styles.articleMeta}>
          <div className={styles.metaInfo}>
            <span className={styles.metaNickname}>{displayName}</span>
            <span>{formatDate(post.created_at)}</span>
            <span className={styles.metaStat}><Eye size={13} /> {post.view_count}</span>
          </div>
          <div className={styles.metaActions}>
            {isAuthor && (
              <>
                <Link href={`/post/edit/${post.id}`} className={styles.metaActionBtn}>
                  <Pencil size={16} />
                </Link>
                <button onClick={handleDeletePost} className={styles.metaActionBtnDanger}>
                  <Trash2 size={16} />
                </button>
              </>
            )}
            <button onClick={() => handleReport('post', post.id)} className={styles.metaActionBtnDanger} title="신고">
              <Flag size={16} />
            </button>
          </div>
        </div>

        <div
          className={styles.articleContent}
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(
              post.content.includes('<') ? post.content : post.content.split('\n').map((line) => {
                const imageMatch = line.match(/\[이미지\]\((https?:\/\/.+?)\)/);
                if (imageMatch) return `<img src="${imageMatch[1]}" alt="첨부 이미지" class="${styles.contentImage}" />`;
                return `<p>${line || '&nbsp;'}</p>`;
              }).join(''),
              { ADD_ATTR: ['class'] }
            ),
          }}
        />

        <EmpathyButton
          count={empathyCount}
          active={hasEmpathy}
          loading={loadingEmpathy}
          onClick={handleEmpathy}
        />
      </article>

      {/* Comments */}
      <section className={styles.commentsSection}>
        <h2 className={styles.commentsTitle}>
          <MessageCircle size={18} /> 댓글 {comments.length}
        </h2>

        {currentUserId ? (
          <div className={styles.commentForm}>
            <Textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="따뜻한 한마디를 남겨주세요..."
              rows={3}
            />
            <div className={styles.commentFormFooter}>
              <Checkbox
                checked={isAnonymousComment}
                onChange={(e) => setIsAnonymousComment(e.target.checked)}
              >
                익명
              </Checkbox>
              <Button size="sm" disabled={!commentText.trim()} onClick={() => handleComment(null)}>
                <Send size={14} /> 댓글 작성
              </Button>
            </div>
          </div>
        ) : (
          <p className={styles.loginPrompt}>
            <Link href="/auth/login" className={styles.loginPromptLink}>로그인</Link>하시면 댓글을 남길 수 있어요.
          </p>
        )}

        <div className={styles.commentList}>
          {rootComments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              replies={getReplies(comment.id)}
              currentUserId={currentUserId}
              replyTo={replyTo}
              replyText={replyText}
              isAnonymousComment={isAnonymousComment}
              setReplyTo={setReplyTo}
              setReplyText={setReplyText}
              setIsAnonymousComment={setIsAnonymousComment}
              onReply={handleComment}
              onDelete={handleDeleteComment}
              onReport={handleReport}
            />
          ))}
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className={styles.relatedSection}>
          <h2 className={styles.relatedTitle}>{categoryName}의 다른 글</h2>
          <div className={styles.relatedList}>
            {relatedPosts.map((p) => (
              <PostItem key={p.id} post={p} compact />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
