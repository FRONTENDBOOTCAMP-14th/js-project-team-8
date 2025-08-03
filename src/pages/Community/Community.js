import './Community.css';

import { fetchCommunityData } from '../../api/communityData';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { Title } from '../../components/Title/Title';
import { Carousel } from '../../components/Carousel/Carousel';
import { Button } from '../../components/Button/Button';
import { BookHover } from '../../components/BookHover/BookHover';

export function initCommunity() {
  let publicReviews = [];

  const community = document.getElementById('community');
  const header = document.querySelector('.community-header');
  const wrapper = document.querySelector('.community-wrapper');

  const bookWrapper = document.createElement('ul');
  bookWrapper.className = 'community-book-wrapper';
  bookWrapper.setAttribute('aria-labelledby', 'community-book');

  const bookHeader = document.createElement('h3');
  bookHeader.textContent = '책덕후들의 기록, 같이 구경해요!';
  bookHeader.id = 'community-book';

  const bookWrapperControls = document.createElement('div');
  bookWrapperControls.className = 'community-book-wrapper-controls';

  const btnWrapper = document.createElement('div');
  btnWrapper.className = 'community-btn-wrapper';

  const promotionTitle = ['너무 늦은 시간', '혼모노', '자몽살구클럽', '모순', '새로운 질서'];
  const promotionTitleBlock = Title({ text: `# ${promotionTitle[0]}`, color: 'promotion' });
  const titleText = promotionTitleBlock.querySelector('.title-text');

  let currentIndex = 0;
  setInterval(() => {
    currentIndex = (currentIndex + 1) % promotionTitle.length;
    titleText.textContent = `# ${promotionTitle[currentIndex]}`;
  }, 2000);

  header.append(Title({ text: '모두의 책갈피' }), promotionTitleBlock);

  const latestBtn = Button({ text: '최신순', color: 'dark' });
  latestBtn.dataset.sortType = 'latest';

  const titleBtn = Button({ text: '제목순', color: 'gray' });
  titleBtn.dataset.sortType = 'title';

  btnWrapper.append(latestBtn, titleBtn);

  const btns = btnWrapper.querySelectorAll('.btn');

  btnWrapper.addEventListener('click', ({ target }) => {
    const selectedBtn = target.closest('.btn');
    if (!selectedBtn) return;

    btns.forEach((btn) => {
      btn.classList.toggle('btn-dark', btn === selectedBtn);
      btn.classList.toggle('btn-gray', btn !== selectedBtn);
    });

    const sortOption = selectedBtn.dataset.sortType;
    renderPublicReviews(publicReviews, bookWrapper, sortOption);
  });

  bookWrapperControls.append(bookHeader, btnWrapper);
  wrapper.append(Carousel(), bookWrapperControls, bookWrapper);
  community.prepend(Sidebar({ selectedIndex: 2 }));

  // 데이터 로드 후 렌더링
  loadPublicReviews().then((data) => {
    publicReviews = data;
    renderPublicReviews(publicReviews, bookWrapper, 'latest');
  });
}
initCommunity();

/** 리뷰 렌더링 함수 */
function renderPublicReviews(reviews, bookWrapper, sortOption = 'latest') {
  if (!bookWrapper) return;
  const sorted = [...reviews];

  if (sorted.length === 0) {
    const emptyMessage = document.createElement('li');
    emptyMessage.className = 'community-book-list-empty';
    emptyMessage.textContent = '아직 등록된 책갈피가 없어요. 첫 번째 책갈피 남겨보세요!';
    bookWrapper.append(emptyMessage);
    return;
  }
  
  switch (sortOption) {
    case 'title':
      sorted.sort((a, b) => a.title.localeCompare(b.title, 'ko'));
      break;
    case 'latest':
    default:
      sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  bookWrapper.innerHTML = '';

  sorted.forEach((book) => {
    bookWrapper.append(
      BookHover({
        title: book.title,
        reviewTitle: book.oneLineDescription,
        id: book.nickname,
        imageUrl: book.imageUrl,
      })
    );
  });
}

/** 키보드 방향키로 이동 가능하게 하는 함수 */
function arrowNavigation(wrapperSelector, columnNums) {
  const wrapper = document.querySelector(wrapperSelector);

  wrapper.addEventListener('keydown', (e) => {
    const key = e.key;
    const cards = wrapper.querySelectorAll('.book-hover-wrapper');
    const current = document.activeElement;
    const index = Array.from(cards).indexOf(current);

    if (index === -1) return;

    let nextIndex;

    switch (key) {
      case 'ArrowRight':
        nextIndex = index + 1;
        break;
      case 'ArrowLeft':
        nextIndex = index - 1;
        break;
      case 'ArrowDown':
        nextIndex = index + columnNums;
        break;
      case 'ArrowUp':
        nextIndex = index - columnNums;
        break;
      default:
        return;
    }

    // 페이지 내 스크롤과 카드 스크롤 꼬임 방지
    e.preventDefault();

    if (cards[nextIndex]) {
      cards[nextIndex].focus();
    }
  });
}

/** 리뷰 데이터를 비동기적으로 가져오는 함수 */
async function loadPublicReviews() {
  try {
    const data = await fetchCommunityData();
    return data.publicReviews || [];
  } catch (error) {
    console.error(error.message);
    return [];
  }
}

// 키보드 방향키 접근은 pc 환경에서만
if (window.innerWidth > 1240) {
  arrowNavigation('.community-book-wrapper', 4);
} else {
  arrowNavigation('.community-book-wrapper', 3);
}
