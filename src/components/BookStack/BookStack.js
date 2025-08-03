import './BookStack.css';
import { BookBlock } from '../BookBlock/BookBlock';
import { reviewDetailModal } from '../../utils/modal';

export function BookStack({ reviews = [] }) {
  const bookStack = document.createElement('div');

  bookStack.className = 'bookstack';

  reviews.forEach((review, index) => {
    // * TODO: onClick에 책 상세 모달 연결(title로 검색)
    bookStack.append(
      BookBlock({
        title: review.title,
        desc: review.oneLineDescription,
        index,
        onClick: reviewDetailModal,
      })
    );
  });

  return bookStack;
}
