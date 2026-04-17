'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserPlus, ArrowLeft, CheckCircle } from 'lucide-react';
import { createClient } from '@/lib/supabase-client';
import { Input } from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import styles from './expert-inquiry.module.css';

export default function ExpertInquiryClient() {
  const router = useRouter();
  const supabase = createClient();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [expertType, setExpertType] = useState<'hospital' | 'counselor' | ''>('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [affiliation, setAffiliation] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!expertType || !name.trim() || !phone.trim() || !content.trim()) return;
    setLoading(true);

    const { error } = await supabase.from('expert_inquiries').insert({
      expert_type: expertType,
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim() || null,
      affiliation: affiliation.trim() || null,
      content: content.trim(),
      status: 'pending',
    });

    if (error) {
      alert('문의 등록에 실패했어요. 다시 시도해주세요.');
      setLoading(false);
      return;
    }

    setSubmitted(true);
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className={styles.page}>
        <div className={styles.successCard}>
          <div className={styles.successIcon}>
            <CheckCircle size={48} />
          </div>
          <h2 className={styles.successTitle}>문의가 등록되었어요</h2>
          <p className={styles.successDesc}>
            빠른 시일 내에 확인 후 연락드리겠습니다.<br />감사합니다.
          </p>
          <Button onClick={() => router.push('/board/professional')}>
            전문가 안내로 돌아가기
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <button className={styles.backBtn} onClick={() => router.back()}>
        <ArrowLeft size={16} /> 돌아가기
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

      <form onSubmit={handleSubmit} className={styles.formCard}>
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
          label="이메일"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일 주소 (선택)"
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
          <Button type="button" variant="secondary" onClick={() => router.back()}>
            취소
          </Button>
          <Button type="submit" disabled={loading || !expertType || !name.trim() || !phone.trim() || !content.trim()}>
            {loading ? '등록 중...' : '문의 등록'}
          </Button>
        </div>
      </form>
    </div>
  );
}
