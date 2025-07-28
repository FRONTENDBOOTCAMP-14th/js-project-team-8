import './MyShelf.css';
import { Sidebar } from '../../components/Sidebar/Sidebar.js';
import { BookItem } from '../../components/BookItem/BookItem.js';
import { Modal } from '../../components/Modal/Modal.js';

const sidebarContainer = document.getElementById('sidebar-container');
const bookList = document.getElementById('book-list');

sidebarContainer.appendChild(Sidebar({}));

const modal = Modal({});
document.body.appendChild(modal);

const books = [
  { title: '혼모노', imageUrl: '#' },
  { title: '경험의 멸종', imageUrl: '#' },
  { title: '궤도', imageUrl: '#' },
  { title: '꽥 낙천적인 아이', imageUrl: '#' },
  { title: '옐로페이스', imageUrl: '#' },
  { title: '장미와 나이프', imageUrl: '#' },
  { title: '안앙이라 그랬어', imageUrl: '#' },
  { title: '하기쿠라 죽은 여름', imageUrl: '#' },
  { title: '구의 증명', imageUrl: '#' },
  { title: '일의 반복 여름', imageUrl: '#' },
];

books.forEach((book) => {
  const bookItem = BookItem({
    title: book.title,
    imageUrl: book.imageUrl,
    onClick: () => {
      modal.show(book);
    },
  });

  bookList.appendChild(bookItem);
});
