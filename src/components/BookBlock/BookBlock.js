import './BookBlock.css';

export function BookBlock({ title = '책 제목', desc = '한줄 서평', index = 0, onClick = null }) {
  const bookBlock = document.createElement('div');
  const bookTitle = document.createElement('h3');
  const bookDesc = document.createElement('p');

  const direction = ['bookblock-right', 'bookblock-left'];
  const color = ['bookblock-blue', 'bookblock-yellow', 'bookblock-green', 'bookblock-pink'];

  bookBlock.className = 'bookblock';
  bookTitle.className = 'bookblock-title';
  bookDesc.className = 'bookblock-desc';

  bookBlock.classList.add(direction[index % direction.length]);
  bookBlock.classList.add(color[index % color.length]);

  bookBlock.setAttribute('tabindex', '0');
  bookTitle.textContent = title;
  bookDesc.textContent = desc;

  bookBlock.append(bookTitle, bookDesc);

  if (onClick) {
    bookBlock.addEventListener('click', onClick);
    bookBlock.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick();
      }
    });
  }

  return bookBlock;
}

document.body.append(BookBlock({}))