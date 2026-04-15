'use client';

import { useState, useRef, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { PenLine, Headphones, ChevronDown, ChevronUp, Clock, CheckCircle } from 'lucide-react';
import DOMPurify from 'isomorphic-dompurify';
import { createClient } from '@/lib/supabase-client';
import { Input } from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { formatDate } from '@/lib/format';
import styles from './support.module.css';
import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false }) as any;

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
}

interface Props {
  inquiries: Inquiry[];
  userId: string;
}

const INQUIRY_CATEGORIES = [
  '이용 문의',
  '계정 문의',
  '신고',
  '건의사항',
  '버그 제보',
  '기타',
];

export default function SupportClient({ inquiries: initialInquiries, userId }: Props) {
  const router = useRouter();
  const supabase = createClient();
  const [showForm, setShowForm] = useState(false);
  const [category, setCategory] = useState(INQUIRY_CATEGORIES[0]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [inquiries, setInquiries] = useState(initialInquiries);
  const quillRef = useRef<any>(null);
  const quillCallbackRef = useCallback((el: any) => {
    if (el) quillRef.current = el;
  }, []);

  const modules = useMemo(() => ({
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      ['clean'],
    ],
  }), []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const plainText = content.replace(/<[^>]*>/g, '').trim();
    if (!title.trim() || !plainText) return;
    setLoading(true);

    const { data, error } = await supabase.from('inquiries').insert({
      user_id: userId,
      category,
      title: title.trim(),
      content: content,
      status: 'pending',
    }).select().single();

    if (error) {
      alert('문의 등록에 실패했어요.');
      setLoading(false);
      return;
    }

    setInquiries([data, ...inquiries]);
    setTitle('');
    setContent('');
    setShowForm(false);
    setLoading(false);
  };

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.headerCard}>
        <div className={styles.headerInfo}>
          <h1 className={styles.title}>고객센터</h1>
          <p className={styles.description}>1:1 문의를 남겨주시면 빠르게 답변 드릴게요.</p>
        </div>
        <div className={styles.headerIcon}>
          <Headphones size={24} />
        </div>
      </div>

      {/* Write / Form */}
      {!showForm ? (
        <button onClick={() => setShowForm(true)} className={styles.writeBtn}>
          <PenLine size={15} /> 새 문의 작성하기
        </button>
      ) : (
        <form onSubmit={handleSubmit} className={styles.formCard}>
          <h2 className={styles.formTitle}><PenLine size={15} /> 문의 작성</h2>

          <div className={styles.selectGroup}>
            <label className={styles.label}>문의 유형</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={styles.select}
            >
              {INQUIRY_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <Input
            label="제목"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="문의 제목을 입력해주세요"
            required
            maxLength={100}
          />

          <div className={styles.editorGroup}>
            <label className={styles.label}>내용</label>
            <ReactQuill
              ref={quillCallbackRef}
              theme="snow"
              value={content}
              onChange={setContent}
              modules={modules}
              placeholder="문의 내용을 상세히 적어주세요"
              className={styles.editor}
            />
          </div>

          <div className={styles.formActions}>
            <Button type="button" variant="secondary" onClick={() => setShowForm(false)}>
              취소
            </Button>
            <Button type="submit" disabled={loading || !title.trim() || !content.replace(/<[^>]*>/g, '').trim()}>
              {loading ? '등록 중...' : '문의 등록'}
            </Button>
          </div>
        </form>
      )}

      {/* List */}
      <div className={styles.listCard}>
        <div className={styles.listHeader}>
          <h2 className={styles.listTitle}>내 문의 내역</h2>
          <span className={styles.listCount}>{inquiries.length}건</span>
        </div>

        {inquiries.length === 0 ? (
          <div className={styles.empty}>
            <p>문의 내역이 없어요</p>
          </div>
        ) : (
          <ul className={styles.list}>
            {inquiries.map((item) => (
              <li key={item.id} className={styles.listItem}>
                <button
                  className={styles.itemHeader}
                  onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                >
                  <div className={styles.itemInfo}>
                    <span className={`${styles.status} ${item.status === 'answered' ? styles.statusAnswered : styles.statusPending}`}>
                      {item.status === 'answered' ? <><CheckCircle size={12} /> 답변완료</> : <><Clock size={12} /> 대기중</>}
                    </span>
                    <span className={styles.itemCategory}>{item.category}</span>
                    <span className={styles.itemTitle}>{item.title}</span>
                  </div>
                  <div className={styles.itemRight}>
                    <span className={styles.itemDate}>{formatDate(item.created_at)}</span>
                    {expandedId === item.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </button>

                {expandedId === item.id && (
                  <div className={styles.itemBody}>
                    <div className={styles.inquiryContent}>
                      <span className={styles.contentLabel}>문의 내용</span>
                      <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.content) }} />
                    </div>
                    {item.reply && (
                      <div className={styles.replyContent}>
                        <span className={styles.contentLabel}>답변</span>
                        <p>{item.reply}</p>
                        {item.replied_at && (
                          <span className={styles.replyDate}>{formatDate(item.replied_at)}</span>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
