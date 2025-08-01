import './Write.css';

import { Sidebar } from '../../components/Sidebar/Sidebar';
import { Input } from '../../components/Input/Input';
import { BookItem } from '../../components/BookItem/BookItem';
import { Modal } from '../../components/Modal/Modal';
import { BookCover } from '../../components/BookCover/BookCover';
import { Button } from '../../components/Button/Button';
import { Title } from '../../components/Title/Title';
import { authState } from '../../utils/auth';
import { getYearMonthDateFormat } from '../../utils/date';
import { fetchBookData, fetchBookDetail } from '../../api/writeData';

document.addEventListener('DOMContentLoaded', initWrite);

// 더미 데이터
const dummyBooks = [
  {
    title: '아름답고 죽은 그녀',
    imageUrl: 'https://i.pinimg.com/736x/37/6a/97/376a974dee16153f43731681d33d76ee.jpg',
    isbn13: '0000000000000',
  },
  {
    title: '검색테스트123',
    imageUrl: 'https://i.pinimg.com/736x/37/6a/97/376a974dee16153f43731681d33d76ee.jpg',
    isbn13: '0000000000000',
  },
  {
    title: '검색abcd&/',
    imageUrl: 'https://i.pinimg.com/736x/37/6a/97/376a974dee16153f43731681d33d76ee.jpg',
    isbn13: '0000000000000',
  },
  {
    title: '아름답고 죽은 그녀',
    imageUrl: 'https://i.pinimg.com/736x/37/6a/97/376a974dee16153f43731681d33d76ee.jpg',
    isbn13: '0000000000000',
  },
  {
    title: '아름답고 죽은 그녀',
    imageUrl: 'https://i.pinimg.com/736x/37/6a/97/376a974dee16153f43731681d33d76ee.jpg',
    isbn13: '0000000000000',
  },
  {
    title: '아름답고 죽은 그녀',
    imageUrl: 'https://i.pinimg.com/736x/37/6a/97/376a974dee16153f43731681d33d76ee.jpg',
    isbn13: '0000000000000',
  },
  {
    title: '아름답고 죽은 그녀',
    imageUrl: 'https://i.pinimg.com/736x/37/6a/97/376a974dee16153f43731681d33d76ee.jpg',
    isbn13: '0000000000000',
  },
  {
    title: '아름답고 죽은 그녀',
    imageUrl: 'https://i.pinimg.com/736x/37/6a/97/376a974dee16153f43731681d33d76ee.jpg',
    isbn13: '0000000000000',
  },
  {
    title: '아름답고 죽은 그녀',
    imageUrl: 'https://i.pinimg.com/736x/37/6a/97/376a974dee16153f43731681d33d76ee.jpg',
    isbn13: '0000000000000',
  },
];

/** 글쓰기 페이지 초기화 */
async function initWrite() {
  let totalBooks = [];

  try {
    totalBooks = await fetchBookData().books;
  } catch (error) {
    console.error(error.message);
    return null;
  } finally {
    const write = document.querySelector('#write');
    const search = document.querySelector('.write-search');

    write.prepend(Sidebar({ isLoggedin: authState.isLoggedIn }));
    search.append(
      Input({ id: 'search', type: 'search', variant: 'search', placeholder: '검색하기' })
    );
    search.querySelector('.input-field').autocomplete = 'off';
    search.addEventListener('change', searchBookEvent);

    renderBooks(totalBooks || dummyBooks);
  }
}

/** 책 목록 렌더링 */
function renderBooks(books) {
  const bookList = document.querySelector('.book-list');
  bookList.innerHTML = '';

  if (books.length === 0) {
    const noBooksMessage = document.createElement('div');

    noBooksMessage.className = 'no-books';
    noBooksMessage.setAttribute('role', 'status');
    noBooksMessage.setAttribute('aria-live', 'polite');

    noBooksMessage.innerHTML = `
      <p>검색 결과가 없습니다!</p>
    `;

    bookList.append(noBooksMessage);
  }

  books.forEach((book) => {
    const isbn13 = book.isbn13;
    const bookEl = BookItem({
      title: book.title,
      imageUrl: book.imageUrl,
      onClick: (isbn13) => bookDetailModal(isbn13),
    });

    bookList.append(bookEl);
  });
}

/** 글쓰기 페이지 검색 핸들러 */
const searchBookEvent = async () => {
  let totalBooks = await fetchBookData().books;
  const searchText = document.querySelector('.write-search .input-field').value.trim();
  const headingText = document.querySelector('.write-book-container > h2');

  headingText.textContent = `"${searchText}"의 검색 결과`;
  headingText.classList.add('isSearched');

  if (!searchText) {
    headingText.textContent = '이달의 베스트셀러';
    headingText.classList.remove('isSearched');
  }

  const filtered = (totalBooks || dummyBooks).filter((book) => book.title.includes(searchText));
  renderBooks(filtered);
};

/** 책 디테일 로드 */
async function loadBookDetail(isbn13) {
  const fallback = {
    title: '제목 미상',
    imageUrl: new URL('../../assets/image/undefined-bookcover.jpg', import.meta.url).href,
    author: '미상',
    totalPage: '???',
    description: '책 데이터 불러오기에 실패했습니다.',
  };

  try {
    const data = await fetchBookDetail(isbn13);
    return data || fallback;
  } catch (error) {
    console.log(error.message);
    // TODO: 연동 후 null로 수정
    return fallback;
  }
}

/** 책 디테일 모달 */
const bookDetailModal = async (isbn13) => {
  const bookData = await loadBookDetail(isbn13);
  const { title, imageUrl, author, totalPage, description } = bookData;

  const bookDetail = document.createElement('div');
  const top = document.createElement('div');
  const header = document.createElement('header');
  const bottom = document.createElement('div');
  const reviewText = document.createElement('p');
  const writeButton = Button({
    text: '글쓰기',
    type: 'button',
    color: 'dark',
  });

  bookDetail.className = 'book-detail';
  top.className = 'book-detail-top';
  bottom.className = 'book-detail-bottom';
  writeButton.classList.add('book-detail-write');
  writeButton.addEventListener('click', (bookData) => writeReviewModal(bookData));
  header.innerHTML = `
    <h2>${title}</h2>
    <p>작가: ${author} <span aria-hidden="true">/</span> 페이지수: ${totalPage}p</p>
  `;
  reviewText.textContent = description;

  top.append(BookCover({ imageUrl }), header);
  bottom.append(reviewText);

  bookDetail.append(top, bottom, writeButton);

  const bookDetailModal = Modal({ isOpen: true, children: bookDetail });
  bookDetailModal.classList.add('book-detail-modal');

  document.body.append(bookDetailModal);
};

/** 글쓰기 모달 렌더링 */
const writeReviewModal = (bookData) => {
  const { title, imageUrl, totalPage } = bookData;
  const reviewData = {
    title: title,
    imageUrl: imageUrl,
    oneLineDescription: '',
    detailDescription: '',
    rate: 0,
    currentPage: 0,
    totalPage: totalPage,
    date: getYearMonthDateFormat(),
    public: true,
    isbn13: isbn13,
    // TODO: isbn fetch
  };

  const modal = document.querySelector('.modal.isOpen');
  modal.innerHTML = '';
  const writeReview = document.createElement('div');
  writeReview.className = 'write-review';

  const header = document.createElement('header');
  header.className = 'write-review-header';

  const form = document.createElement('form');
  form.className = 'write-review-form';

  const top = document.createElement('section');
  top.className = 'write-review-top';

  const rating = document.createElement('div');
  rating.className = 'write-review-rating';
  const ratingText = document.createElement('p');
  ratingText.textContent = '평가하기';
  const rate = document.createElement('div');
  rate.className = 'rate';

  for (let i = 0; i < 5; i++) {
    const star = document.createElement('button');
    star.className = 'star';
    star.type = 'button';

    fetch('/assets/icons/star.svg')
      .then((res) => res.text())
      .then((svg) => {
        star.innerHTML = svg;
        star.dataset.order = i + 1;
        rate.append(star);
      });
  }

  rating.append(ratingText, rate);

  const page = document.createElement('div');
  const currentPage = Input({
    id: 'currentPage',
    type: 'number',
    variant: 'secondary',
  });
  page.append('읽은 페이지 수', currentPage, '페이지');
  page.className = 'write-review-page';

  const pageInput = currentPage.querySelector('.input .input-field');
  pageInput.addEventListener('input', (e) => {
    let value = e.target.value;

    if (parseInt(value) < 0) {
      e.target.value = 0;
      return;
    }

    if (value.length > 5) {
      e.target.value = value.slice(0, 5);
    }
  });

  const reviewTitle = Input({
    id: 'onelineDescription',
    type: 'text',
    variant: 'secondary',
    placeholder: '이 작품에 대한 한줄평을 남겨주세요.',
  });
  reviewTitle.className = 'write-review-title';
  reviewTitle.querySelector('.input-field').setAttribute('maxlength', '50');

  const reviewText = document.createElement('textarea');
  reviewText.className = 'write-review-text';
  reviewText.placeholder = '이 작품에 대한 책갈피를 남겨주세요.';
  reviewText.setAttribute('maxlength', 500);

  const bottom = document.createElement('div');
  bottom.className = 'write-review-bottom';

  const publicToggle = document.createElement('div');
  publicToggle.className = 'write-review-toggle';
  const letterCounter = document.createElement('div');
  letterCounter.className = 'write-review-counter';

  const submitButton = Button({
    text: '남기기',
    type: 'submit',
    color: 'dark',
  });
  submitButton.className = 'write-review-submit';

  header.append(Title({ text: title, color: 'yellow' }));
  top.append(rating, page);
  bottom.append(publicToggle, letterCounter, submitButton);
  form.append(top, reviewTitle, reviewText, bottom);
  writeReview.append(header, form);
  modal.append(writeReview);

  submitButton.addEventListener('submit', (reviewData) => submitReview(reviewData));
};

const countInputText = () => {};

/** 리뷰 등록 */
const submitReview = async (e) => {
  e.preventDefault();
};
