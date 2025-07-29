import './MyShelf.css';
import { Sidebar } from '../../components/Sidebar/Sidebar.js';
import { BookItem } from '../../components/BookItem/BookItem.js';
import { Modal } from '../../components/Modal/Modal.js';

function showModal(book) {
  const modalContent = document.createElement('div');
  modalContent.className = 'book-detail';

  const top = document.createElement('div');
  top.className = 'book-detail-top';

  const bottom = document.createElement('div');
  bottom.className = 'book-detail-bottom';

  const header = document.createElement('header');
  header.innerHTML = `
  <h2>${book.title}</h2>
  <hr class="book-detail-divider" />
  <div class="book-meta-box">
    <div class="book-rating">
      <span class="label">내 별점</span>
      <span class="stars">${generateStarHTML(book.rating || 0)}</span>
    </div>
    <div class="book-readpage">
      읽은 페이지 <span class="gray-text">${book.readPage || '000'}p</span>
    </div>
  </div>
`;

  const bookpreview = document.createElement('p');
  bookpreview.textContent =
    '이번 소설집에는 지난해 끊임없이 호명되며 문단을 휩쓸었다 해도 과언이 아닐 표제작 「혼모노」를 비롯해 작가에게 2년 연속 젊은작가상을 선사해준 「길티 클럽: 호랑이 만지기」, 이 계절의 소설과 올해의 문제소설에 선정된 「스무드」 등이 수록되어 더욱 눈길을 끈다.';

  const image = document.createElement('img');
  image.src =
    'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTA0MDVfMjg3%2FMDAxNzQzODQ4ODEyODQx.mciCW4KDNTuYC2iL9kJKqRjKVZrEUkGtLrEWDL6m750g.T7liorZX4N1Sz4LPugxQQskk0L-CWyFXL4EnnP7oULcg.JPEG%2Foutput_1446053893.jpg&type=sc960_832';
  image.alt = book.title;
  image.className = 'book-detail-image';

  const closeButton = document.createElement('button');
  closeButton.textContent = '닫기';
  closeButton.className = 'book-detail-close';
  closeButton.addEventListener('click', () => {
    modal.remove();
  });

  top.append(image, header);
  bottom.append(bookpreview);
  modalContent.append(top, bottom, closeButton);

  const modal = Modal({ isOpen: true, children: modalContent });
  modal.classList.add('book-detail-modal');
  document.body.appendChild(modal);
}

function generateStarHTML(rating) {
  return Array.from({ length: 5 }, (_, i) => {
    if (i + 1 <= Math.floor(rating)) return '<span class="star on">★</span>';
    if (i + 1 === Math.ceil(rating) && !Number.isInteger(rating))
      return '<span class="star half">★</span>';
    return '<span class="star">★</span>';
  }).join('');
}

function initMyShelf() {
  const sidebarContainer = document.getElementById('sidebar-container');
  const bookList = document.getElementById('book-list');

  sidebarContainer.appendChild(Sidebar({}));

  const modal = Modal({});
  document.body.appendChild(modal);

  const books = [
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

  books.forEach((book) => {
    const bookItem = BookItem({
      title: book.title,
      imageUrl: book.imageUrl,
      onClick: () => {
        showModal(book);
      },
    });

    bookList.appendChild(bookItem);
  });
}
initMyShelf();
