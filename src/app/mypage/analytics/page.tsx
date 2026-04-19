import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase-server';
import { createAdminClient } from '@/lib/supabase-admin';
import styles from './analytics.module.css';

interface DailyStat {
  date: string;
  visitors: number;
  pageviews: number;
}

interface TopPage {
  path: string;
  views: number;
}

export default async function AnalyticsPage() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  const user = session?.user ?? null;

  if (!user) redirect('/auth/login');

  const { data: profile } = await supabase
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin') {
    return (
      <div className={styles.page}>
        <h1 className={styles.pageTitle}>접근 불가</h1>
        <p className={styles.accessDenied}>관리자만 접근할 수 있는 페이지입니다.</p>
      </div>
    );
  }

  const admin = createAdminClient();

  // 오늘 날짜 (KST)
  const now = new Date();
  const kstOffset = 9 * 60 * 60 * 1000;
  const kstNow = new Date(now.getTime() + kstOffset);
  const todayStr = kstNow.toISOString().slice(0, 10);

  // 7일 전 날짜
  const sevenDaysAgo = new Date(kstNow);
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
  const sevenDaysAgoStr = sevenDaysAgo.toISOString().slice(0, 10);

  // 오늘 고유 방문자 수
  const { count: todayVisitors } = await admin
    .from('page_visits')
    .select('visitor_token', { count: 'exact', head: true })
    .eq('visit_date', todayStr)
    // distinct는 직접 지원되지 않으므로 RPC 대안 사용
    ;

  // 오늘 고유 방문자 수 (distinct)
  const { data: todayVisitorData } = await admin
    .from('page_visits')
    .select('visitor_token')
    .eq('visit_date', todayStr);

  const uniqueTodayVisitors = new Set(todayVisitorData?.map((r) => r.visitor_token)).size;

  // 오늘 페이지뷰 수
  const { count: todayPageviews } = await admin
    .from('page_visits')
    .select('*', { count: 'exact', head: true })
    .eq('visit_date', todayStr);

  // 최근 7일 데이터
  const { data: weekData } = await admin
    .from('page_visits')
    .select('visitor_token, visit_date')
    .gte('visit_date', sevenDaysAgoStr)
    .lte('visit_date', todayStr);

  const dailyMap = new Map<string, Set<string>>();
  const pvMap = new Map<string, number>();

  // 7일치 날짜 초기화
  for (let i = 0; i < 7; i++) {
    const d = new Date(sevenDaysAgo);
    d.setDate(d.getDate() + i);
    const ds = d.toISOString().slice(0, 10);
    dailyMap.set(ds, new Set());
    pvMap.set(ds, 0);
  }

  weekData?.forEach((row) => {
    const d = row.visit_date;
    dailyMap.get(d)?.add(row.visitor_token);
    pvMap.set(d, (pvMap.get(d) || 0) + 1);
  });

  const dailyStats: DailyStat[] = Array.from(dailyMap.entries()).map(([date, tokens]) => ({
    date,
    visitors: tokens.size,
    pageviews: pvMap.get(date) || 0,
  }));

  // 오늘 인기 페이지 top 10
  const { data: todayPagesRaw } = await admin
    .from('page_visits')
    .select('path')
    .eq('visit_date', todayStr);

  const pathCount = new Map<string, number>();
  todayPagesRaw?.forEach((row) => {
    pathCount.set(row.path, (pathCount.get(row.path) || 0) + 1);
  });

  const topPages: TopPage[] = Array.from(pathCount.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([path, views]) => ({ path, views }));

  return (
    <div className={styles.page}>
      <h1 className={styles.pageTitle}>방문 통계</h1>

      {/* 오늘 요약 카드 */}
      <div className={styles.summaryRow}>
        <div className={styles.summaryCard}>
          <span className={styles.summaryLabel}>오늘 방문자</span>
          <span className={styles.summaryValue}>{uniqueTodayVisitors}</span>
        </div>
        <div className={styles.summaryCard}>
          <span className={styles.summaryLabel}>오늘 페이지뷰</span>
          <span className={styles.summaryValue}>{todayPageviews ?? 0}</span>
        </div>
      </div>

      {/* 최근 7일 표 */}
      <div className={styles.card}>
        <h2 className={styles.cardTitle}>최근 7일 방문 현황</h2>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>날짜</th>
                <th>방문자</th>
                <th>페이지뷰</th>
              </tr>
            </thead>
            <tbody>
              {dailyStats.map((stat) => (
                <tr key={stat.date}>
                  <td>{stat.date}</td>
                  <td>{stat.visitors}</td>
                  <td>{stat.pageviews}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 인기 페이지 */}
      <div className={styles.card}>
        <h2 className={styles.cardTitle}>오늘 인기 페이지 Top 10</h2>
        {topPages.length === 0 ? (
          <p className={styles.empty}>아직 데이터가 없어요</p>
        ) : (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>페이지</th>
                  <th>조회수</th>
                </tr>
              </thead>
              <tbody>
                {topPages.map((p, i) => (
                  <tr key={p.path}>
                    <td>{i + 1}</td>
                    <td className={styles.pathCell}>{p.path}</td>
                    <td>{p.views}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
