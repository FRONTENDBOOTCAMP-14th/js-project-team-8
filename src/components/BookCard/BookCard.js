import './BookCard.css';

export function createBookCard({ title, author, coverUrl, rating }) {
  const card = document.createElement('div');
  card.className = 'book-card';

  const activeStars = Array(rating).fill('<span class="star active">★</span>').join('');
  const inactiveStars = Array(5 - rating)
    .fill('<span class="star">★</span>')
    .join('');

  card.innerHTML = `
    <div class="book-cover">
      <img src="${coverUrl}" alt="${title}" />
    </div>
    <div class="book-info">
      <h3 class="book-title">${title}</h3>
      <p class="book-author">${author}</p>
      <div class="book-rating">
        ${activeStars + inactiveStars}
      </div>
    </div>
  `;

  card.addEventListener('click', () => {
    // # = `/books/${encodeURIComponent(title)}`;
  });

  return card;
}
