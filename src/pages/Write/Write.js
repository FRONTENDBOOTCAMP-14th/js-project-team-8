import './Write.css';

import { Sidebar } from '../../components/Sidebar/Sidebar';
import { Input } from '../../components/Input/Input';
import { BookItem } from '../../components/BookItem/BookItem';
import { Modal } from '../../components/Modal/Modal';
import { BookCover } from '../../components/BookCover/BookCover';
import { Button } from '../../components/Button/Button';
import { Title } from '../../components/Title/Title';
import { getYearMonthDateFormat } from '../../utils/date';
import { fetchBookData, fetchBookDetail, postReview } from '../../api/writeData';

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
let totalBooks = [];

/** 글쓰기 페이지 초기화 */
async function initWrite() {
  const write = document.querySelector('#write');
  const search = document.querySelector('.write-search');

  write.prepend(Sidebar({}));

  try {
    const data = await fetchBookData();
    totalBooks = data.books;

    if (!totalBooks || totalBooks.length === 0) {
      renderBooks(dummyBooks);
      return;
    }
    renderBooks(totalBooks);
  } catch (error) {
    console.error(error.message);
    return null;
  } finally {
    search.append(
      Input({ id: 'search', type: 'search', variant: 'search', placeholder: '검색하기' })
    );
    search.querySelector('.input-field').autocomplete = 'off';
    search.addEventListener('input', searchBookEvent);
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

  const fragment = document.createDocumentFragment();
  books.forEach((book) => {
    const isbn13 = book.isbn13;
    const bookEl = BookItem({
      title: book.title,
      imageUrl: book.imageUrl,
      onClick: () => bookDetailModal(isbn13),
    });

    fragment.append(bookEl);
  });

  bookList.append(fragment);
}

/** 글쓰기 페이지 검색 핸들러 */
const searchBookEvent = () => {
  const searchText = document.querySelector('.write-search .input-field').value.trim();
  const headingText = document.querySelector('.write-book-container > h2');

  headingText.textContent = `"${searchText}"의 검색 결과`;
  headingText.classList.add('isSearched');

  if (!searchText) {
    headingText.textContent = '이달의 베스트셀러';
    headingText.classList.remove('isSearched');
    renderBooks(totalBooks);
    return;
  }

  const filtered = totalBooks.filter((book) =>
    book.title.toLowerCase().includes(searchText.toLowerCase())
  );

  // 중복 도서 제거
  const seen = new Set();
  const deduplicatedBooks = filtered.filter((book) => {
    if (seen.has(book.isbn13)) return false;
    seen.add(book.isbn13);
    return true;
  });

  renderBooks(deduplicatedBooks);
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
  bookData.isbn13 = isbn13;

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
  writeButton.addEventListener('click', () => writeReviewModal(bookData));
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
  const { title, imageUrl, totalPage, isbn13 } = bookData;

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

  const fetchStar = (i) =>
    fetch('/assets/icons/star.svg')
      .then((res) => res.text())
      .then((svg) => {
        const star = document.createElement('button');
        star.className = 'star';
        star.type = 'button';
        star.innerHTML = svg;
        star.dataset.order = i + 1;
        return star;
      });

  // 인덱스 꼬임 방지
  Promise.all([0, 1, 2, 3, 4].map(fetchStar)).then((stars) => {
    stars.forEach((star) => rate.append(star));
  });

  let rateNum = 0;

  rate.addEventListener('click', (e) => {
    const star = e.target.closest('.star');
    if (!star) return;
    const stars = rate.querySelectorAll('.star');

    rateNum = +star.dataset.order;

    stars.forEach((star, i) => {
      star.classList.remove('fill');
      if (i < rateNum) star.classList.add('fill');
    });
  });

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

  const publicState = document.createElement('div');
  const publicText = document.createElement('p');
  const publicToggle = document.createElement('label');
  const publicInput = document.createElement('input');
  publicState.className = 'write-review-toggle';
  publicText.textContent = '비공개';
  publicToggle.setAttribute('for', 'public');
  publicInput.type = 'checkbox';
  publicInput.id = 'public';
  publicState.append(publicText, publicInput, publicToggle);

  publicState.addEventListener('click', (e) => {
    const toggle = e.target.closest('label');
    if (!toggle) return;

    publicInput.value = !publicInput.value;
    publicText.textContent = publicInput.value ? '공개' : '비공개';
  });

  const submitWrapper = document.createElement('div');
  const letterCounter = document.createElement('div');
  letterCounter.className = 'write-review-counter';
  letterCounter.textContent = `0 / 500`;

  reviewText.addEventListener('input', () => {
    const count = reviewText.value.length;
    letterCounter.textContent = `${count} / 500`;
  });

  const submitButton = Button({
    text: '남기기',
    type: 'button',
    color: 'dark',
  });
  submitButton.classList.add('write-review-submit');

  submitWrapper.append(letterCounter, submitButton);

  header.append(Title({ text: title, color: 'yellow' }));
  top.append(rating, page);
  bottom.append(publicState, submitWrapper);
  form.append(top, reviewTitle, reviewText, bottom);
  writeReview.append(header, form);
  modal.append(writeReview);

  submitButton.addEventListener('click', () => {
    const reviewData = {
      title: title || '제목 미상',
      imageUrl:
        imageUrl || new URL('../../assets/image/undefined-bookcover.jpg', import.meta.url).href,
      oneLineDescription: reviewTitle.value || '',
      detailDescription: reviewText.value || '',
      rate: rateNum || 0,
      currentPage: +pageInput.value || 0,
      totalPage: +totalPage || 0,
      date: getYearMonthDateFormat(),
      public: publicInput.checked,
      isbn13: isbn13 || '0000000000000',
    };

    submitReview(reviewData);
  });
};

/** 리뷰 등록 */
const submitReview = async (reviewData) => {
  try {
    await postReview(reviewData);
    console.log('리뷰 등록 성공');
    const answer = confirm('책갈피를 등록했습니다! 개인 서랍으로 이동할까요?');
    if (answer) {
      window.location.href = 'src/pages/MyShelf/MyShelf.html';
    } else {
      const modal = document.querySelector('.modal-wrapper');
      modal.remove();
    }
  } catch (error) {
    console.log(error.message);
    alert('리뷰 등록에 실패했습니다. 다시 시도해주세요.');
    return null;
  }
};
