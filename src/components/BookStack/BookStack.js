import './BookStack.css';
import { BookBlock } from '../BookBlock/BookBlock';

export function BookStack({ reviews = [] }) {
  const bookStack = document.createElement('div');

  bookStack.className = 'bookstack';

  reviews.forEach((review, index) => {
    // * TODO: onClick에 책 상세 모달 연결
    bookStack.append(BookBlock({ title: review.title, desc: review.subtitle, index }));
  });

  return bookStack;
}
