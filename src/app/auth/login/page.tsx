'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { IdCard, Lock, Eye, EyeOff } from 'lucide-react';
import { createClient } from '@/lib/supabase-client';
import { Input } from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Alert from '@/components/ui/Alert';
import { toKoreanError } from '@/lib/error-messages';
import styles from './login.module.css';

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resolvedEmail, setResolvedEmail] = useState('');
  const [isEmailNotConfirmed, setIsEmailNotConfirmed] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsEmailNotConfirmed(false);
    setResendSuccess(false);
    setLoading(true);

    // 아이디로 이메일 조회 (보안 함수 사용)
    const { data: email } = await supabase.rpc('get_email_by_username', {
      p_username: username.trim(),
    });

    if (!email) {
      setError('아이디 또는 비밀번호가 올바르지 않아요.');
      setLoading(false);
      return;
    }

    setResolvedEmail(email);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      if (error.message.includes('Email not confirmed') || error.code === 'email_not_confirmed') {
        setIsEmailNotConfirmed(true);
      }
      setError(toKoreanError(error.message));
      setLoading(false);
      return;
    }

    router.push('/');
    router.refresh();
  };

  const handleResend = async () => {
    setResendLoading(true);
    setResendSuccess(false);

    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: resolvedEmail,
    });

    if (error) {
      setError(toKoreanError(error.message));
    } else {
      setResendSuccess(true);
    }

    setResendLoading(false);
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>로그인</h1>

        <form onSubmit={handleLogin} className={styles.form}>
          {error && (
            <div>
              <Alert>{error}</Alert>
              {isEmailNotConfirmed && !resendSuccess && (
                <div className={styles.resendArea}>
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    disabled={resendLoading}
                    onClick={handleResend}
                  >
                    {resendLoading ? '전송 중...' : '인증 메일 재전송'}
                  </Button>
                </div>
              )}
              {resendSuccess && (
                <div className={styles.resendArea}>
                  <Alert variant="info">인증 메일을 다시 보냈어요. 메일함을 확인해주세요.</Alert>
                </div>
              )}
            </div>
          )}

          <Input
            label="아이디"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="아이디를 입력해주세요"
            icon={<IdCard size={18} />}
            required
          />

          <Input
            label="비밀번호"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력해주세요"
            icon={<Lock size={18} />}
            iconRight={showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            onIconRightClick={() => setShowPassword(!showPassword)}
            required
          />

          <Button type="submit" fullWidth disabled={loading}>
            {loading ? '로그인 중...' : '로그인'}
          </Button>

          <div className={styles.links}>
            <Link href="/auth/find-username" className={styles.link}>아이디 찾기</Link>
            <span className={styles.divider}>|</span>
            <Link href="/auth/forgot-password" className={styles.link}>비밀번호 찾기</Link>
            <span className={styles.divider}>|</span>
            <Link href="/auth/signup" className={styles.link}>회원가입</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
