import './Button.css';

export function Button({ text = '', type = 'button', onClick = null, color = 'dark', size = '' }) {
  const button = document.createElement('button');
  const classList = ['btn', `btn-${color}`];
  if (size) classList.push(`btn-${size}`);

  button.className = classList.join(' ');
  button.type = type;
  button.textContent = text;

  if (typeof onClick === 'function') {
    button.addEventListener('click', onClick);
    button.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick();
      }
    });
  }

  return button;
}
