import './Dashboard.css';
import 'vanilla-calendar-pro/styles/index.css';
import './calendar-override.css';

import { Calendar } from 'vanilla-calendar-pro';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { Title } from '../../components/Title/Title';
import { BookStack } from '../../components/BookStack/BookStack';

document.addEventListener('DOMContentLoaded', initDashboard);

// 더미 데이터
const reviews = [
  { title: '제목', desc: '소제목' },
  { title: '제목', desc: '소제목' },
  { title: '제목', desc: '소제목' },
  { title: '제목', desc: '소제목' },
  { title: '제목', desc: '소제목' },
  { title: '제목', desc: '소제목' },
  { title: '제목', desc: '소제목' },
  { title: '제목', desc: '소제목' },
  { title: '제목', desc: '소제목' },
  { title: '제목', desc: '소제목' },
];

const today = new Date();
let year = today.getFullYear();
let month = today.getMonth() + 1;
let reviewCount = 3;

function initDashboard() {
  const dashboard = document.querySelector('#dashboard');
  const header = document.querySelector('.dashboard-header');
  const bookstackWrapper = document.querySelector('.dashboard-bookstack');

  dashboard.prepend(Sidebar({}));
  header.prepend(
    Title({
      text: `
    ${year}년 ${month}월<span class="desktop-only">엔 <span aria-hidden="true">|</span> 책갈피 ${reviewCount}개를 남겼어요!</span>
  `,
    })
  );
  bookstackWrapper.append(BookStack({ reviews }));

  renderCalendar();
}

function renderCalendar() {
  const calendar = new Calendar('#calendar');
  calendar.init();
}
