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
    Button({ text: '인기순', color: 'gray' })
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

  // 확인용 더미 데이터
  const bookDataList = [
    {
      title: '모순',
      reviewTitle:
        '새삼스런 강조일 수도 있겠지만, 인간이란 누구나 각자 해석한 만큼의 생을 살아낸다.',
      id: '유저1',
      imageUrl: new URL('../../assets/carousel/pc-banner01.png', import.meta.url).href,
    },
    {
      title: '혼모노',
      reviewTitle: '신명나는 이야기를 즐겨본 독자라면 이 작가를 알아볼 수밖에 없을 것이다.',
      id: '유저2',
      imageUrl: new URL('../../assets/carousel/pc-banner02.png', import.meta.url).href,
    },
    {
      title: '달까지 가자',
      reviewTitle: '삶의 끝에서도 손을 잡아줄 누군가가 있다.',
      id: '유저3',
      imageUrl: new URL('../../assets/carousel/pc-banner03.png', import.meta.url).href,
    },
    {
      title: '모순',
      reviewTitle:
        '새삼스런 강조일 수도 있겠지만, 인간이란 누구나 각자 해석한 만큼의 생을 살아낸다.',
      id: '유저1',
      imageUrl: new URL('../../assets/carousel/pc-banner01.png', import.meta.url).href,
    },
    {
      title: '혼모노',
      reviewTitle: '신명나는 이야기를 즐겨본 독자라면 이 작가를 알아볼 수밖에 없을 것이다.',
      id: '유저2',
      imageUrl: new URL('../../assets/carousel/pc-banner02.png', import.meta.url).href,
    },
    {
      title: '달까지 가자',
      reviewTitle: '삶의 끝에서도 손을 잡아줄 누군가가 있다.',
      id: '유저3',
      imageUrl: new URL('../../assets/carousel/pc-banner03.png', import.meta.url).href,
    },
  ];

  bookDataList.forEach((book) => {
    bookWrapper.append(
      BookHover({
        title: book.title,
        reviewTitle: book.reviewTitle,
        id: book.id,
        imageUrl: book.imageUrl,
      })
    );
  });

  wrapper.append(Carousel(), btnWrapper, bookWrapper);
  community.prepend(Sidebar({ selectedIndex: 2 }));
}

initCommunity();
