const ERROR_MAP: Record<string, string> = {
  // Auth (message)
  'Invalid login credentials': '아이디 또는 비밀번호가 올바르지 않아요.',
  'Email not confirmed': '이메일 인증이 완료되지 않았어요. 메일함을 확인해주세요.',
  // Auth (code)
  'email_not_confirmed': '이메일 인증이 완료되지 않았어요. 메일함을 확인해주세요.',
  'User already registered': '이미 가입된 이메일이에요.',
  'Signup requires a valid password': '올바른 비밀번호를 입력해주세요.',
  'Password should be at least 6 characters': '비밀번호는 8자 이상이어야 해요.',
  'Password should be at least 8 characters': '비밀번호는 8자 이상이어야 해요.',
  'Unable to validate email address: invalid format': '올바른 이메일 주소를 입력해주세요.',
  'A user with this email address has already been registered': '이미 가입된 이메일이에요.',
  'Email rate limit exceeded': '너무 많은 요청이 발생했어요. 잠시 후 다시 시도해주세요.',
  'For security purposes, you can only request this after': '보안을 위해 잠시 후 다시 시도해주세요.',
  'New password should be different from the old password': '새 비밀번호는 기존 비밀번호와 달라야 해요.',
  'Auth session missing!': '로그인이 필요해요.',
  'Token has expired or is invalid': '인증이 만료되었어요. 다시 로그인해주세요.',
  'Database error saving new user': '회원가입 처리 중 오류가 발생했어요. 잠시 후 다시 시도해주세요.',
  'Database error creating new user': '회원가입 처리 중 오류가 발생했어요. 잠시 후 다시 시도해주세요.',
};

export function toKoreanError(message: string): string {
  // 정확히 일치하는 경우
  if (ERROR_MAP[message]) return ERROR_MAP[message];

  // 부분 일치하는 경우
  for (const [key, value] of Object.entries(ERROR_MAP)) {
    if (message.includes(key)) return value;
  }

  // email invalid 패턴
  if (message.includes('invalid') && message.toLowerCase().includes('email')) {
    return '올바른 이메일 주소를 입력해주세요.';
  }

  // rate limit 패턴
  if (message.includes('rate limit') || message.includes('too many')) {
    return '너무 많은 요청이 발생했어요. 잠시 후 다시 시도해주세요.';
  }

  // 그 외
  return '오류가 발생했어요. 잠시 후 다시 시도해주세요.';
}
