import './Write.css';

import { Sidebar } from '../../components/Sidebar/Sidebar';
import { Input } from '../../components/Input/Input';
import { BookItem } from '../../components/BookItem/BookItem';
import { Modal } from '../../components/Modal/Modal';
import { BookCover } from '../../components/BookCover/BookCover';
import { Button } from '../../components/Button/Button';
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

    write.prepend(Sidebar({}));
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
  const { title, imageUrl, author, totalPage, description } = await loadBookDetail(isbn13);

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
