'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User as UserIcon, Lock, AlertTriangle, Shield } from 'lucide-react';
import { createClient } from '@/lib/supabase-client';
import { toKoreanError } from '@/lib/error-messages';
import { timeAgo } from '@/lib/format';
import PostItem from '@/components/PostItem';
import Button from '@/components/ui/Button';
import type { Post, User } from '@/types/database';
import { BOARD_CONFIG, type BoardType } from '@/types/database';
import styles from './mypage.module.css';

type Tab = 'posts' | 'comments' | 'empathies' | 'profile';

interface MyComment {
  id: string;
  content: string;
  created_at: string;
  post: { id: string; title: string; board_type: string } | null;
}

interface MyEmpathy {
  id: string;
  post: Post | null;
}

interface Props {
  profile: User | null;
  myPosts: Post[];
  myComments: MyComment[];
  myEmpathies: MyEmpathy[];
}

export default function MypageClient({ profile, myPosts, myComments, myEmpathies }: Props) {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>('posts');
  const [nickname, setNickname] = useState(profile?.nickname || '');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  // 비밀번호 변경
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  // 회원 탈퇴
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleNicknameUpdate = async () => {
    if (!nickname.trim() || nickname.trim().length < 2) {
      setMessage('닉네임은 2자 이상이어야 해요');
      return;
    }
    setSaving(true);
    setMessage('');
    const supabase = createClient();
    const { error } = await supabase
      .from('users')
      .update({ nickname: nickname.trim() })
      .eq('id', profile?.id);

    if (error) {
      setMessage('닉네임 변경에 실패했어요');
    } else {
      setMessage('닉네임이 변경되었어요');
    }
    setSaving(false);
  };

  const handlePasswordChange = async () => {
    setPasswordMessage('');
    setPasswordError(false);

    if (!currentPassword) {
      setPasswordMessage('현재 비밀번호를 입력해주세요');
      setPasswordError(true);
      return;
    }
    if (newPassword.length < 6) {
      setPasswordMessage('새 비밀번호는 6자 이상이어야 해요');
      setPasswordError(true);
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setPasswordMessage('새 비밀번호가 일치하지 않아요');
      setPasswordError(true);
      return;
    }

    setPasswordSaving(true);
    const supabase = createClient();

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: profile?.email || '',
      password: currentPassword,
    });

    if (signInError) {
      setPasswordMessage('현재 비밀번호가 올바르지 않아요');
      setPasswordError(true);
      setPasswordSaving(false);
      return;
    }

    const { error: updateError } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (updateError) {
      setPasswordMessage(toKoreanError(updateError.message));
      setPasswordError(true);
    } else {
      setPasswordMessage('비밀번호가 변경되었어요');
      setPasswordError(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    }
    setPasswordSaving(false);
  };

  const handleDeleteAccount = async () => {
    setDeleting(true);
    const supabase = createClient();

    if (profile?.id) {
      await supabase.from('users').delete().eq('id', profile.id);
    }

    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: 'posts', label: '내 글', count: myPosts.length },
    { key: 'comments', label: '댓글', count: myComments.length },
    { key: 'empathies', label: '공감', count: myEmpathies.length },
    { key: 'profile', label: '설정', count: 0 },
  ];

  const initial = profile?.nickname?.charAt(0) || '?';

  return (
    <div className={styles.page}>
      <h1 className={styles.pageTitle}>마이페이지</h1>

      {/* Profile Card */}
      <div className={styles.profileCard}>
        <div className={styles.profileTop}>
          <div className={styles.avatar}>{initial}</div>
          <div>
            <div className={styles.profileName}>{profile?.nickname || '사용자'}</div>
            <div className={styles.profileEmail}>{profile?.email}</div>
          </div>
        </div>
        {profile?.role === 'admin' && (
          <a href={process.env.NEXT_PUBLIC_ADMIN_URL || 'http://localhost:3001'} target="_blank" rel="noopener noreferrer" className={styles.adminLink}>
            <Shield size={15} /> 관리자 페이지
          </a>
        )}
        <div className={styles.profileStats}>
          <div className={styles.statItem}>
            <span className={styles.statValue}>{myPosts.length}</span>
            <span className={styles.statLabel}>작성글</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>{myComments.length}</span>
            <span className={styles.statLabel}>댓글</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>{myEmpathies.length}</span>
            <span className={styles.statLabel}>공감</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className={styles.tabs}>
        {tabs.map((t) => (
          <button
            key={t.key}
            className={`${styles.tab} ${tab === t.key ? styles.tabActive : ''}`}
            onClick={() => setTab(t.key)}
          >
            {t.label}
            {t.key !== 'profile' && <span className={styles.tabCount}>{t.count}</span>}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className={styles.contentCard}>
        {tab === 'posts' && (
          <>
            {myPosts.length === 0 ? (
              <p className={styles.empty}>작성한 글이 없어요</p>
            ) : (
              <ul>
                {myPosts.map((post) => (
                  <li key={post.id} className={styles.listItem}>
                    <PostItem post={post} showBoard />
                  </li>
                ))}
              </ul>
            )}
          </>
        )}

        {tab === 'comments' && (
          <>
            {myComments.length === 0 ? (
              <p className={styles.empty}>작성한 댓글이 없어요</p>
            ) : (
              <ul>
                {myComments.map((comment) => (
                  <li key={comment.id} className={styles.commentItem}>
                    {comment.post && (
                      <Link href={`/post/${comment.post.id}`} className={styles.commentPostTitle}>
                        {BOARD_CONFIG[comment.post.board_type as BoardType]?.label} &gt; {comment.post.title}
                      </Link>
                    )}
                    <p className={styles.commentContent}>{comment.content}</p>
                    <span className={styles.commentTime}>{timeAgo(comment.created_at)}</span>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}

        {tab === 'empathies' && (
          <>
            {myEmpathies.length === 0 ? (
              <p className={styles.empty}>공감한 글이 없어요</p>
            ) : (
              <ul>
                {myEmpathies.map((empathy) =>
                  empathy.post ? (
                    <li key={empathy.id} className={styles.listItem}>
                      <PostItem post={empathy.post} showBoard />
                    </li>
                  ) : null
                )}
              </ul>
            )}
          </>
        )}

        {tab === 'profile' && (
          <div className={styles.profileSection}>
            {/* 기본 정보 */}
            <div className={styles.profileGroup}>
              <h3 className={styles.profileGroupTitle}><UserIcon size={15} /> 기본 정보</h3>
              <div className={styles.profileField}>
                <label className={styles.profileLabel}>이메일</label>
                <p className={styles.profileValue}>{profile?.email}</p>
              </div>
              <div className={styles.profileField}>
                <label className={styles.profileLabel}>가입일</label>
                <p className={styles.profileValue}>{profile?.created_at?.slice(0, 10)}</p>
              </div>
              <div className={styles.profileField}>
                <label className={styles.profileLabel}>닉네임</label>
                <div className={styles.nicknameRow}>
                  <input
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    className={styles.nicknameInput}
                    maxLength={20}
                  />
                  <Button size="sm" onClick={handleNicknameUpdate} disabled={saving}>
                    {saving ? '저장 중...' : '변경'}
                  </Button>
                </div>
                {message && <p className={styles.message}>{message}</p>}
              </div>
            </div>

            {/* 비밀번호 변경 */}
            <div className={styles.profileGroup}>
              <h3 className={styles.profileGroupTitle}><Lock size={15} /> 비밀번호 변경</h3>
              <div className={styles.profileField}>
                <label className={styles.profileLabel}>현재 비밀번호</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className={styles.nicknameInput}
                  placeholder="현재 비밀번호 입력"
                />
              </div>
              <div className={styles.profileField}>
                <label className={styles.profileLabel}>새 비밀번호</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className={styles.nicknameInput}
                  placeholder="6자 이상 입력"
                />
              </div>
              <div className={styles.profileField}>
                <label className={styles.profileLabel}>새 비밀번호 확인</label>
                <input
                  type="password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  className={styles.nicknameInput}
                  placeholder="새 비밀번호 다시 입력"
                />
              </div>
              <Button size="sm" onClick={handlePasswordChange} disabled={passwordSaving}>
                {passwordSaving ? '변경 중...' : '비밀번호 변경'}
              </Button>
              {passwordMessage && (
                <p className={passwordError ? styles.messageError : styles.message}>
                  {passwordMessage}
                </p>
              )}
            </div>

            {/* 회원 탈퇴 */}
            <div className={styles.dangerGroup}>
              <h3 className={styles.dangerGroupTitle}><AlertTriangle size={15} /> 회원 탈퇴</h3>
              <p className={styles.deleteWarning}>
                탈퇴 시 작성한 글과 댓글은 삭제되지 않으며, 계정 복구가 불가능합니다.
              </p>
              {!showDeleteConfirm ? (
                <Button size="sm" variant="danger" onClick={() => setShowDeleteConfirm(true)}>
                  회원 탈퇴
                </Button>
              ) : (
                <div className={styles.deleteConfirm}>
                  <p className={styles.deleteConfirmText}>정말 탈퇴하시겠어요?</p>
                  <div className={styles.deleteConfirmButtons}>
                    <Button size="sm" variant="danger" onClick={handleDeleteAccount} disabled={deleting}>
                      {deleting ? '처리 중...' : '탈퇴하기'}
                    </Button>
                    <Button size="sm" onClick={() => setShowDeleteConfirm(false)}>
                      취소
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
