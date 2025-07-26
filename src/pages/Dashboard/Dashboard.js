import './Dashboard.css';
import 'vanilla-calendar-pro/styles/index.css';
import './calendar-override.css';

import { fetchDashboardData } from '../../api/dashboardData';
import { Calendar } from 'vanilla-calendar-pro';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { Title } from '../../components/Title/Title';
import { BookStack } from '../../components/BookStack/BookStack';

document.addEventListener('DOMContentLoaded', initDashboard);

const today = new Date();
const [currentYear, currentMonth, currentDay] = [
  today.getFullYear(),
  today.getMonth() + 1,
  today.getDate(),
];

// 더미 데이터
const dumyReviews = [
  { title: '제목', oneLineDescription: '소제목', date: '2025-07-22' },
  { title: '제목', oneLineDescription: '소제목', date: '2025-07-22' },
  { title: '제목', oneLineDescription: '소제목', date: '2025-07-22' },
  { title: '제목', oneLineDescription: '소제목', date: '2025-07-22' },
  { title: '제목', oneLineDescription: '소제목', date: '2025-07-22' },
  { title: '제목', oneLineDescription: '소제목', date: '2025-07-22' },
  { title: '제목', oneLineDescription: '소제목', date: '2025-07-22' },
  { title: '제목', oneLineDescription: '소제목', date: '2025-07-22' },
];

const dashboard = document.querySelector('#dashboard');
const header = document.querySelector('.dashboard-header');
const bookstackWrapper = document.querySelector('.dashboard-bookstack');

/** 대시보드 페이지 초기화 */
function initDashboard() {
  const { monthBookmarkCount, yearBookmarkCount, monthReviews } = loadDashboardData();

  dashboard.prepend(Sidebar({}));
  header.prepend(
    Title({
      text: `
    ${currentYear}년 ${currentMonth}월<span class="desktop-only">엔 <span aria-hidden="true">|</span> 책갈피 ${monthBookmarkCount || '?'}개를 남겼어요!</span>
  `,
    })
  );

  const currentMonthReviews = dumyReviews.filter((review) => {
    // 서버 date 타입 확인하고 문자열 아니면 수정 필요
    const [reviewYear, reviewMonth, reviewDay] = review.date.split('-');
    return reviewYear == currentYear && reviewMonth == currentMonth;
  });
  const dayReviews = dumyReviews.filter((review) => {
    const [reviewYear, reviewMonth, reviewDay] = review.date.split('-');
    return reviewDay == currentDay;
  });

  // 더미데이터 렌더링
  renderReviews(currentMonthReviews);
  // renderReviews(monthReviews);
  renderCalendar(dayReviews);
  renderStats(currentMonthReviews, yearBookmarkCount);
}

/** 대시보드 데이터 연동
 * body : {
 *   "monthBookmarkCount": number,
 *   "yearBookmarkCount": number,
 *   "monthReviews": {
 *     "title": string,
 *     "oneLineDescription": string
 *     "date": date
 *   }[]
 * }
 */
async function loadDashboardData() {
  try {
    const data = await fetchDashboardData();
    const { monthBookmarkCount, yearBookmarkCount, monthReviews } = data;

    return { monthBookmarkCount, yearBookmarkCount, monthReviews };
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

/** 책 리뷰 데이터 바인딩 */
function renderReviews(reviews) {
  const noReviewsMessage = document.querySelector('.no-reviews');

  bookstackWrapper.append(BookStack({ reviews }));
  if (reviews.length === 0) noReviewsMessage.classList.add('show');
}

/** 달력 데이터 바인딩 */
function renderCalendar() {
  const calendar = new Calendar('#calendar');
  calendar.init();
}

/** 통계 데이터 바인딩 */
function renderStats(reviews, count) {
  const firstReviewTitle = document.querySelector('.first-review-title');
  const yearReviewCount = document.querySelector('.year-reviews-count');

  firstReviewTitle.textContent = reviews[0].title || '-';
  yearReviewCount.textContent = count || 0;
}
