import './Dashboard.css';
import 'vanilla-calendar-pro/styles/index.css';
import './calendar-override.css';

import { getAuthToken, redirectIfNotLoggedIn } from '../../utils/auth';
import { fetchDashboardData } from '../../api/dashboardData';
import { Calendar } from 'vanilla-calendar-pro';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { Title } from '../../components/Title/Title';
import { BookStack } from '../../components/BookStack/BookStack';
import { reviewDetailModal } from '../../utils/reviewModal';

document.addEventListener('DOMContentLoaded', () => {
  if (!getAuthToken()) {
    console.log('리디렉션')
    redirectIfNotLoggedIn();
    return;
  }

  document.body.style.display = 'block';
  initDashboard();
});

// 더미 데이터
const dummyReviews = [
  {
    title: '신더',
    oneLineDescription: '유명한 동화들을 소재로 자신만의 독창적인 세계를 선보인다.',
    date: '2025-08-22',
  },
  {
    title: '슬램덩크',
    oneLineDescription: '작품에 재미를 더하는 개그컷도 되살려 실었다.',
    date: '2025-08-22',
  },
  {
    title: '안녕이라 그랬어',
    oneLineDescription: '공간을 둘러싸고 벌어지는 갈등은 서로의 삶의 기준이 맞부딪치는 일.',
    date: '2025-08-21',
  },
  {
    title: '너무 늦은 시간',
    oneLineDescription: '주인공의 모습이 이상하지만, 무엇이 문제인지 당장은 알 수 없다.',
    date: '2025-08-21',
  },
  {
    title: '구의 증명',
    oneLineDescription: '책을 읽는 내내 마치 영화 속 한 장면에 들어간 것 같았어요.',
    date: '2025-07-22',
  },
  {
    title: '꽤 낙천적인 아이',
    oneLineDescription: '매 장마다 웃고 울게 만드는 힘이 있는 책이에요.',
    date: '2025-08-12',
  },
  {
    title: '안녕이라 그랬어',
    oneLineDescription: '처음 몇 장만 읽으려고 했는데, 밤을 세워 끝까지 읽어버렸다.',
    date: '2025-08-09',
  },
  {
    title: '궤도',
    oneLineDescription: '읽는 내내 따뜻하고 뭉클한 기분이 들었다.',
    date: '2025-08-22',
  },
  {
    title: '옐로페이스',
    oneLineDescription: '주인공의 감정이 너무 생생해서 마치 내 이야기를 보는 듯 했다.',
    date: '2025-08-21',
  },
  {
    title: '혼모노',
    oneLineDescription: '이야기의 몰입감이 대단해서 한 번 잡으면 놓을 수가 없었다.',
    date: '2025-07-20',
  },
  {
    title: '신더',
    oneLineDescription: '유명한 동화들을 소재로 자신만의 독창적인 세계를 선보인다.',
    date: '2025-06-18',
  },
];

const dashboard = document.querySelector('#dashboard');
const bookstackWrapper = document.querySelector('.dashboard-bookstack');

/** 대시보드 페이지 초기화 */
async function initDashboard() {
  let totalReviews = [];
  let monthBookmarkCount, yearBookmarkCount;
  const today = new Date();
  const [currentYear, currentMonth] = [today.getFullYear(), today.getMonth() + 1];
  const header = document.querySelector('.dashboard-header');

  dashboard.prepend(Sidebar({}));
  header.prepend(
    Title({
      text: `
    ${currentYear}년 ${currentMonth}월<span class="desktop-only">엔 <span aria-hidden="true">|</span> 책갈피 ${monthBookmarkCount || '8'}개를 남겼어요!</span>
  `,
    })
  );

  try {
    const data = await fetchDashboardData();
    if (data.message) {
      monthBookmarkCount = null;
      yearBookmarkCount = dummyReviews.length;
      totalReviews = dummyReviews;
    } else {
      ({ monthBookmarkCount, yearBookmarkCount, totalReviews } = data);
    }
  } catch (error) {
    console.error(error.message);
    return null;
  } finally {
    const currentMonthReviews = (totalReviews || dummyReviews).filter((review) => {
      const [reviewYear, reviewMonth] = review.date.split('-');
      return reviewYear == currentYear && reviewMonth == currentMonth;
    });

    renderReviews(currentMonthReviews);
    renderCalendar(currentMonthReviews);
    renderStats(currentMonthReviews, yearBookmarkCount);
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

  const bookStack = document.querySelector('.bookstack');
  bookStack.addEventListener('click', (e) => {
    const review = e.target.closest('.bookblock');
    if (!review) return;

    reviewDetailModal();
  });
}

/** 달력 데이터 바인딩 */
function renderCalendar(reviews) {
  const options = {
    locale: 'kr-KR',
  };
  const calendar = new Calendar('#calendar', options);
  calendar.init();
  const loader = document.querySelector('.dashboard-calendar .loader');
  loader.remove();

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
