'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail } from 'lucide-react';
import { createClient } from '@/lib/supabase-client';
import { Input } from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Alert from '@/components/ui/Alert';
import { toKoreanError } from '@/lib/error-messages';
import styles from './forgot-password.module.css';

export default function ForgotPasswordPage() {
  const supabase = createClient();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/auth/reset-password`,
    });

    if (error) {
      setError(toKoreanError(error.message));
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  };

  if (success) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <h1 className={styles.pageTitle}>이메일을 확인해주세요</h1>
          <div className={styles.successBox}>
            <p className={styles.successText}>
              비밀번호 재설정 링크를 보내드렸어요.<br />
              이메일을 확인하고 링크를 클릭해주세요.
            </p>
            <Link href="/auth/login">
              <Button fullWidth>로그인 페이지로 돌아가기</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>비밀번호 찾기</h1>
        <p className={styles.desc}>가입한 이메일로 재설정 링크를 보내드릴게요</p>

        <form onSubmit={handleReset} className={styles.form}>
          {error && <Alert>{error}</Alert>}

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
            {loading ? '전송 중...' : '재설정 링크 보내기'}
          </Button>

          <p className={styles.footer}>
            <Link href="/auth/login" className={styles.link}>로그인으로 돌아가기</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
