import './BookItem.css';

export function BookItem({ onClick, imageUrl, title }) {
  const container = document.createElement('div');
  container.className = 'book-item';
  container.innerHTML = `
    <div class="book-cover-wrapper">
      <img src="${imageUrl}" alt="${title}" class="book-cover-image">
      <h3 class="book-title">${title}</h3>
    </div>
  `;

  if (typeof onClick === 'function') {
    container.addEventListener('click', onClick);
  }

  return container;
}
