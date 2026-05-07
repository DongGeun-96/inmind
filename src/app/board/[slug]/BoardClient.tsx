'use client';

/* 외부 큐레이션 사진은 Next Image 도메인 설정 없이 안전하게 일반 img로 렌더링합니다. */
/* eslint-disable @next/next/no-img-element */

import { useState } from 'react';
import Link from 'next/link';
import { PenLine, UserPlus, ChevronDown, ExternalLink } from 'lucide-react';
import Button from '@/components/ui/Button';
import Pagination from '@/components/ui/Pagination';
import PostItem from '@/components/PostItem';
import Sidebar from '@/components/Sidebar';
import { BOARD_CONFIG, CATEGORIES, type BoardType, type Post } from '@/types/database';
import type { BoardMeta } from '@/data/board-meta';
import type { CuratedHub, CuratedResource } from '@/data/curated-hubs';
import styles from './board.module.css';

interface Props {
  boardType: BoardType;
  config: { label: string; category: string; description: string; adminOnly?: boolean };
  meta: BoardMeta | null;
  hub: CuratedHub | null;
  notices: Post[];
  posts: Post[];
  currentPage: number;
  totalPages: number;
  isLoggedIn: boolean;
  isAdmin?: boolean;
  isAllView?: boolean;
}

function isExternalUrl(url: string) {
  return url.startsWith('http://') || url.startsWith('https://');
}

function resourceTypeLabel(type: CuratedResource['type']) {
  switch (type) {
    case 'official':
      return '공식자료';
    case 'news':
      return '뉴스';
    case 'youtube':
      return '유튜브';
    default:
      return '가이드';
  }
}

function resourceImage(resource: CuratedResource) {
  if (resource.imageUrl) return resource.imageUrl;

  const photo = (name: string) => `/curated-thumbnails/${name}.jpg`;

  if (resource.tags.includes('수면')) return photo('sleep');
  if (resource.tags.includes('카페인')) return photo('coffee');
  if (resource.tags.includes('장건강') || resource.tags.includes('식습관') || resource.tags.includes('영양')) {
    return photo('food');
  }
  if (resource.tags.includes('책추천') || resource.tags.includes('독서') || resource.tags.includes('에세이')) {
    return photo('books');
  }
  if (resource.tags.includes('영화') || resource.tags.includes('드라마')) return photo('movie');
  if (resource.tags.includes('산책') || resource.tags.includes('숲') || resource.tags.includes('여행')) return photo('place');
  if (resource.tags.includes('문구') || resource.tags.includes('낭독')) return photo('quote');
  if (resource.tags.includes('음악')) return photo('selfcare');

  switch (resource.type) {
    case 'official':
      return photo('selfcare');
    case 'news':
      return photo('food');
    case 'youtube':
      return photo('movie');
    default:
      return photo('selfcare');
  }
}

function ResourceCard({ resource, featured = false }: { resource: CuratedResource; featured?: boolean }) {
  const content = (
    <>
      {!resource.hideImage && (
        <div className={styles.resourceVisual} aria-hidden="true">
          <img src={resourceImage(resource)} alt="" loading="lazy" />
        </div>
      )}
      <div className={styles.resourceTopline}>
        <span className={`${styles.resourceBadge} ${styles[`resourceBadge_${resource.type}`]}`}>
          {resourceTypeLabel(resource.type)}
        </span>
        <span className={styles.resourceSource}>{resource.source}</span>
      </div>
      <h3 className={featured ? styles.highlightTitle : styles.resourceTitle}>{resource.title}</h3>
      <p className={styles.resourceSummary}>{resource.summary}</p>
      <div className={styles.resourceTags}>
        {resource.tags.map((tag) => (
          <span key={tag}>#{tag}</span>
        ))}
      </div>
      {isExternalUrl(resource.url) && (
        <span className={styles.externalHint}>
          원문/검색 보기 <ExternalLink size={13} />
        </span>
      )}
    </>
  );

  if (isExternalUrl(resource.url)) {
    return (
      <a href={resource.url} target="_blank" rel="noopener noreferrer" className={featured ? styles.highlightCard : styles.resourceCard}>
        {content}
      </a>
    );
  }

  if (resource.type === 'guide') {
    return <article className={featured ? styles.highlightCard : styles.resourceCard}>{content}</article>;
  }

  return (
    <Link href={resource.url} className={featured ? styles.highlightCard : styles.resourceCard}>
      {content}
    </Link>
  );
}

export default function BoardClient({ boardType, config, meta, hub, notices, posts, currentPage, totalPages, isLoggedIn, isAdmin = false, isAllView = false }: Props) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  // 현재 게시판이 속한 카테고리의 게시판들 찾기
  const category = CATEGORIES.find((cat) => cat.boards.includes(boardType));
  const siblingBoards = category?.boards || [boardType];

  return (
    <div className={styles.layout}>
      <div className={styles.main}>
        <div className={styles.header}>
          <h1 className={hub ? styles.srOnly : styles.title}>{hub ? hub.title : category?.name || config.label}</h1>
          {boardType === 'professional' && (
            <Link href="/expert-inquiry">
              <Button size="sm" variant="secondary">
                <UserPlus size={14} /> 전문가 등록 문의
              </Button>
            </Link>
          )}
        </div>

        {siblingBoards.length > 1 && !hub && (
          <div className={styles.tabs}>
            <Link
              href={`/board/${siblingBoards[0]}?view=all`}
              className={`${styles.tab} ${isAllView ? styles.tabActive : ''}`}
            >
              전체
            </Link>
            {siblingBoards.map((board) => (
              <Link
                key={board}
                href={`/board/${board}`}
                className={`${styles.tab} ${!isAllView && board === boardType ? styles.tabActive : ''}`}
              >
                {BOARD_CONFIG[board].label}
              </Link>
            ))}
          </div>
        )}

        {hub && currentPage === 1 && (
          <>
            <section className={styles.hubHero} aria-labelledby="curated-hub-title">
              <div className={styles.hubEyebrow}>{hub.eyebrow}</div>
              <h2 id="curated-hub-title" className={styles.hubTitle}>{hub.title}</h2>
              <p className={styles.hubDescription}>{hub.description}</p>
              <div className={styles.hubFilters} aria-label="콘텐츠 필터">
                {hub.filters.map((filter) => (
                  <span key={filter} className={styles.hubFilter}>{filter}</span>
                ))}
              </div>
            </section>

            <section className={styles.hubSection} aria-labelledby="hub-highlights-heading">
              <div className={styles.sectionHeader}>
                <span className={styles.sectionEyebrow}>추천 큐레이션</span>
                <h2 id="hub-highlights-heading" className={styles.sectionTitle}>먼저 보면 좋은 자료</h2>
              </div>
              <div className={styles.highlightGrid}>
                {hub.highlights.map((resource) => (
                  <ResourceCard key={`${resource.type}-${resource.title}`} resource={resource} featured />
                ))}
              </div>
            </section>

            <section className={styles.hubSection} aria-labelledby="hub-resources-heading">
              <div className={styles.sectionHeader}>
                <span className={styles.sectionEyebrow}>실시간 큐레이션</span>
                <h2 id="hub-resources-heading" className={styles.sectionTitle}>추려온 뉴스·영상·공식 자료</h2>
                <p className={styles.sectionDescription}>관련 자료를 서버에서 가져와 제목·출처·요약 중심으로 보여주고, 원문은 출처로 연결합니다.</p>
              </div>
              <div className={styles.resourceGrid}>
                {hub.resources.map((resource) => (
                  <ResourceCard key={`${resource.type}-${resource.title}`} resource={resource} />
                ))}
              </div>
            </section>

            <section className={styles.guideBox} aria-labelledby="hub-guide-heading">
              <div>
                <span className={styles.sectionEyebrow}>인마인드 요약</span>
                <h2 id="hub-guide-heading" className={styles.sectionTitle}>{hub.guideTitle}</h2>
              </div>
              <div className={styles.guideText}>
                {hub.guideParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <div className={styles.quickTips}>
                {hub.quickTips.map((tip) => (
                  <span key={tip}>{tip}</span>
                ))}
              </div>
              <p className={styles.disclaimer}>{hub.disclaimer}</p>
            </section>

            <section className={styles.relatedHubBox} aria-labelledby="related-hubs-heading">
              <div>
                <span className={styles.sectionEyebrow}>연결해서 보기</span>
                <h2 id="related-hubs-heading" className={styles.sectionTitle}>관련 허브와 키워드</h2>
              </div>
              <div className={styles.relatedHubLinks}>
                {hub.relatedBoards.map((relatedBoard) => (
                  <Link key={relatedBoard} href={`/board/${relatedBoard}`} className={styles.relatedHubLink}>
                    {BOARD_CONFIG[relatedBoard].label}
                  </Link>
                ))}
              </div>
              <div className={styles.keywordList}>
                {hub.keywords.map((keyword) => (
                  <span key={keyword}>#{keyword}</span>
                ))}
              </div>
            </section>

            <div className={styles.communityHeader}>
              <span className={styles.sectionEyebrow}>커뮤니티</span>
              <h2 className={styles.sectionTitle}>인마인드에서 나눈 {config.label} 이야기</h2>
            </div>
          </>
        )}

        {!isAllView && !hub && meta && currentPage === 1 && (
          <p className={styles.intro}>{meta.intro}</p>
        )}

        {notices.length > 0 && (
          <ul className={styles.noticeList}>
            {notices.map((post) => (
              <li key={post.id} className={styles.noticeItem}>
                <PostItem post={post} />
              </li>
            ))}
          </ul>
        )}

        {posts.length === 0 && notices.length === 0 ? (
          <div className={styles.empty}>
            <p>아직 게시글이 없어요</p>
          </div>
        ) : (
          <ul>
            {posts.map((post) => (
              <li key={post.id} className={styles.listItem}>
                <PostItem post={post} showBoard={isAllView} showPreview />
              </li>
            ))}
          </ul>
        )}

        {(!config.adminOnly || isAdmin) && (
          <div className={styles.writeBtn}>
            {isLoggedIn ? (
              <Link href={`/board/write?type=${boardType}`}>
                <Button size="sm">
                  <PenLine size={14} /> 글쓰기
                </Button>
              </Link>
            ) : (
              <Link href="/auth/login">
                <Button size="sm" variant="secondary">
                  <PenLine size={14} /> 글쓰기
                </Button>
              </Link>
            )}
          </div>
        )}

        <Pagination currentPage={currentPage} totalPages={totalPages} baseUrl={`/board/${boardType}`} />

        {!isAllView && !hub && meta && currentPage === 1 && (
          <>
            {meta.faqs.length > 0 && (
              <section className={styles.faqSection} aria-labelledby="board-faq-heading">
                <h2 id="board-faq-heading" className={styles.faqHeading}>
                  자주 묻는 질문
                </h2>
                <div className={styles.faqList}>
                  {meta.faqs.map((faq, idx) => {
                    const isOpen = openFaq === idx;
                    return (
                      <div key={idx} className={styles.faqItem}>
                        <button
                          type="button"
                          className={styles.faqQuestion}
                          aria-expanded={isOpen}
                          onClick={() => setOpenFaq(isOpen ? null : idx)}
                        >
                          <span>Q. {faq.q}</span>
                          <ChevronDown
                            size={16}
                            style={{ transform: isOpen ? 'rotate(180deg)' : undefined, transition: 'transform 0.15s' }}
                          />
                        </button>
                        {isOpen && <div className={styles.faqAnswer}>{faq.a}</div>}
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {meta.related.length > 0 && (
              <section className={styles.relatedSection} aria-labelledby="board-related-heading">
                <h2 id="board-related-heading" className={styles.relatedHeading}>
                  함께 보면 좋은 콘텐츠
                </h2>
                <div className={styles.relatedList}>
                  {meta.related.map((link) => (
                    <Link key={link.href} href={link.href} className={styles.relatedLink}>
                      {link.label}
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>

      <Sidebar />
    </div>
  );
}
