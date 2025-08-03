import './MyShelf.css';
import { Sidebar } from '../../components/Sidebar/Sidebar.js';
import { BookItem } from '../../components/BookItem/BookItem.js';
import { fetchReviewList } from '../../api/myShelfData.js';
import { getAuthToken, redirectIfNotLoggedIn } from '../../utils/auth.js';
import { reviewDetailModal } from '../../utils/reviewModal.js';

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
  const reviewList = document.querySelector('#book-list');

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
