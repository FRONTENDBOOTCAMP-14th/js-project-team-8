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
const dummyList = [
  {
    title: '아름답고 죽은 그녀',
    imageUrl: 'https://i.pinimg.com/736x/37/6a/97/376a974dee16153f43731681d33d76ee.jpg',
    id: '1',
  },
  {
    title: '아름답고 죽은 그녀',
    imageUrl: 'https://i.pinimg.com/736x/37/6a/97/376a974dee16153f43731681d33d76ee.jpg',
    id: '1',
  },
  {
    title: '아름답고 죽은 그녀',
    imageUrl: 'https://i.pinimg.com/736x/37/6a/97/376a974dee16153f43731681d33d76ee.jpg',
    id: '1',
  },
  {
    title: '아름답고 죽은 그녀',
    imageUrl: 'https://i.pinimg.com/736x/37/6a/97/376a974dee16153f43731681d33d76ee.jpg',
    id: '1',
  },
  {
    title: '아름답고 죽은 그녀',
    imageUrl: 'https://i.pinimg.com/736x/37/6a/97/376a974dee16153f43731681d33d76ee.jpg',
    id: '1',
  },
  {
    title: '아름답고 죽은 그녀',
    imageUrl: 'https://i.pinimg.com/736x/37/6a/97/376a974dee16153f43731681d33d76ee.jpg',
    id: '1',
  },
  {
    title: '아름답고 죽은 그녀',
    imageUrl: 'https://i.pinimg.com/736x/37/6a/97/376a974dee16153f43731681d33d76ee.jpg',
    id: '1',
  },
  {
    title: '아름답고 죽은 그녀',
    imageUrl: 'https://i.pinimg.com/736x/37/6a/97/376a974dee16153f43731681d33d76ee.jpg',
    id: '1',
  },
  {
    title: '아름답고 죽은 그녀',
    imageUrl: 'https://i.pinimg.com/736x/37/6a/97/376a974dee16153f43731681d33d76ee.jpg',
    id: '1',
  },
  {
    title: '아름답고 죽은 그녀',
    imageUrl: 'https://i.pinimg.com/736x/37/6a/97/376a974dee16153f43731681d33d76ee.jpg',
    id: '1',
  },
  {
    title: '아름답고 죽은 그녀',
    imageUrl: 'https://i.pinimg.com/736x/37/6a/97/376a974dee16153f43731681d33d76ee.jpg',
    id: '1',
  },
  {
    title: '아름답고 죽은 그녀',
    imageUrl: 'https://i.pinimg.com/736x/37/6a/97/376a974dee16153f43731681d33d76ee.jpg',
    id: '1',
  },
  {
    title: '아름답고 죽은 그녀',
    imageUrl: 'https://i.pinimg.com/736x/37/6a/97/376a974dee16153f43731681d33d76ee.jpg',
    id: '1',
  },
  {
    title: '아름답고 죽은 그녀',
    imageUrl: 'https://i.pinimg.com/736x/37/6a/97/376a974dee16153f43731681d33d76ee.jpg',
    id: '1',
  },
  {
    title: '아름답고 죽은 그녀',
    imageUrl: 'https://i.pinimg.com/736x/37/6a/97/376a974dee16153f43731681d33d76ee.jpg',
    id: '1',
  },
  {
    title: '아름답고 죽은 그녀',
    imageUrl: 'https://i.pinimg.com/736x/37/6a/97/376a974dee16153f43731681d33d76ee.jpg',
    id: '1',
  },
  {
    title: '아름답고 죽은 그녀',
    imageUrl: 'https://i.pinimg.com/736x/37/6a/97/376a974dee16153f43731681d33d76ee.jpg',
    id: '1',
  },
  {
    title: '아름답고 죽은 그녀',
    imageUrl: 'https://i.pinimg.com/736x/37/6a/97/376a974dee16153f43731681d33d76ee.jpg',
    id: '1',
  },
  {
    title: '아름답고 죽은 그녀',
    imageUrl: 'https://i.pinimg.com/736x/37/6a/97/376a974dee16153f43731681d33d76ee.jpg',
    id: '1',
  },
  {
    title: '아름답고 죽은 그녀',
    imageUrl: 'https://i.pinimg.com/736x/37/6a/97/376a974dee16153f43731681d33d76ee.jpg',
    id: '1',
  },
  {
    title: '아름답고 죽은 그녀',
    imageUrl: 'https://i.pinimg.com/736x/37/6a/97/376a974dee16153f43731681d33d76ee.jpg',
    id: '1',
  },
  {
    title: '아름답고 죽은 그녀',
    imageUrl: 'https://i.pinimg.com/736x/37/6a/97/376a974dee16153f43731681d33d76ee.jpg',
    id: '1',
  },
];

const totalBooks = loadBookList();

/** 글쓰기 페이지 초기화 */
function initWrite() {
  const write = document.querySelector('#write');
  const search = document.querySelector('.write-search');
  const bookList = document.querySelector('.book-list');

  write.prepend(Sidebar({}));
  search.append(
    Input({ id: 'search', type: 'search', variant: 'search', placeholder: '검색하기' })
  );
  search.querySelector('.input-field').autocomplete = 'off';
  ``;

  // dummyList.forEach((item) => {
  //   bookList.append(
  //     BookItem({ title: item.title, imageUrl: item.imageUrl, onClick: bookDetailModal })
  //   );
  // });

  // TODO: 테스트 필요
  const totalBooks = totalBooks.map((book) => {
    const isbn13 = book.isbn13;
    
    return BookItem({
      title: book.title,
      imageUrl: book.imageUrl,
      onClick: (isbn13) => bookDetailModal(isbn13),
    });
  });

  search.addEventListener('input', searchBookEvent);
}

/** 글쓰기 데이터 연동 */
async function loadBookList() {
  try {
    return await fetchBookData();
  } catch(error) {
    console.error(error.message);
    return null;
  }
}

async function loadBookDetail(isbn13) {
  const res = await fetchBookDetail(isbn13);
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
  }

  const searchResult = document.querySelector('.book-list');
  searchResult.innerHTML = '';
  totalBooks.filter((book) => book.title === searchText);
};

/** 책 디테일 모달 */
const bookDetailModal = () => {
  const { title, imageUrl, author, totalPage, description } = fetchBookDetail();

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

  // 더미 데이터
  // let title = '혼모노',
  //   author = '성해나',
  //   page = 368,
  //   reviewtext =
  //     '이번 소설집에는 지난해 끊임없이 호명되며 문단을 휩쓸었다 해도 과언이 아닐 표제작 「혼모노」를 비롯해 작가에게 2년 연속 젊은작가상을 선사해준 「길티 클럽: 호랑이 만지기」, 이 계절의 소설과 올해의 문제소설에 선정된 「스무드」 등이 수록되어 더욱 눈길을 끈다. ';

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
