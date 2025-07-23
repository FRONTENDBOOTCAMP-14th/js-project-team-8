import { BookCover } from '../BookCover/BookCover';
import './BookItem.css';

export function BookItem({ onClick = null, imageUrl = null, title = '' }) {
  const container = document.createElement('div');
  const bookTitle = document.createElement('h3');

  container.className = 'book-item';
  bookTitle.className = 'book-title';
  bookTitle.textContent = title;

  container.append(BookCover({ imageUrl: imageUrl }), bookTitle);

  if (onClick && typeof onClick === 'function') {
    container.addEventListener('click', onClick);
  }

  return container;
}
