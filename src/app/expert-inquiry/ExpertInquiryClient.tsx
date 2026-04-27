'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserPlus, ArrowLeft, CheckCircle, PenLine, ChevronDown, ChevronUp, Clock } from 'lucide-react';
import { createClient } from '@/lib/supabase-client';
import { Input } from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { formatDate } from '@/lib/format';
import styles from './expert-inquiry.module.css';

interface ExpertInquiry {
  id: string;
  expert_type: 'hospital' | 'counselor';
  name: string;
  phone: string;
  email: string | null;
  affiliation: string | null;
  content: string;
  reply: string | null;
  status: 'pending' | 'answered';
  created_at: string;
  replied_at: string | null;
}

interface Props {
  userId: string;
  inquiries: ExpertInquiry[];
}

export default function ExpertInquiryClient({ userId, inquiries: initialInquiries }: Props) {
  const router = useRouter();
  const supabase = createClient();
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [expertType, setExpertType] = useState<'hospital' | 'counselor' | ''>('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [affiliation, setAffiliation] = useState('');
  const [content, setContent] = useState('');
  const [inquiries, setInquiries] = useState(initialInquiries);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!expertType || !name.trim() || !phone.trim() || !email.trim() || !content.trim()) return;
    setLoading(true);

    const { data, error } = await supabase.from('expert_inquiries').insert({
      user_id: userId,
      expert_type: expertType,
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      affiliation: affiliation.trim() || null,
      content: content.trim(),
      status: 'pending',
    }).select().single();

    if (error) {
      alert('문의 등록에 실패했어요. 다시 시도해주세요.');
      setLoading(false);
      return;
    }

    setInquiries([data, ...inquiries]);
    setExpertType('');
    setName('');
    setPhone('');
    setEmail('');
    setAffiliation('');
    setContent('');
    setShowForm(false);
    setLoading(false);
  };

  return (
    <div className={styles.page}>
      <button className={styles.backBtn} onClick={() => router.push('/board/professional')}>
        <ArrowLeft size={16} /> 전문가 안내로 돌아가기
      </button>

      <div className={styles.headerCard}>
        <div className={styles.headerInfo}>
          <h1 className={styles.title}>전문가 등록 문의</h1>
          <p className={styles.description}>
            인마인드에 전문가로 등록하고 싶으신가요?<br />
            아래 양식을 작성해주시면 검토 후 안내드리겠습니다.
          </p>
        </div>
        <div className={styles.headerIcon}>
          <UserPlus size={24} />
        </div>
      </div>

      {/* Write Button / Form */}
      {!showForm ? (
        <button onClick={() => setShowForm(true)} className={styles.writeBtn}>
          <PenLine size={15} /> 새 문의 작성하기
        </button>
      ) : (
        <form onSubmit={handleSubmit} className={styles.formCard}>
          <h2 className={styles.formTitle}><PenLine size={15} /> 문의 작성</h2>

          <div className={styles.typeGroup}>
            <label className={styles.label}>유형 *</label>
            <div className={styles.typeOptions}>
              <label className={`${styles.typeOption} ${expertType === 'hospital' ? styles.typeOptionActive : ''}`}>
                <input
                  type="radio"
                  name="expertType"
                  value="hospital"
                  checked={expertType === 'hospital'}
                  onChange={() => setExpertType('hospital')}
                  className={styles.typeRadio}
                />
                병원/센터
              </label>
              <label className={`${styles.typeOption} ${expertType === 'counselor' ? styles.typeOptionActive : ''}`}>
                <input
                  type="radio"
                  name="expertType"
                  value="counselor"
                  checked={expertType === 'counselor'}
                  onChange={() => setExpertType('counselor')}
                  className={styles.typeRadio}
                />
                개인 상담사
              </label>
            </div>
          </div>

          <Input
            label="이름 *"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름을 입력해주세요"
            required
            maxLength={50}
          />

          <Input
            label="연락처 *"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="연락 가능한 전화번호"
            required
            maxLength={20}
          />

          <Input
            label="이메일 *"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일 주소를 입력해주세요"
            required
            maxLength={100}
          />

          <Input
            label="소속/자격"
            type="text"
            value={affiliation}
            onChange={(e) => setAffiliation(e.target.value)}
            placeholder="소속기관 또는 자격사항 (선택)"
            maxLength={200}
          />

          <div className={styles.textareaGroup}>
            <label className={styles.label}>문의 내용 *</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="등록 관련 문의 내용을 자세히 적어주세요"
              className={styles.textarea}
              rows={6}
              required
              maxLength={2000}
            />
          </div>

          <div className={styles.formActions}>
            <Button type="button" variant="secondary" onClick={() => setShowForm(false)}>
              취소
            </Button>
            <Button type="submit" disabled={loading || !expertType || !name.trim() || !phone.trim() || !email.trim() || !content.trim()}>
              {loading ? '등록 중...' : '문의 등록'}
            </Button>
          </div>
        </form>
      )}

      {/* Inquiry List */}
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
                    <span className={styles.itemType}>
                      {item.expert_type === 'hospital' ? '병원/센터' : '개인 상담사'}
                    </span>
                    <span className={styles.itemName}>{item.name}</span>
                  </div>
                  <div className={styles.itemRight}>
                    <span className={styles.itemDate}>{formatDate(item.created_at)}</span>
                    {expandedId === item.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </button>

                {expandedId === item.id && (
                  <div className={styles.itemBody}>
                    <div className={styles.inquiryMeta}>
                      <span>연락처: {item.phone}</span>
                      {item.email && <span>이메일: {item.email}</span>}
                      {item.affiliation && <span>소속/자격: {item.affiliation}</span>}
                    </div>
                    <div className={styles.inquiryContent}>
                      <span className={styles.contentLabel}>문의 내용</span>
                      <p>{item.content}</p>
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
