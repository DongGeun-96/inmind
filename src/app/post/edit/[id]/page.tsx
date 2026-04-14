'use client';

import { useState, useEffect, useRef, useMemo, useCallback, use } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { ArrowLeft } from 'lucide-react';
import { createClient } from '@/lib/supabase-client';
import { BOARD_CONFIG, type BoardType } from '@/types/database';
import { Input } from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import styles from './edit.module.css';
import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false }) as any;

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

export default function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const supabase = createClient();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [boardType, setBoardType] = useState<BoardType>('emotion');
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const quillInstanceRef = useRef<any>(null);
  const quillCallbackRef = useCallback((el: any) => {
    if (el) quillInstanceRef.current = el;
  }, []);

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push('/auth/login'); return; }

      setUserId(user.id);

      const { data: post } = await supabase.from('posts').select('*').eq('id', id).single();
      if (!post || post.user_id !== user.id) { router.push('/'); return; }

      setTitle(post.title);
      setContent(post.content);
      setBoardType(post.board_type as BoardType);
      setInitialLoading(false);
    };
    load();
  }, [id]);

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
        const fileExt = file.name.split('.').pop();
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
    if (!title.trim() || !plainText) return;
    setLoading(true);

    const { error } = await supabase
      .from('posts')
      .update({ title: title.trim(), content: content, updated_at: new Date().toISOString() })
      .eq('id', id);

    if (error) { alert('수정에 실패했어요.'); setLoading(false); return; }
    router.push(`/post/${id}`);
  };

  if (initialLoading) {
    return <div className={styles.loading}>불러오는 중...</div>;
  }

  const config = BOARD_CONFIG[boardType];
  const plainText = content.replace(/<[^>]*>/g, '').trim();

  return (
    <div className={styles.page}>
      <button onClick={() => router.back()} className={styles.backBtn}>
        <ArrowLeft size={16} /> 뒤로가기
      </button>

      <h1 className={styles.title}>글 수정하기</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <label className={styles.fieldLabel}>게시판</label>
          <p className={styles.boardLabel}>{config.label}</p>
        </div>

        <Input
          label="제목"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          maxLength={100}
        />

        <div className={styles.editorGroup}>
          <label className={styles.fieldLabel}>내용</label>
          <ReactQuill
            ref={quillCallbackRef}
            theme="snow"
            value={content}
            onChange={setContent}
            modules={modules}
            className={styles.editor}
          />
        </div>

        <div className={styles.actions}>
          <Button type="button" variant="secondary" onClick={() => router.back()}>
            취소
          </Button>
          <Button type="submit" disabled={loading || !title.trim() || !plainText}>
            {loading ? '수정 중...' : '수정하기'}
          </Button>
        </div>
      </form>
    </div>
  );
}
