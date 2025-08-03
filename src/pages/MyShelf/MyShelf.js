import './MyShelf.css';
import { Sidebar } from '../../components/Sidebar/Sidebar.js';
import { Button } from '../../components/Button/Button.js';
import { BookCover } from '../../components/BookCover/BookCover.js';
import { BookItem } from '../../components/BookItem/BookItem.js';
import { Modal } from '../../components/Modal/Modal.js';
import { fetchReviewList, fetchReviewDetail } from '../../api/myShelfData.js';
import { getAuthToken, redirectIfNotLoggedIn } from '../../utils/auth.js';

document.addEventListener('DOMContentLoaded', () => {
  if (!getAuthToken()) {
    redirectIfNotLoggedIn();
    return;
  }

  document.body.style.display = 'block';
  initMyShelf();
});

const dummyReviews = [
  {
    title: '신더',
    imageUrl: 'https://i.pinimg.com/736x/c7/db/56/c7db567ea02449b2254ec1b576e01dcd.jpg',
    isbn13: '0000000000000',
  },
  {
    title: '슬램덩크',
    imageUrl: 'https://i.pinimg.com/736x/a1/f9/4d/a1f94dac2a3aab0ee1409b961c671b84.jpg',
    isbn13: '0000000000000',
  },
  {
    title: '안녕이라 그랬어',
    imageUrl: 'https://i.pinimg.com/1200x/0c/a7/b5/0ca7b5370aefbfe2d66e544fcacd246b.jpg',
    isbn13: '0000000000000',
  },
  {
    title: '너무 늦은 시간',
    imageUrl: 'https://image.aladin.co.kr/img/events/book/2025/02/250423_keegan_book.png',
    isbn13: '0000000000000',
  },
  {
    title: '구의 증명',
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1578661264i/42648157.jpg',
    isbn13: '0000000000000',
  },
  {
    title: '꽤 낙천적인 아이',
    imageUrl: 'https://image.yes24.com/goods/148743172/XL',
    isbn13: '0000000000000',
  },
  {
    title: '궤도',
    imageUrl: 'https://image.aladin.co.kr/product/36747/47/cover200/e362636268_1.jpg',
    isbn13: '0000000000000',
  },
  {
    title: '옐로페이스',
    imageUrl: 'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788970125749.jpg',
    isbn13: '0000000000000',
  },
  {
    title: '탈주',
    imageUrl: 'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/480D240195820.jpg',
    isbn13: '0000000000000',
  },
  {
    title: '가공범',
    imageUrl: 'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791170612759.jpg',
    isbn13: '0000000000000',
  },
  {
    title: '편안함의 습격',
    imageUrl: 'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791193238691.jpg',
    isbn13: '0000000000000',
  },
  {
    title: '다크 심리학',
    imageUrl: 'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791198754080.jpg',
    isbn13: '0000000000000',
  },
  {
    title: '니체 인생수업: 니체가 세상에 남긴 66가지 인생지혜(리커버 에디션)',
    imageUrl: 'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791193282069.jpg',
    isbn13: '0000000000000',
  },
  {
    title: '푸른 사자 와니니 8: 갈라진 앞발들',
    imageUrl: 'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788936443443.jpg',
    isbn13: '0000000000000',
  },
  {
    title: '혼모노',
    imageUrl: 'https://i.pinimg.com/736x/05/45/b0/0545b0f03de19da2d2639ec92efae930.jpg',
    isbn13: '0000000000000',
  },
  {
    title: '똑똑하게 화를 다스리는 법',
    imageUrl: 'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788950912161.jpg',
    isbn13: '0000000000000',
  },
];

/** 개인서랍 페이지 초기화 */
async function initMyShelf() {
  const sidebarContainer = document.querySelector('#sidebar-container');
  const reviewList = document.querySelector('book-list');

  sidebarContainer.append(Sidebar({ selectedIndex: 1 }));

  try {
    let reviews = await fetchReviewList();
    reviewList.innerHTML = '';

    if (reviews.message) {
      console.log('리뷰 없음');
      reviews = dummyReviews;
    }

    reviews.forEach((review) => {
      reviewList.append(
        BookItem({
          title: review.title,
          imageUrl: review.imageUrl,
          onClick: () => reviewDetailModal(review),
        })
      );
    });
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

/** 리뷰 디테일 모달 생성 */
export async function reviewDetailModal(review) {
  const dummyDetail = {
    title: '혼모노',
    imageUrl: 'https://i.pinimg.com/736x/05/45/b0/0545b0f03de19da2d2639ec92efae930.jpg',
    rate: 4,
    currentPage: 52,
    totalPage: 498,
    oneLineDescription: '주인공의 모습이 이상하지만, 무엇이 문제인지 당장은 알 수 없다.',
    detailDescription:
      '이번 소설집에는 지난해 끊임없이 호명되며 문단을 휩쓸었다 해도 과언이 아닐 표제작 「혼모노」를 비롯해 작가에게 2년 연속 젊은작가상을 선사해준 「길티 클럽: 호랑이 만지기」, 이 계절의 소설과 올해의 문제소설에 선정된 「스무드」 등이 수록되어 더욱 눈길을 끈다.',
  };
  let detail = dummyDetail;
  try {
    // const data = await fetchReviewDetail(review.isbn13);
    // detail = data ? data : dummyDetail;
  } catch (error) {
    console.error('리뷰 상세 조회 실패:', error);
  }
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

  const starSVG = `
      <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.87765 3.9191C7.49297 2.38511 7.80063 1.61811 8.30047 1.51181C8.4319 1.48386 8.56774 1.48386 8.69917 1.51181C9.19902 1.61811 9.50668 2.38511 10.122 3.9191C10.4719 4.79145 10.6469 5.22762 10.9743 5.52429C11.0661 5.6075 11.1658 5.68161 11.2719 5.74558C11.6503 5.97364 12.1226 6.01595 13.0674 6.10055C14.6666 6.24378 15.4662 6.31539 15.7104 6.77131C15.761 6.86573 15.7953 6.96797 15.8121 7.07376C15.8931 7.58458 15.3052 8.11939 14.1295 9.18901L13.8031 9.48603C13.2534 9.9861 12.9786 10.2361 12.8196 10.5482C12.7243 10.7353 12.6603 10.9369 12.6304 11.1448C12.5804 11.4915 12.6609 11.8542 12.8219 12.5796L12.8794 12.8388C13.168 14.1398 13.3124 14.7903 13.1322 15.11C12.9704 15.3972 12.6723 15.5811 12.343 15.5968C11.9764 15.6143 11.4599 15.1934 10.4268 14.3516C9.74621 13.797 9.4059 13.5197 9.02811 13.4114C8.68288 13.3124 8.31677 13.3124 7.97153 13.4114C7.59375 13.5197 7.25344 13.797 6.57282 14.3516C5.53976 15.1934 5.02323 15.6143 4.65665 15.5968C4.32737 15.5811 4.02928 15.3972 3.86745 15.11C3.68729 14.7903 3.83161 14.1398 4.12026 12.8388L4.17777 12.5796C4.33872 11.8542 4.4192 11.4915 4.36926 11.1448C4.3393 10.9369 4.27536 10.7353 4.18001 10.5482C4.02105 10.2361 3.74622 9.9861 3.19658 9.48603L2.8701 9.18901C1.69443 8.11939 1.10659 7.58458 1.18754 7.07376C1.20431 6.96797 1.23869 6.86573 1.28927 6.77131C1.53345 6.31539 2.33306 6.24378 3.93229 6.10055C4.877 6.01595 5.34936 5.97364 5.72775 5.74558C5.83388 5.68161 5.93356 5.6075 6.02539 5.52429C6.35276 5.22762 6.52772 4.79145 6.87765 3.9191Z" fill="#797979" stroke="#797979" stroke-width="1.15"/>
      </svg>
    `;

  const starContainer = document.createElement('div');
  starContainer.className = 'star-container';

  for (let i = 0; i < 5; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    if (i < detail.rate) star.classList.add('color');
    star.innerHTML = starSVG;
    starContainer.appendChild(star);
  }

  header.innerHTML = `
      <h2>${detail.title}</h2>
      <div class="review-info">
        <p class="stars-wrapper">
          내 별점
          <span class="rating-score" style="display: none;">${detail.rate}</span>
        </p>
        <div><p>읽은 페이지</p><span>${detail.currentPage} / ${detail.totalPage}</span></div>
      </div>
    `;

  const starsWrapper = header.querySelector('.stars-wrapper');
  starsWrapper.appendChild(starContainer);

  reviewTitle.className = 'review-detail-title';
  reviewTitle.textContent = detail.oneLineDescription || '리뷰 요약이 없습니다.';
  reviewText.className = 'review-detail-text';
  reviewText.textContent = detail.detailDescription || '리뷰 내용이 없습니다.';

  top.append(BookCover({ imageUrl: detail.imageUrl }), header);
  bottom.append(reviewTitle, reviewText);

  reviewDetail.append(top, bottom, writeButton);

  const reviewDetailModal = Modal({ isOpen: true, children: reviewDetail });
  reviewDetailModal.classList.add('review-detail-modal');

  writeButton.addEventListener('click', () => {
    document.body.removeChild(reviewDetailModal);
  });

  document.body.append(reviewDetailModal);
}
