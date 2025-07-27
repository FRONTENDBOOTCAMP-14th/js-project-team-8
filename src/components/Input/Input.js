import './Input.css';

export function Input({
  id = '',
  type = 'text',
  label = '',
  variant = 'primary',
  placeholder = '',
}) {
  const inputWrapper = document.createElement('div');
  const inputLabel = document.createElement('label');
  const input = document.createElement('div');
  const icon = document.createElement('img');
  const inputField = document.createElement('input');

  inputWrapper.className = 'input-wrapper';

  if (label) {
    inputLabel.className = 'input-label';
    inputLabel.htmlFor = id;
    inputLabel.textContent = label;

    inputWrapper.append(inputLabel);
  }

  input.className = `input input-${variant}`;

  inputField.className = 'input-field';
  inputField.id = id;
  inputField.type = type;
  inputField.placeholder = placeholder;

  if (variant === 'search') {
    icon.src = new URL('../../assets/icon/search.svg', import.meta.url).href;
    icon.alt = '검색 아이콘';

    input.append(icon);
  }

  input.append(inputField);
  inputWrapper.append(input);

  inputField.addEventListener('focus', () => {
    input.classList.add('focus');
  });

  inputField.addEventListener('blur', () => {
    input.classList.remove('focus');
  });

  return inputWrapper;
}
