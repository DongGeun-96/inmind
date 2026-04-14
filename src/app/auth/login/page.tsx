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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // 아이디로 이메일 조회
    const { data: user } = await supabase
      .from('users')
      .select('email')
      .eq('username', username.trim())
      .single();

    if (!user) {
      setError('아이디 또는 비밀번호가 올바르지 않아요.');
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: user.email,
      password,
    });

    if (error) {
      setError(toKoreanError(error.message));
      setLoading(false);
      return;
    }

    router.push('/');
    router.refresh();
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>로그인</h1>

        <form onSubmit={handleLogin} className={styles.form}>
          {error && <Alert>{error}</Alert>}

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
            <Link href="/auth/forgot-password" className={styles.link}>비밀번호 찾기</Link>
            <span className={styles.divider}>|</span>
            <Link href="/auth/signup" className={styles.link}>회원가입</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
