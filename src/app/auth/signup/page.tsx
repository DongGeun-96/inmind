'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Lock, Eye, EyeOff, Mail, User, ChevronRight, IdCard } from 'lucide-react';
import { createClient } from '@/lib/supabase-client';
import { Input } from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Alert from '@/components/ui/Alert';
import { toKoreanError } from '@/lib/error-messages';
import styles from './signup.module.css';

export default function SignupPage() {
  const router = useRouter();
  const supabase = createClient();
  const [username, setUsername] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [usernameStatus, setUsernameStatus] = useState<'idle' | 'checking' | 'available' | 'taken'>('idle');
  const usernameTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const checkUsername = useCallback(async (value: string) => {
    if (value.length < 4 || !/^[a-zA-Z0-9_]+$/.test(value)) {
      setUsernameStatus('idle');
      return;
    }
    setUsernameStatus('checking');
    const { data } = await supabase
      .from('users')
      .select('id')
      .eq('username', value)
      .maybeSingle();
    setUsernameStatus(data ? 'taken' : 'available');
  }, [supabase]);

  const handleUsernameChange = (value: string) => {
    setUsername(value);
    setUsernameStatus('idle');
    if (usernameTimerRef.current) clearTimeout(usernameTimerRef.current);
    if (value.length >= 4 && /^[a-zA-Z0-9_]+$/.test(value)) {
      usernameTimerRef.current = setTimeout(() => checkUsername(value), 500);
    }
  };

  useEffect(() => {
    return () => {
      if (usernameTimerRef.current) clearTimeout(usernameTimerRef.current);
    };
  }, []);

  const [agreeAll, setAgreeAll] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [agreeAge, setAgreeAge] = useState(false);

  const handleAgreeAll = (checked: boolean) => {
    setAgreeAll(checked);
    setAgreeTerms(checked);
    setAgreePrivacy(checked);
    setAgreeAge(checked);
  };

  const handleIndividualAgree = (setter: (v: boolean) => void, value: boolean) => {
    setter(value);
    if (!value) setAgreeAll(false);
  };

  const allChecked = agreeTerms && agreePrivacy && agreeAge;
  if (allChecked && !agreeAll) setAgreeAll(true);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (username.length < 4 || username.length > 20) {
      setError('아이디는 4~20자로 입력해주세요.');
      return;
    }
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      setError('아이디는 영문, 숫자, 밑줄(_)만 사용 가능합니다.');
      return;
    }
    if (usernameStatus === 'taken') {
      setError('이미 사용 중인 아이디입니다.');
      return;
    }
    if (nickname.length < 2 || nickname.length > 20) {
      setError('닉네임은 2~20자로 입력해주세요.');
      return;
    }
    if (email !== confirmEmail) {
      setError('이메일 주소가 일치하지 않아요.');
      return;
    }
    if (password.length < 8) {
      setError('비밀번호는 8자 이상이어야 해요.');
      return;
    }
    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않아요.');
      return;
    }

    setLoading(true);

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { nickname, username } },
    });

    if (signUpError) {
      setError(toKoreanError(signUpError.message));
      setLoading(false);
      return;
    }

    if (data.user) {
      await supabase.from('users').upsert({
        id: data.user.id,
        nickname,
        email,
        username,
      });
    }

    setSuccess(true);
    setLoading(false);
  };

  if (success) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <h1 className={styles.pageTitle}>회원가입 완료</h1>
          <div className={styles.successBox}>
            <p className={styles.successText}>
              이메일로 인증 링크를 보내드렸어요.<br />
              인증 후 로그인해주세요.
            </p>
            <Link href="/auth/login">
              <Button fullWidth>로그인 페이지로 이동</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>회원가입</h1>

        <form onSubmit={handleSignup} className={styles.form}>
          {error && <Alert>{error}</Alert>}

          <div className={styles.fieldGroup}>
            <Input
              label="아이디"
              type="text"
              value={username}
              onChange={(e) => handleUsernameChange(e.target.value)}
              placeholder="4~20자 영문, 숫자, 밑줄(_)"
              icon={<IdCard size={18} />}
              required
              maxLength={20}
            />
            {usernameStatus === 'checking' && (
              <p className={styles.usernameChecking}>확인 중...</p>
            )}
            {usernameStatus === 'available' && (
              <p className={styles.usernameAvailable}>사용 가능한 아이디입니다</p>
            )}
            {usernameStatus === 'taken' && (
              <p className={styles.usernameTaken}>이미 사용 중인 아이디입니다</p>
            )}
          </div>

          <Input
            label="비밀번호"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="8자 이상 입력해주세요"
            icon={<Lock size={18} />}
            iconRight={showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            onIconRightClick={() => setShowPassword(!showPassword)}
            required
          />

          <Input
            label="비밀번호 확인"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="비밀번호를 다시 입력해주세요"
            icon={<Lock size={18} />}
            required
          />

          <Input
            label="닉네임"
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="커뮤니티에서 사용할 닉네임 (2~20자)"
            icon={<User size={18} />}
            required
            maxLength={20}
          />

          <div className={styles.fieldGroup}>
            <Input
              label="이메일 주소"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일 주소를 입력해주세요"
              icon={<Mail size={18} />}
              required
            />
            <div className={styles.fieldHint}>
              <p>메일주소는 메일인증 후 비밀번호 변경이나 찾기 등에 사용됩니다.</p>
              <p>인증 메일이 보이지 않으면 스팸보관함을 열어보시길 바랍니다.</p>
            </div>
          </div>

          <Input
            label="이메일 주소 확인"
            type="email"
            value={confirmEmail}
            onChange={(e) => setConfirmEmail(e.target.value)}
            placeholder="이메일 주소를 다시 입력해주세요"
            icon={<Mail size={18} />}
            required
          />

          {/* 약관 동의 */}
          <div className={styles.agreements}>
            <label className={styles.agreeAll}>
              <input
                type="checkbox"
                checked={agreeAll}
                onChange={(e) => handleAgreeAll(e.target.checked)}
              />
              <span>전체 동의</span>
            </label>

            <div className={styles.agreeDivider} />

            <label className={styles.agreeItem}>
              <input
                type="checkbox"
                checked={agreeAge}
                onChange={(e) => handleIndividualAgree(setAgreeAge, e.target.checked)}
              />
              <span>만 14세 이상입니다</span>
            </label>

            <label className={styles.agreeItem}>
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => handleIndividualAgree(setAgreeTerms, e.target.checked)}
              />
              <span><em className={styles.required}>[필수]</em> 이용약관 동의</span>
              <Link href="/terms" target="_blank" className={styles.viewLink}><ChevronRight size={16} /></Link>
            </label>

            <label className={styles.agreeItem}>
              <input
                type="checkbox"
                checked={agreePrivacy}
                onChange={(e) => handleIndividualAgree(setAgreePrivacy, e.target.checked)}
              />
              <span><em className={styles.required}>[필수]</em> 개인정보처리방침 동의</span>
              <Link href="/privacy" target="_blank" className={styles.viewLink}><ChevronRight size={16} /></Link>
            </label>
          </div>

          <Button type="submit" fullWidth disabled={loading || !allChecked}>
            {loading ? '가입 중...' : '회원가입'}
          </Button>

          <p className={styles.footer}>
            이미 계정이 있으신가요?{' '}
            <Link href="/auth/login" className={styles.link}>로그인</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
