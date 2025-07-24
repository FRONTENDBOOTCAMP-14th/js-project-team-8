import './Dashboard.css';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { Title } from '../../components/Title/Title';
import { BookStack } from '../../components/BookStack/BookStack';

const app = document.querySelector('#app');
const header = document.querySelector('.dashboard-header');
const container = document.querySelector('.dashboard-container');
const bookstackWrapper = document.querySelector('.dashboard-bookstack');
const userinfo = document.querySelector('.dashboard-userinfo');
const calendar = document.querySelector('.calendar');
const status = document.querySelector('.status');

const reviews = [
  {title:'제목',desc:'소제목'},
  {title:'제목',desc:'소제목'},
  {title:'제목',desc:'소제목'},
  {title:'제목',desc:'소제목'},
  {title:'제목',desc:'소제목'},
  {title:'제목',desc:'소제목'},
];

let year = 2025;
let month = 12;
let reviewCount = 3;

app.prepend(Sidebar({}));
header.prepend(Title({ text: `${year}년 ${month}월엔 책갈피 ${reviewCount}개를 남겼어요!` }));
bookstackWrapper.append(BookStack({reviews}));