import './MyShelf.css';
import { Sidebar } from '../../components/Sidebar/Sidebar.js';
import { Button } from '../../components/Button/Button.js';
import { BookCover } from '../../components/BookCover/BookCover.js';
import { BookItem } from '../../components/BookItem/BookItem.js';
import { Modal } from '../../components/Modal/Modal.js';

// 더미 데이터
const reviews = [
  {
    title: '혼모노',
    imageUrl:
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTA0MDVfMjg3%2FMDAxNzQzODQ4ODEyODQx.mciCW4KDNTuYC2iL9kJKqRjKVZrEUkGtLrEWDL6m750g.T7liorZX4N1Sz4LPugxQQskk0L-CWyFXL4EnnP7oULcg.JPEG%2Foutput_1446053893.jpg&type=sc960_832',
  },
  {
    title: '혼모노',
    imageUrl:
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTA0MDVfMjg3%2FMDAxNzQzODQ4ODEyODQx.mciCW4KDNTuYC2iL9kJKqRjKVZrEUkGtLrEWDL6m750g.T7liorZX4N1Sz4LPugxQQskk0L-CWyFXL4EnnP7oULcg.JPEG%2Foutput_1446053893.jpg&type=sc960_832',
  },
  {
    title: '혼모노',
    imageUrl:
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTA0MDVfMjg3%2FMDAxNzQzODQ4ODEyODQx.mciCW4KDNTuYC2iL9kJKqRjKVZrEUkGtLrEWDL6m750g.T7liorZX4N1Sz4LPugxQQskk0L-CWyFXL4EnnP7oULcg.JPEG%2Foutput_1446053893.jpg&type=sc960_832',
  },
  {
    title: '혼모노',
    imageUrl:
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTA0MDVfMjg3%2FMDAxNzQzODQ4ODEyODQx.mciCW4KDNTuYC2iL9kJKqRjKVZrEUkGtLrEWDL6m750g.T7liorZX4N1Sz4LPugxQQskk0L-CWyFXL4EnnP7oULcg.JPEG%2Foutput_1446053893.jpg&type=sc960_832',
  },
  {
    title: '혼모노',
    imageUrl:
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTA0MDVfMjg3%2FMDAxNzQzODQ4ODEyODQx.mciCW4KDNTuYC2iL9kJKqRjKVZrEUkGtLrEWDL6m750g.T7liorZX4N1Sz4LPugxQQskk0L-CWyFXL4EnnP7oULcg.JPEG%2Foutput_1446053893.jpg&type=sc960_832',
  },
  {
    title: '혼모노',
    imageUrl:
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTA0MDVfMjg3%2FMDAxNzQzODQ4ODEyODQx.mciCW4KDNTuYC2iL9kJKqRjKVZrEUkGtLrEWDL6m750g.T7liorZX4N1Sz4LPugxQQskk0L-CWyFXL4EnnP7oULcg.JPEG%2Foutput_1446053893.jpg&type=sc960_832',
  },
  {
    title: '혼모노',
    imageUrl:
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTA0MDVfMjg3%2FMDAxNzQzODQ4ODEyODQx.mciCW4KDNTuYC2iL9kJKqRjKVZrEUkGtLrEWDL6m750g.T7liorZX4N1Sz4LPugxQQskk0L-CWyFXL4EnnP7oULcg.JPEG%2Foutput_1446053893.jpg&type=sc960_832',
  },
  {
    title: '혼모노',
    imageUrl:
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTA0MDVfMjg3%2FMDAxNzQzODQ4ODEyODQx.mciCW4KDNTuYC2iL9kJKqRjKVZrEUkGtLrEWDL6m750g.T7liorZX4N1Sz4LPugxQQskk0L-CWyFXL4EnnP7oULcg.JPEG%2Foutput_1446053893.jpg&type=sc960_832',
  },
  {
    title: '혼모노',
    imageUrl:
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTA0MDVfMjg3%2FMDAxNzQzODQ4ODEyODQx.mciCW4KDNTuYC2iL9kJKqRjKVZrEUkGtLrEWDL6m750g.T7liorZX4N1Sz4LPugxQQskk0L-CWyFXL4EnnP7oULcg.JPEG%2Foutput_1446053893.jpg&type=sc960_832',
  },
  {
    title: '혼모노',
    imageUrl:
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTA0MDVfMjg3%2FMDAxNzQzODQ4ODEyODQx.mciCW4KDNTuYC2iL9kJKqRjKVZrEUkGtLrEWDL6m750g.T7liorZX4N1Sz4LPugxQQskk0L-CWyFXL4EnnP7oULcg.JPEG%2Foutput_1446053893.jpg&type=sc960_832',
  },
  {
    title: '혼모노',
    imageUrl:
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTA0MDVfMjg3%2FMDAxNzQzODQ4ODEyODQx.mciCW4KDNTuYC2iL9kJKqRjKVZrEUkGtLrEWDL6m750g.T7liorZX4N1Sz4LPugxQQskk0L-CWyFXL4EnnP7oULcg.JPEG%2Foutput_1446053893.jpg&type=sc960_832',
  },
];

initMyShelf();

/** 개인서랍 페이지 초기화 */
function initMyShelf() {
  const sidebarContainer = document.getElementById('sidebar-container');
  const reviewList = document.getElementById('book-list');

  sidebarContainer.appendChild(Sidebar({ selectedIndex: 1 }));

  reviews.forEach((review) => {
    reviewList.append(
      BookItem({
        title: review.title,
        imageUrl: review.imageUrl,
        onClick: reviewDetailModal,
      })
    );
  });
}

/** 리뷰 디테일 모달 생성 */
function reviewDetailModal() {
  const detail = {
    title: '혼모노',
    imageUrl:
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTA0MDVfMjg3%2FMDAxNzQzODQ4ODEyODQx.mciCW4KDNTuYC2iL9kJKqRjKVZrEUkGtLrEWDL6m750g.T7liorZX4N1Sz4LPugxQQskk0L-CWyFXL4EnnP7oULcg.JPEG%2Foutput_1446053893.jpg&type=sc960_832',
    rating: 3,
    currentPage: 273,
    totalPage: 368,
    onLineDescription: '주인공의 모습이 이상하지만, 무엇이 문제인지 당장은 알 수 없다.',
    detailDescription:
      '이번 소설집에는 지난해 끊임없이 호명되며 문단을 휩쓸었다 해도 과언이 아닐 표제작 「혼모노」를 비롯해 작가에게 2년 연속 젊은작가상을 선사해준 「길티 클럽: 호랑이 만지기」, 이 계절의 소설과 올해의 문제소설에 선정된 「스무드」 등이 수록되어 더욱 눈길을 끈다. ',
  };

  const reviewDetail = document.createElement('div');
  const top = document.createElement('div');
  const header = document.createElement('header');
  const bottom = document.createElement('div');
  const reviewTitle = document.createElement('h3');
  const reviewText = document.createElement('p');
  const writeButton = Button({
    text: '닫기',
    type: 'button',
    color: 'dark',
  });

  reviewDetail.className = 'review-detail';
  top.className = 'review-detail-top';
  bottom.className = 'review-detail-bottom';
  writeButton.classList.add('review-detail-close');

  header.innerHTML = `
    <h2>${detail.title}</h2>
    <p>내 별점 ${detail.rating} <br> 읽은 페이지 ${detail.currentPage} / ${detail.totalPage}</p>
  `;

  reviewTitle.className = 'review-detail-title';
  reviewTitle.textContent = detail.onLineDescription;
  reviewText.className = 'review-detail-text';
  reviewText.textContent = detail.detailDescription;

  top.append(BookCover({ imageUrl: detail.imageUrl }), header);
  bottom.append(reviewTitle, reviewText);

  reviewDetail.append(top, bottom, writeButton);

  const reviewDetailModal = Modal({ isOpen: true, children: reviewDetail });
  reviewDetailModal.classList.add('review-detail-modal');

  document.body.append(reviewDetailModal);
}
