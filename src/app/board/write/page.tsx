'use client';

import { useState, useEffect, useRef, useMemo, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { ArrowLeft, EyeOff, Eye, Smile } from 'lucide-react';
import EmojiPicker from 'emoji-picker-react';
import { createClient } from '@/lib/supabase-client';
import { BOARD_CONFIG, CATEGORIES, type BoardType } from '@/types/database';
import { Input } from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Checkbox from '@/components/ui/Checkbox';
import styles from './write.module.css';
import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false }) as any;

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

export default function WritePage() {
  return (
    <Suspense>
      <WriteForm />
    </Suspense>
  );
}

function WriteForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialType = (searchParams.get('type') || 'emotion') as BoardType;
  const [boardType, setBoardType] = useState<BoardType>(initialType);
  const config = BOARD_CONFIG[boardType];
  const currentCategory = CATEGORIES.find((cat) => cat.boards.includes(boardType));
  const siblingBoards = currentCategory?.boards || [boardType];

  const supabase = createClient();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const quillInstanceRef = useRef<any>(null);
  const quillCallbackRef = useCallback((el: any) => {
    if (el) quillInstanceRef.current = el;
  }, []);

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) {
        router.push('/auth/login');
        return;
      }
      setUserId(data.user.id);
      const { data: userData } = await supabase
        .from('users')
        .select('role')
        .eq('id', data.user.id)
        .single();
      if (userData?.role === 'admin') setIsAdmin(true);
      if (BOARD_CONFIG[initialType]?.adminOnly && userData?.role !== 'admin') {
        alert('관리자만 작성할 수 있는 게시판이에요.');
        router.push(`/board/${initialType}`);
      }
    });
  }, []);

  // 에디터에 이미지 핸들러 등록
  useEffect(() => {
    if (!quillInstanceRef.current || !userId) return;
    const toolbar = quillInstanceRef.current.getEditor().getModule('toolbar');
    toolbar.addHandler('image', () => {
      const input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.setAttribute('accept', 'image/jpeg,image/png,image/gif,image/webp');
      input.click();
      input.onchange = async () => {
        const file = input.files?.[0];
        if (!file) return;
        if (!ALLOWED_TYPES.includes(file.type)) { alert('JPG, PNG, GIF, WEBP 파일만 업로드할 수 있어요.'); return; }
        if (file.size > MAX_FILE_SIZE) { alert('파일 크기는 5MB 이하만 가능해요.'); return; }
        const fileExt = file.name.split('.').pop()?.toLowerCase();
        if (!fileExt || !['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(fileExt)) { alert('허용되지 않는 파일 형식이에요.'); return; }
        const fileName = `${userId}/${Date.now()}.${fileExt}`;
        const { error } = await supabase.storage.from('post-images').upload(fileName, file);
        if (error) { alert('이미지 업로드에 실패했어요.'); return; }
        const { data: urlData } = supabase.storage.from('post-images').getPublicUrl(fileName);
        const editor = quillInstanceRef.current.getEditor();
        const range = editor.getSelection(true);
        editor.insertEmbed(range.index, 'image', urlData.publicUrl);
        editor.setSelection(range.index + 1);
      };
    });
  }, [userId]);

  const onEmojiClick = (emojiData: any) => {
    const editor = quillInstanceRef.current?.getEditor();
    if (editor) {
      const range = editor.getSelection(true);
      editor.insertText(range.index, emojiData.emoji);
      editor.setSelection(range.index + emojiData.emoji.length);
    }
    setShowEmoji(false);
  };

  const modules = useMemo(() => ({
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ color: [] }, { background: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ align: [] }],
      ['link', 'image'],
      ['clean'],
    ],
  }), []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const plainText = content.replace(/<[^>]*>/g, '').trim();
    if (!userId || !title.trim() || !plainText) return;
    setLoading(true);

    const { data: userData } = await supabase
      .from('users')
      .select('is_banned, role')
      .eq('id', userId)
      .single();

    if (userData?.is_banned) {
      await supabase.auth.signOut();
      window.location.href = '/banned';
      return;
    }

    if (BOARD_CONFIG[boardType]?.adminOnly && userData?.role !== 'admin') {
      alert('관리자만 작성할 수 있는 게시판이에요.');
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from('posts')
      .insert({
        user_id: userId,
        board_type: boardType,
        title: title.trim(),
        content: content,
        is_anonymous: isAnonymous,
        is_public: !isAnonymous,
        view_count: 0,
      })
      .select('id')
      .single();

    if (error) {
      alert('게시글 작성에 실패했어요. 다시 시도해주세요.');
      setLoading(false);
      return;
    }

    router.push(`/post/${data.id}`);
  };

  if (!config) {
    router.push('/');
    return null;
  }

  const plainText = content.replace(/<[^>]*>/g, '').trim();

  return (
    <div className={styles.page}>
      <button onClick={() => router.back()} className={styles.backBtn}>
        <ArrowLeft size={16} /> 뒤로가기
      </button>

      <h1 className={styles.title}>글쓰기</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.selectGroup}>
          <span className={styles.categoryName}>{currentCategory?.name || config.label}</span>
          <label className={styles.selectLabel}>게시판 선택</label>
          {siblingBoards.length > 1 ? (
            <select
              value={boardType}
              onChange={(e) => setBoardType(e.target.value as BoardType)}
              className={styles.select}
            >
              {siblingBoards.map((board) => (
                <option key={board} value={board}>
                  {BOARD_CONFIG[board].label}
                </option>
              ))}
            </select>
          ) : (
            <span className={styles.boardName}>{config.label}</span>
          )}
        </div>

        <Input
          label="제목"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력해주세요"
          required
          maxLength={100}
        />

        <div className={styles.editorGroup}>
          <label className={styles.selectLabel}>내용</label>
          <ReactQuill
            ref={quillCallbackRef}
            theme="snow"
            value={content}
            onChange={setContent}
            modules={modules}
            placeholder="마음을 편하게 적어주세요..."
            className={styles.editor}
          />
          <div className={styles.emojiWrapper}>
            <button type="button" onClick={() => setShowEmoji(!showEmoji)} className={styles.emojiBtn}>
              <Smile size={18} /> 이모티콘
            </button>
            {showEmoji && (
              <div className={styles.emojiPicker}>
                <EmojiPicker onEmojiClick={onEmojiClick} width="100%" height={350} searchPlaceHolder="이모티콘 검색..." />
              </div>
            )}
          </div>
        </div>

        <div className={styles.options}>
          <Checkbox
            checked={isAnonymous}
            onChange={(e) => setIsAnonymous(e.target.checked)}
          >
            {isAnonymous ? <EyeOff size={14} /> : <Eye size={14} />}
            익명으로 작성
          </Checkbox>
        </div>

        <div className={styles.actions}>
          <Button type="button" variant="secondary" onClick={() => router.back()}>
            취소
          </Button>
          <Button type="submit" disabled={loading || !title.trim() || !plainText}>
            {loading ? '작성 중...' : '작성하기'}
          </Button>
        </div>
      </form>
    </div>
  );
}
