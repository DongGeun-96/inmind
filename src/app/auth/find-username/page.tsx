'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, IdCard } from 'lucide-react';
import { createClient } from '@/lib/supabase-client';
import { Input } from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Alert from '@/components/ui/Alert';
import styles from './find-username.module.css';

export default function FindUsernamePage() {
  const supabase = createClient();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [foundUsername, setFoundUsername] = useState('');

  const handleFind = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setFoundUsername('');
    setLoading(true);

    const { data, error } = await supabase.rpc('find_username_by_email', {
      p_email: email.trim(),
    });

    if (error) {
      setError('조회 중 오류가 발생했어요.');
      setLoading(false);
      return;
    }

    if (!data) {
      setError('해당 이메일로 가입된 계정을 찾을 수 없어요.');
      setLoading(false);
      return;
    }

    setFoundUsername(data);
    setLoading(false);
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>아이디 찾기</h1>
        <p className={styles.desc}>가입한 이메일을 입력하면 아이디를 알려드릴게요.</p>

        <form onSubmit={handleFind} className={styles.form}>
          {error && <Alert>{error}</Alert>}

          {foundUsername && (
            <div className={styles.resultBox}>
              <div className={styles.resultIcon}>
                <IdCard size={24} />
              </div>
              <p className={styles.resultLabel}>회원님의 아이디</p>
              <p className={styles.resultUsername}>{foundUsername}</p>
              <p className={styles.resultHint}>보안을 위해 일부 문자가 *로 표시돼요.</p>
            </div>
          )}

          <Input
            label="이메일"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="가입한 이메일을 입력해주세요"
            icon={<Mail size={18} />}
            required
          />

          <Button type="submit" fullWidth disabled={loading}>
            {loading ? '조회 중...' : '아이디 찾기'}
          </Button>

          <div className={styles.links}>
            <Link href="/auth/forgot-password" className={styles.link}>비밀번호 찾기</Link>
            <span className={styles.divider}>|</span>
            <Link href="/auth/login" className={styles.link}>로그인</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
