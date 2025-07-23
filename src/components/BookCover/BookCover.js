import './BookCover.css';

export function BookCover({ imageUrl = '' }) {
  const container = document.createElement('div');
  container.className = 'book-cover';

  const image = document.createElement('img');
  image.src = imageUrl;
  image.alt = 'Book Cover';
  image.className = 'book-cover-image';

  container.appendChild(image);

  return container;
}
