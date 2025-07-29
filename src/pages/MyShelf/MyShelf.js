import './MyShelf.css';
import { Sidebar } from '../../components/Sidebar/Sidebar.js';
import { BookItem } from '../../components/BookItem/BookItem.js';
import { Modal } from '../../components/Modal/Modal.js';

function initMyShelf() {
  const sidebarContainer = document.getElementById('sidebar-container');
  const bookList = document.getElementById('book-list');

  sidebarContainer.appendChild(Sidebar({ selectedIndex: 1 }));

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
        modal.show(book);
      },
    });

    bookList.appendChild(bookItem);
  });
}
initMyShelf();
