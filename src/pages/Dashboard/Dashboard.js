import './Dashboard.css';
import 'vanilla-calendar-pro/styles/index.css';
import './calendar-override.css';

import { fetchDashboardData } from '../../api/dashboardData';
import { Calendar } from 'vanilla-calendar-pro';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { Title } from '../../components/Title/Title';
import { BookStack } from '../../components/BookStack/BookStack';

document.addEventListener('DOMContentLoaded', initDashboard);

// 더미 데이터
const dummyReviews = [
  { title: '제목', oneLineDescription: '소제목', date: '2025-07-22' },
  { title: '제목', oneLineDescription: '소제목', date: '2025-07-22' },
  { title: '제목', oneLineDescription: '소제목', date: '2025-07-22' },
  { title: '제목', oneLineDescription: '소제목', date: '2025-07-22' },
  { title: '제목', oneLineDescription: '소제목', date: '2025-07-22' },
  { title: '제목', oneLineDescription: '소제목', date: '2025-07-12' },
  { title: '제목', oneLineDescription: '소제목', date: '2025-07-09' },
  { title: '제목', oneLineDescription: '소제목', date: '2025-07-22' },
  { title: '제목', oneLineDescription: '소제목', date: '2025-05-21' },
  { title: '제목', oneLineDescription: '소제목', date: '2025-05-20' },
  { title: '제목', oneLineDescription: '소제목', date: '2025-06-18' },
];

const dashboard = document.querySelector('#dashboard');
const bookstackWrapper = document.querySelector('.dashboard-bookstack');

/** 대시보드 페이지 초기화 */
function initDashboard() {
  const { monthBookmarkCount, yearBookmarkCount, totalReviews } = loadDashboardData();
  const today = new Date();
  const [currentYear, currentMonth] = [today.getFullYear(), today.getMonth() + 1];
  const header = document.querySelector('.dashboard-header');

  const currentMonthReviews = dummyReviews.filter((review) => {
    const [reviewYear, reviewMonth] = review.date.split('-');
    return reviewYear == currentYear && reviewMonth == currentMonth;
  });

  dashboard.prepend(Sidebar({}));
  header.prepend(
    Title({
      text: `
    ${currentYear}년 ${currentMonth}월<span class="desktop-only">엔 <span aria-hidden="true">|</span> 책갈피 ${monthBookmarkCount || '?'}개를 남겼어요!</span>
  `,
    })
  );

  // 더미데이터 렌더링
  renderReviews(currentMonthReviews);
  // renderReviews(totalReveiws);
  renderCalendar(dummyReviews);
  renderStats(currentMonthReviews, yearBookmarkCount);
}

/** 대시보드 데이터 연동
 * body{
 *   "monthBookmarkCount": number,
 *   "yearBookmarkCount": number,
 *   "totalReviews": {
 *     "title": string,
 *     "oneLineDescription": string,
 *     "date": string(YYYY-MM-DD)
 *   }[]
 * }
 */
async function loadDashboardData() {
  try {
    return await fetchDashboardData();
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

/** 책 리뷰 데이터 바인딩 */
function renderReviews(reviews) {
  const noReviewsMessage = document.createElement('div');

  noReviewsMessage.className = 'no-reviews';
  noReviewsMessage.setAttribute('role', 'status');
  noReviewsMessage.setAttribute('aria-live', 'polite');

  bookstackWrapper.innerHTML = '';
  bookstackWrapper.append(BookStack({ reviews }));
  if (reviews.length === 0) {
    noReviewsMessage.innerHTML = `
      <p>남긴 책갈피가 없어요!<br />글쓰기 버튼을 눌러 기록을 남겨보세요😊</p>
    `;
    bookstackWrapper.append(noReviewsMessage);
  }
}

/** 달력 데이터 바인딩 */
function renderCalendar(reviews) {
  const options = {
    locale: 'kr-KR',
  };
  const calendar = new Calendar('#calendar', options);
  calendar.init();

  const calendarEl = document.querySelector('#calendar');
  const calendarHeader = document.querySelector('.vc-header');
  const headerBtns = calendarHeader.querySelectorAll('.vc-header__content > button');
  const calendarObserver = new MutationObserver(() => highlightDates(reviews, calendarEl));

  // 라이브러리 기본 제공 년/월 선택 동작 비활성화
  headerBtns.forEach((btn) => btn.setAttribute('disabled', 'true'));

  // 페이지 로드/캘린더 DOM 바뀔때 highlight 클래스 추가
  highlightDates(reviews, calendarEl);
  calendarObserver.observe(calendarEl, { childList: true, subtree: true });

  // 날짜 클릭 이벤트
  calendarEl.addEventListener('click', (e) => {
    const targetEl = e.target.closest('.vc-date__btn');
    if (!targetEl) return;
    renderReviewsByDate(reviews);
  });

  // 모바일 날짜 이벤트
  const mobileDateInput = document.querySelector('#dateInput');
  mobileDateInput.addEventListener('change', (e) => {
    const selectedDate = e.target.value;
    const filteredReviews = reviews.filter((review) => review.date === selectedDate);
    renderReviews(filteredReviews);
  });
}

/** 리뷰 데이터가 있는 날짜에 하이라이트
 * - 추후 삭제기능 추가된다면 클래스 remove 로직 구현 필요
 */
function highlightDates(reviews, calendarEl) {
  const calendarHeader = document.querySelector('.vc-header');
  const headerBtns = calendarHeader.querySelectorAll('.vc-header__content > button');
  headerBtns.forEach((btn) => btn.setAttribute('disabled', 'true'));

  reviews
    .map((review) => review.date)
    .forEach((date) => {
      const activeDates = calendarEl.querySelectorAll(`.vc-date[data-vc-date="${date}"]`);
      activeDates.forEach((el) => {
        if (!el.classList.contains('highlight')) {
          el.classList.add('highlight');
          el.setAttribute('aria-label', '책갈피 기록 있음');
        }
      });
    });
}

/** 클릭한 날짜 리뷰 렌더링
 * - 시간 남으면 다중선택 구현까지
 */
function renderReviewsByDate(reviews) {
  const selectedEl = document.querySelector('[data-vc-date-selected]');
  if (!selectedEl) {
    renderReviews(reviews);
    return;
  }

  // data-vc-date="YYYY-MM-DD"
  const selectedDate = selectedEl.dataset.vcDate;
  const filteredReviews = reviews.filter((review) => review.date === selectedDate);

  renderReviews(filteredReviews);
}

/** 통계 데이터 바인딩 */
function renderStats(reviews, count) {
  const firstReviewTitle = document.querySelector('.first-review-title');
  const yearReviewCount = document.querySelector('.year-reviews-count');

  firstReviewTitle.textContent = reviews[0].title || '-';
  yearReviewCount.textContent = count || 0;
}
