import './Modal.css';

export function Modal({ isOpen = false, children = null }) {
  const modalWrapper = document.createElement('div');
  const modal = document.createElement('div');

  modalWrapper.className = 'modal-wrapper';
  modal.className = 'modal';

  if (children) {
    modal.append(children);
  }

  modalWrapper.append(modal);

  if (isOpen) {
    modalWrapper.classList.add('show');

    // 배경 클릭 닫힘
    modalWrapper.addEventListener('click', (e) => {
      if (e.target !== modalWrapper) return;
      modalWrapper.classList.remove('show');
    });

    // esc 키다운 닫힘
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        modalWrapper.classList.remove('show');
      }
    });
  }

  return modalWrapper;
}
