'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Users, FileText, MessageCircle, AlertTriangle, Headphones,
  Ban, CheckCircle, Trash2, Send, Eye, Shield,
} from 'lucide-react';
import { createClient } from '@/lib/supabase-client';
import { formatDate, timeAgo } from '@/lib/format';
import { BOARD_CONFIG, type BoardType, type User, type Post, type Report } from '@/types/database';
import Button from '@/components/ui/Button';
import styles from './admin.module.css';

type Tab = 'dashboard' | 'users' | 'posts' | 'reports' | 'inquiries';

interface Inquiry {
  id: string;
  user_id: string;
  category: string;
  title: string;
  content: string;
  reply: string | null;
  status: 'pending' | 'answered';
  created_at: string;
  replied_at: string | null;
  user?: { nickname: string; email: string } | null;
}

interface Props {
  stats: {
    users: number;
    posts: number;
    comments: number;
    pendingReports: number;
    pendingInquiries: number;
  };
  users: User[];
  posts: (Post & { user?: { nickname: string } | null })[];
  reports: Report[];
  inquiries: Inquiry[];
}

export default function AdminClient({ stats, users: initialUsers, posts: initialPosts, reports: initialReports, inquiries: initialInquiries }: Props) {
  const supabase = createClient();
  const [tab, setTab] = useState<Tab>('dashboard');
  const [users, setUsers] = useState(initialUsers);
  const [posts, setPosts] = useState(initialPosts);
  const [reports, setReports] = useState(initialReports);
  const [inquiries, setInquiries] = useState(initialInquiries);
  const [replyingId, setReplyingId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  const handleBanUser = async (userId: string, isBanned: boolean) => {
    await supabase.from('users').update({ is_banned: !isBanned }).eq('id', userId);
    setUsers(users.map(u => u.id === userId ? { ...u, is_banned: !isBanned } : u));
  };

  const handleDeletePost = async (postId: string) => {
    if (!confirm('게시글을 삭제하시겠어요?')) return;
    await supabase.from('posts').delete().eq('id', postId);
    setPosts(posts.filter(p => p.id !== postId));
  };

  const handleReport = async (reportId: string) => {
    await supabase.from('reports').update({ is_handled: true }).eq('id', reportId);
    setReports(reports.map(r => r.id === reportId ? { ...r, is_handled: true } : r));
  };

  const handleReply = async (inquiryId: string) => {
    if (!replyText.trim()) return;
    const repliedAt = new Date().toISOString();
    await supabase
      .from('inquiries')
      .update({ reply: replyText.trim(), status: 'answered', replied_at: repliedAt })
      .eq('id', inquiryId);
    setInquiries(inquiries.map(i => i.id === inquiryId ? { ...i, reply: replyText.trim(), status: 'answered' as const, replied_at: repliedAt } : i));
    setReplyText('');
    setReplyingId(null);
  };

  const tabs: { key: Tab; label: string; icon: React.ReactNode; badge?: number }[] = [
    { key: 'dashboard', label: '대시보드', icon: <Shield size={15} /> },
    { key: 'users', label: '회원', icon: <Users size={15} />, badge: stats.users },
    { key: 'posts', label: '게시글', icon: <FileText size={15} />, badge: stats.posts },
    { key: 'reports', label: '신고', icon: <AlertTriangle size={15} />, badge: stats.pendingReports },
    { key: 'inquiries', label: '문의', icon: <Headphones size={15} />, badge: stats.pendingInquiries },
  ];

  return (
    <div className={styles.page}>
      <div className={styles.headerCard}>
        <div className={styles.headerInfo}>
          <h1 className={styles.headerTitle}>관리자</h1>
          <p className={styles.headerDesc}>인마인드 관리 페이지</p>
        </div>
        <div className={styles.headerIcon}><Shield size={24} /></div>
      </div>

      <div className={styles.tabs}>
        {tabs.map(t => (
          <button
            key={t.key}
            className={`${styles.tab} ${tab === t.key ? styles.tabActive : ''}`}
            onClick={() => setTab(t.key)}
          >
            {t.icon} {t.label}
            {t.badge !== undefined && t.badge > 0 && (
              <span className={styles.tabBadge}>{t.badge}</span>
            )}
          </button>
        ))}
      </div>

      {/* Dashboard */}
      {tab === 'dashboard' && (
        <div className={styles.dashboard}>
          <div className={styles.statCard}>
            <Users size={20} className={styles.statIcon} />
            <div>
              <span className={styles.statValue}>{stats.users}</span>
              <span className={styles.statLabel}>전체 회원</span>
            </div>
          </div>
          <div className={styles.statCard}>
            <FileText size={20} className={styles.statIcon} />
            <div>
              <span className={styles.statValue}>{stats.posts}</span>
              <span className={styles.statLabel}>전체 게시글</span>
            </div>
          </div>
          <div className={styles.statCard}>
            <MessageCircle size={20} className={styles.statIcon} />
            <div>
              <span className={styles.statValue}>{stats.comments}</span>
              <span className={styles.statLabel}>전체 댓글</span>
            </div>
          </div>
          <div className={styles.statCard + ' ' + styles.statCardWarn}>
            <AlertTriangle size={20} className={styles.statIcon} />
            <div>
              <span className={styles.statValue}>{stats.pendingReports}</span>
              <span className={styles.statLabel}>미처리 신고</span>
            </div>
          </div>
          <div className={styles.statCard + ' ' + styles.statCardAccent}>
            <Headphones size={20} className={styles.statIcon} />
            <div>
              <span className={styles.statValue}>{stats.pendingInquiries}</span>
              <span className={styles.statLabel}>미답변 문의</span>
            </div>
          </div>
        </div>
      )}

      {/* Users */}
      {tab === 'users' && (
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>회원 관리</h2>
          </div>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>닉네임</th>
                  <th>이메일</th>
                  <th>가입일</th>
                  <th>상태</th>
                  <th>관리</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id}>
                    <td className={styles.cellBold}>{u.nickname}</td>
                    <td>{u.email}</td>
                    <td>{u.created_at?.slice(0, 10)}</td>
                    <td>
                      {u.is_banned ? (
                        <span className={styles.badgeDanger}>차단</span>
                      ) : (
                        <span className={styles.badgeSuccess}>정상</span>
                      )}
                    </td>
                    <td>
                      <button
                        className={u.is_banned ? styles.actionBtnSuccess : styles.actionBtnDanger}
                        onClick={() => handleBanUser(u.id, u.is_banned)}
                      >
                        {u.is_banned ? <><CheckCircle size={13} /> 해제</> : <><Ban size={13} /> 차단</>}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Posts */}
      {tab === 'posts' && (
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>게시글 관리</h2>
          </div>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>게시판</th>
                  <th>제목</th>
                  <th>작성자</th>
                  <th>작성일</th>
                  <th>관리</th>
                </tr>
              </thead>
              <tbody>
                {posts.map(p => {
                  const config = BOARD_CONFIG[p.board_type as BoardType];
                  return (
                    <tr key={p.id}>
                      <td><span className={styles.badgeBoard}>{config?.label || p.board_type}</span></td>
                      <td className={styles.cellTitle}>
                        <Link href={`/post/${p.id}`} className={styles.postLink}>{p.title}</Link>
                      </td>
                      <td>{p.is_anonymous ? '익명' : p.user?.nickname || '-'}</td>
                      <td>{timeAgo(p.created_at)}</td>
                      <td>
                        <div className={styles.actionGroup}>
                          <Link href={`/post/${p.id}`} className={styles.actionBtn}><Eye size={13} /></Link>
                          <button className={styles.actionBtnDanger} onClick={() => handleDeletePost(p.id)}>
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Reports */}
      {tab === 'reports' && (
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>신고 관리</h2>
          </div>
          {reports.length === 0 ? (
            <p className={styles.empty}>신고 내역이 없어요</p>
          ) : (
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>유형</th>
                    <th>사유</th>
                    <th>신고일</th>
                    <th>상태</th>
                    <th>관리</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map(r => (
                    <tr key={r.id}>
                      <td><span className={styles.badgeBoard}>{r.target_type === 'post' ? '게시글' : '댓글'}</span></td>
                      <td className={styles.cellTitle}>{r.reason}</td>
                      <td>{timeAgo(r.created_at)}</td>
                      <td>
                        {r.is_handled ? (
                          <span className={styles.badgeSuccess}>처리완료</span>
                        ) : (
                          <span className={styles.badgeDanger}>미처리</span>
                        )}
                      </td>
                      <td>
                        {!r.is_handled && (
                          <button className={styles.actionBtnSuccess} onClick={() => handleReport(r.id)}>
                            <CheckCircle size={13} /> 처리
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Inquiries */}
      {tab === 'inquiries' && (
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>문의 관리</h2>
          </div>
          {inquiries.length === 0 ? (
            <p className={styles.empty}>문의 내역이 없어요</p>
          ) : (
            <ul className={styles.inquiryList}>
              {inquiries.map(inq => (
                <li key={inq.id} className={styles.inquiryItem}>
                  <div className={styles.inquiryHeader}>
                    <div className={styles.inquiryMeta}>
                      <span className={inq.status === 'answered' ? styles.badgeSuccess : styles.badgePending}>
                        {inq.status === 'answered' ? '답변완료' : '대기중'}
                      </span>
                      <span className={styles.inquiryCategory}>{inq.category}</span>
                      <span className={styles.inquiryUser}>{inq.user?.nickname || '-'} ({inq.user?.email || '-'})</span>
                    </div>
                    <span className={styles.inquiryDate}>{timeAgo(inq.created_at)}</span>
                  </div>
                  <h3 className={styles.inquiryTitle}>{inq.title}</h3>
                  <div className={styles.inquiryContent} dangerouslySetInnerHTML={{ __html: inq.content }} />

                  {inq.reply && (
                    <div className={styles.inquiryReply}>
                      <span className={styles.replyLabel}>답변</span>
                      <p>{inq.reply}</p>
                      {inq.replied_at && <span className={styles.replyDate}>{formatDate(inq.replied_at)}</span>}
                    </div>
                  )}

                  {!inq.reply && replyingId !== inq.id && (
                    <button className={styles.replyBtn} onClick={() => setReplyingId(inq.id)}>
                      <Send size={13} /> 답변 작성
                    </button>
                  )}

                  {replyingId === inq.id && (
                    <div className={styles.replyForm}>
                      <textarea
                        value={replyText}
                        onChange={e => setReplyText(e.target.value)}
                        placeholder="답변을 입력하세요"
                        className={styles.replyTextarea}
                        rows={4}
                      />
                      <div className={styles.replyActions}>
                        <Button size="sm" variant="secondary" onClick={() => { setReplyingId(null); setReplyText(''); }}>취소</Button>
                        <Button size="sm" onClick={() => handleReply(inq.id)} disabled={!replyText.trim()}>답변 등록</Button>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
