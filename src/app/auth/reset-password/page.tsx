'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { createClient } from '@/lib/supabase-client';
import { Input } from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Alert from '@/components/ui/Alert';
import { toKoreanError } from '@/lib/error-messages';
import styles from './reset-password.module.css';

export default function ResetPasswordPage() {
  const router = useRouter();
  const supabase = createClient();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password.length < 8) {
      setError('비밀번호는 8자 이상이어야 해요.');
      return;
    }

    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않아요.');
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({ password });

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
          <h1 className={styles.pageTitle}>비밀번호가 변경되었어요</h1>
          <div className={styles.successBox}>
            <p className={styles.successText}>
              새 비밀번호로 로그인할 수 있어요.
            </p>
            <Button fullWidth onClick={() => { router.push('/'); router.refresh(); }}>
              홈으로 이동
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>새 비밀번호 설정</h1>
        <p className={styles.desc}>새로운 비밀번호를 입력해주세요.</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <Alert>{error}</Alert>}

          <Input
            label="새 비밀번호"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="8자 이상 입력해주세요"
            icon={<Lock size={18} />}
            iconRight={showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            onIconRightClick={() => setShowPassword(!showPassword)}
            required
            minLength={8}
          />

          <Input
            label="비밀번호 확인"
            type={showPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="비밀번호를 다시 입력해주세요"
            icon={<Lock size={18} />}
            required
            minLength={8}
          />

          <Button type="submit" fullWidth disabled={loading}>
            {loading ? '변경 중...' : '비밀번호 변경'}
          </Button>
        </form>
      </div>
    </div>
  );
}
