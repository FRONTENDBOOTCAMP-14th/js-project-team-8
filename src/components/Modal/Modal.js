import './Modal.css';

export function Modal({ isOpen = false, children = null }) {
  const modalWrapper = document.createElement('div');
  const modal = document.createElement('div');
  const MODAL_TRANSITION_DURATION = 200;

  modalWrapper.className = 'modal-wrapper';
  modal.className = 'modal';

  if (children) {
    modal.append(children);
  }

  modalWrapper.append(modal);

  if (isOpen) {
    modalWrapper.classList.add('show');
    setTimeout(() => {
      modal.classList.add('isOpen');
    }, MODAL_TRANSITION_DURATION);

    // 배경 클릭 닫힘
    modalWrapper.addEventListener('click', (e) => {
      if (e.target !== modalWrapper) return;
      modal.classList.remove('isOpen');
      setTimeout(() => {
        modalWrapper.classList.remove('show');
      }, MODAL_TRANSITION_DURATION);
    });

    // esc 키다운 닫힘
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        modalWrapper.classList.remove('show');
        setTimeout(() => {
          modalWrapper.classList.remove('show');
        }, MODAL_TRANSITION_DURATION);
      }
    });
  }

  return modalWrapper;
}
