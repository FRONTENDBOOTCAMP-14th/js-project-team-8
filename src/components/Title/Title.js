import './Title.css';

export function Title({ text = '제목', color = 'yellow' }) {
  const titleBlock = document.createElement('div');
  const titleText = document.createElement('h2');

  titleBlock.className = `title-block title-${color}`;
  titleText.className = 'title-text';

  titleText.innerHTML = text;

  titleBlock.append(titleText);

  return titleBlock;
}
