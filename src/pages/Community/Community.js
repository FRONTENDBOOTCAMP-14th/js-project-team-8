import './Community.css';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { Title } from '../../components/Title/Title';
import { Carousel } from '../../components/Carousel/Carousel';
import { Button } from '../../components/Button/Button';
import { BookHover } from '../../components/BookHover/BookHover';

export function initCommunity() {
  const community = document.getElementById('community');
  const header = document.querySelector('.community-header');
  const wrapper = document.querySelector('.community-wrapper');

  const btnWrapper = document.createElement('div');
  btnWrapper.className = 'community-btn-wrapper';

  const bookWrapper = document.createElement('div');
  bookWrapper.className = 'community-book-wrapper';

  const promotionTitle = ['너무 늦은 시간', '혼모노', '자몽살구클럽', '모순', '새로운 질서'];
  const promotionTitleBlock = Title({ text: `# ${promotionTitle[0]}`, color: 'promotion' });
  const titleText = promotionTitleBlock.querySelector('.title-text');

  let currentIndex = 0;
  // 2초마다 텍스트 변경
  setInterval(() => {
    currentIndex = (currentIndex + 1) % promotionTitle.length;
    titleText.textContent = `# ${promotionTitle[currentIndex]}`;
  }, 2000);

  header.append(Title({ text: '모두의 책갈피' }), promotionTitleBlock);

  btnWrapper.append(
    Button({ text: '최신순', color: 'dark' }),
    Button({ text: '제목순', color: 'gray' })
  );

  const btns = btnWrapper.querySelectorAll('.btn');

  btnWrapper.addEventListener('click', ({ target }) => {
    const selectedBtn = target.closest('.btn');
    if (!selectedBtn) return;

    btns.forEach((btn) => {
      btn.classList.toggle('btn-dark', btn === selectedBtn);
      btn.classList.toggle('btn-gray', btn !== selectedBtn);
    });
  });

  wrapper.append(Carousel(), btnWrapper, bookWrapper);
  community.prepend(Sidebar({ selectedIndex: 2 }));
}

initCommunity();
