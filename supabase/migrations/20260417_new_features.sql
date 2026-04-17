-- =============================================================
-- 인마인드 신규 기능 마이그레이션
-- 적용 방법: Supabase SQL Editor에서 이 파일 내용을 복사·붙여넣기 후 실행
-- =============================================================

-- 1. mood_entries (매일 감정 체크)
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS mood_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  mood text NOT NULL CHECK (mood IN ('happy', 'okay', 'tired', 'sad', 'angry')),
  note text,
  entry_date date NOT NULL DEFAULT (current_date AT TIME ZONE 'Asia/Seoul'),
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT mood_entries_one_per_day UNIQUE (user_id, entry_date)
);

ALTER TABLE mood_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "mood_entries_select_own" ON mood_entries
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "mood_entries_insert_own" ON mood_entries
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "mood_entries_update_own" ON mood_entries
  FOR UPDATE USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "mood_entries_delete_own" ON mood_entries
  FOR DELETE USING (auth.uid() = user_id);

-- 2. daily_quotes (오늘의 한 마디)
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS daily_quotes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  text text NOT NULL,
  author text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE daily_quotes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "daily_quotes_read_all" ON daily_quotes
  FOR SELECT USING (true);

-- Seed 30 healing quotes
INSERT INTO daily_quotes (text, author) VALUES
  ('천천히 가도 괜찮아요.', NULL),
  ('오늘도 숨 쉬어낸 것만으로 충분해요.', NULL),
  ('비 오는 날엔 비 오는 대로 예쁜 풍경이 있어요.', NULL),
  ('완벽하지 않아도, 당신은 충분해요.', NULL),
  ('나를 위해 한 숨 돌리는 시간도 필요해요.', NULL),
  ('지금 이 순간도 지나갈 거예요. 괜찮아질 거예요.', NULL),
  ('당신의 속도로 괜찮아요. 누구와도 비교하지 마세요.', NULL),
  ('작은 것에 감사하면, 큰 행복이 찾아와요.', NULL),
  ('울고 싶을 땐 울어도 돼요. 그것도 용기예요.', NULL),
  ('오늘 하루도 수고했어요. 정말 잘하고 있어요.', NULL),
  ('힘든 시간은 더 강한 나를 만들어줘요.', NULL),
  ('세상에서 가장 소중한 사람은 바로 나 자신이에요.', NULL),
  ('쉬어가는 것도 앞으로 나아가는 거예요.', NULL),
  ('어두운 밤이 지나면 반드시 밝은 아침이 와요.', NULL),
  ('당신은 사랑받을 자격이 있는 사람이에요.', NULL),
  ('모든 감정에는 이유가 있어요. 자신을 탓하지 마세요.', NULL),
  ('작은 한 걸음이 큰 변화의 시작이에요.', NULL),
  ('지금 느끼는 감정은 영원하지 않아요.', NULL),
  ('나에게 다정한 말 한마디를 건네주세요.', NULL),
  ('꽃이 피기 위해선 시간이 필요하듯, 마음도 그래요.', NULL),
  ('당신이 존재하는 것만으로 누군가에게 힘이 돼요.', NULL),
  ('오늘 못 했어도 내일 다시 하면 돼요.', NULL),
  ('행복은 멀리 있지 않아요. 작은 일상 속에 있어요.', '법정 스님'),
  ('가장 어두운 시간은 새벽 직전이에요.', NULL),
  ('자신을 믿어주세요. 당신은 생각보다 강해요.', NULL),
  ('상처받은 마음에도 봄은 찾아와요.', NULL),
  ('괜찮지 않아도 괜찮아요.', NULL),
  ('매일 조금씩 나아지고 있어요. 느끼지 못할 뿐이에요.', NULL),
  ('나를 위한 시간을 내는 건 이기적인 게 아니에요.', NULL),
  ('당신의 이야기는 아직 끝나지 않았어요.', NULL);

-- 3. diary_entries (감정 일기 템플릿)
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS diary_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  emotion text NOT NULL,
  reason text,
  message_to_self text,
  entry_date date NOT NULL DEFAULT (current_date AT TIME ZONE 'Asia/Seoul'),
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT diary_entries_one_per_day UNIQUE (user_id, entry_date)
);

ALTER TABLE diary_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "diary_entries_select_own" ON diary_entries
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "diary_entries_insert_own" ON diary_entries
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "diary_entries_update_own" ON diary_entries
  FOR UPDATE USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "diary_entries_delete_own" ON diary_entries
  FOR DELETE USING (auth.uid() = user_id);
