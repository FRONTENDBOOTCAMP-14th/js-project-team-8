import './Write.css';

import { Sidebar } from '../../components/Sidebar/Sidebar';
import { Input } from '../../components/Input/Input';
import { BookItem } from '../../components/BookItem/BookItem';

document.addEventListener('DOMContentLoaded', initWrite);

// 더미 데이터
const list = [
  {
    title: '아름답고 죽은 그녀',
    imageUrl: 'https://i.pinimg.com/736x/37/6a/97/376a974dee16153f43731681d33d76ee.jpg',
  },
  {
    title: '아름답고 죽은 그녀',
    imageUrl: 'https://i.pinimg.com/736x/37/6a/97/376a974dee16153f43731681d33d76ee.jpg',
  },
  {
    title: '아름답고 죽은 그녀',
    imageUrl: 'https://i.pinimg.com/736x/37/6a/97/376a974dee16153f43731681d33d76ee.jpg',
  },
  {
    title: '아름답고 죽은 그녀',
    imageUrl: 'https://i.pinimg.com/736x/37/6a/97/376a974dee16153f43731681d33d76ee.jpg',
  },
  {
    title: '아름답고 죽은 그녀',
    imageUrl: 'https://i.pinimg.com/736x/37/6a/97/376a974dee16153f43731681d33d76ee.jpg',
  },
  {
    title: '아름답고 죽은 그녀',
    imageUrl: 'https://i.pinimg.com/736x/37/6a/97/376a974dee16153f43731681d33d76ee.jpg',
  },
  {
    title: '아름답고 죽은 그녀',
    imageUrl: 'https://i.pinimg.com/736x/37/6a/97/376a974dee16153f43731681d33d76ee.jpg',
  },
  {
    title: '아름답고 죽은 그녀',
    imageUrl: 'https://i.pinimg.com/736x/37/6a/97/376a974dee16153f43731681d33d76ee.jpg',
  },
  {
    title: '아름답고 죽은 그녀',
    imageUrl: 'https://i.pinimg.com/736x/37/6a/97/376a974dee16153f43731681d33d76ee.jpg',
  },
  {
    title: '아름답고 죽은 그녀',
    imageUrl: 'https://i.pinimg.com/736x/37/6a/97/376a974dee16153f43731681d33d76ee.jpg',
  },
  {
    title: '아름답고 죽은 그녀',
    imageUrl: 'https://i.pinimg.com/736x/37/6a/97/376a974dee16153f43731681d33d76ee.jpg',
  },
];

/** 글쓰기 페이지 초기화 */
function initWrite() {
  const write = document.querySelector('#write');
  const search = document.querySelector('.write-search');
  const bookList = document.querySelector('.book-list');

  write.prepend(Sidebar({}));
  search.append(
    Input({ id: 'search', type: 'search', variant: 'search', placeholder: '검색하기' })
  );

  list.forEach((item) => {
    bookList.append(BookItem({ title: item.title, imageUrl: item.imageUrl }));
  });

  search.addEventListener('input', searchBookEvent);
}

/** 글쓰기 페이지 검색 이벤트 핸들러 */
function searchBookEvent() {}
