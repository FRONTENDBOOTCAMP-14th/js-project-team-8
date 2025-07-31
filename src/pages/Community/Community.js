import './Community.css';

import { fetchCommunityData } from '../../api/communityData';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { Title } from '../../components/Title/Title';
import { Carousel } from '../../components/Carousel/Carousel';
import { Button } from '../../components/Button/Button';
import { BookHover } from '../../components/BookHover/BookHover';

export function initCommunity() {

  // 서버에서 받아온 책 데이터 저장
  let bookDataList = []
  const bookWrapper = document.createElement('ul');
  bookWrapper.className = 'community-book-wrapper';
  bookWrapper.setAttribute('aria-labelledby', 'community-book')

  const bookHeader = document.createElement('h3')
  bookHeader.textContent = '책덕후들의 기록, 같이 구경해요!'
  bookHeader.id = 'community-book'

  /** 책 데이터를 받아와서 화면에 렌더링하는 비동기 함수 */
  async function loadBookData(sortType = 'latest') {
    try {
      const data = await fetchCommunityData();
      bookDataList = data.publicReviews || [];
      renderBooks(sortType);
    } catch (error) {
      console.error(error.message);
      return null
    }
  }

  /** 정렬 기준(최신순, 제목순)에 따른 필터링 함수 */
  function renderBooks(sortType = 'latest') {
    if (!bookDataList.length) return;

    let sorted = [...bookDataList];

    if (sortType === 'title') {
      sorted.sort((a, b) => a.title.localeCompare(b.title, 'ko'));
    } else {
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

  const community = document.getElementById('community');
  const header = document.querySelector('.community-header');
  const wrapper = document.querySelector('.community-wrapper');

  // bookWrapperControls : btnWrapper와 bookHeader를 묶는 container
  const bookWrapperControls = document.createElement('div')
  bookWrapperControls.className = 'community-book-wrapper-controls'
  const btnWrapper = document.createElement('div');
  btnWrapper.className = 'community-btn-wrapper';

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

    const sortType = selectedBtn.textContent === '제목순' ? 'title' : 'latest';
    renderBooks(sortType);
  });

  bookWrapperControls.append(bookHeader, btnWrapper)
  wrapper.append(Carousel(), bookWrapperControls, bookWrapper);
  community.prepend(Sidebar({ selectedIndex: 2 }));

  // 데이터 로딩은 따로 분리된 함수에서 처리
  loadBookData(); // 최신순으로 초기 렌더링
}

initCommunity();