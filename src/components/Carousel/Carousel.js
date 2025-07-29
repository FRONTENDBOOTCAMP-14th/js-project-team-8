import './Carousel.css';
import { Button } from '../Button/Button.js';

export function Carousel() {
  const carousel = document.createElement('section');
  carousel.className = 'carousel';

  const slideContainer = document.createElement('div');
  slideContainer.className = 'carousel-slide-container';

  const slideWrapper = document.createElement('ul');
  slideWrapper.className = 'carousel-slide-wrapper';

  const slideData = [
    {
      title1: '당신의 길에 작은',
      title2: '힌트를 줄 책갈피',
      subtitle: '흔들리는 하루 속, <br class="line-break">책은 작은 평온을 남겼다.',
      src: new URL('../../assets/carousel/pc-banner01.png', import.meta.url).href,
      alt: '당신의 길에 작은 힌트를 줄 책갈피',
      href: '#',
    },
    {
      title1: '흔들리는 청춘에 건네는',
      title2: '따뜻한 위로의 책갈피',
      subtitle: '불안한 일상속에서 <br class="line-break">책속의 한줄이 길이 되었다.',
      src: new URL('../../assets/carousel/pc-banner02.png', import.meta.url).href,
      alt: '흔들리는 청춘에 건네는 따뜻한 위로의 책갈피',
      href: '#',
    },
    {
      title1: '꿈을 향해 나아가는',
      title2: '용기의 한마디',
      subtitle: '책속의 주인공이 <br class="line-break">나를 다시 일으켜 세웠다.',
      src: new URL('../../assets/carousel/pc-banner03.png', import.meta.url).href,
      alt: '꿈을 향해 나아가는 용가의 책갈피',
      href: '#',
    },
  ];

  const slides = slideData.map(({ title1, title2, subtitle, src, alt, href }) => {
    const slide = document.createElement('li');
    slide.className = 'carousel-slide';

    const promotionText = document.createElement('strong');
    promotionText.className = 'promotion-text';
    promotionText.textContent = '지금 뜨는 북갈피';

    const textWrapper = document.createElement('div');
    textWrapper.className = 'slide-text-wrapper';

    const a = document.createElement('a');
    a.href = href;

    const span1 = document.createElement('span');
    span1.textContent = title1;

    const span2 = document.createElement('span');
    span2.textContent = title2;

    const p = document.createElement('p');
    p.innerHTML = subtitle;

    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;

    textWrapper.append(span1, span2, p);
    a.append(promotionText, textWrapper, img);
    slide.appendChild(a);

    return slide;
  });

  const buttonContainer = document.createElement('div');
  buttonContainer.className = 'carousel-btn-container';

  const prevBtn = document.createElement('button');
  const nextBtn = document.createElement('button');
  prevBtn.className = 'btn-carousel';
  nextBtn.className = 'btn-carousel';
  prevBtn.ariaLabel = '이전 탐색';
  nextBtn.ariaLabel = '다음 탐색';

  const prevArrow = document.createElement('img');
  const nextArrow = document.createElement('img');
  prevArrow.src = new URL('../../assets/icon/arrow-l.svg', import.meta.url).href;
  nextArrow.src = new URL('../../assets/icon/arrow-r.svg', import.meta.url).href;

  prevBtn.append(prevArrow);
  nextBtn.append(nextArrow);

  const indicatorBtns = Array.from({ length: slideData.length }, () =>
    Button({ color: 'indicator' })
  );
  // 인디케이터에 식별 가능한 이름 부여
  const nativeNums = ['첫', '두', '세', '네', '다섯', '여섯', '일곱', '여덟', '아홉', '열'];
  indicatorBtns.map((indicatorBtn, index) => {
    const numsText = nativeNums[index] || `${index + 1}`;
    indicatorBtn.ariaLabel = `${numsText} 번째 콘텐츠`;
  });

  const SELECTED_CLASS = 'is-selected';
  slides[0].classList.add(SELECTED_CLASS);
  indicatorBtns[0].classList.add(SELECTED_CLASS);

  let currentIndex = 0;
  // let isSliding = true
  let intervalId;
  const CAROUSEL_TRANSITION_DURATION = 3000;

  function slideMove(index) {
    slideWrapper.style.transform = `translateX(-${index * 100}%)`;
  }

  function updateSelected(index) {
    // if (isSliding) return
    // isSliding = false

    slides.forEach((slide) => slide.classList.remove(SELECTED_CLASS));
    indicatorBtns.forEach((btn) => btn.classList.remove(SELECTED_CLASS));

    slides[index].classList.add(SELECTED_CLASS);
    indicatorBtns[index].classList.add(SELECTED_CLASS);
    slideMove(index);
    tabIndex();
    currentIndex = index;

    // setTimeout(() => {
    // isSliding = false;
    // }, CAROUSEL_TRANSITION_DURATION);
  }

  function tabIndex() {
    for (const slide of slides) {
      if (slide.classList.contains(SELECTED_CLASS)) {
        slide.querySelector('a').removeAttribute('tabindex');
      } else {
        slide.querySelector('a').setAttribute('tabindex', '-1');
      }
    }
  }

  function startAutoSlide() {
    intervalId = setInterval(() => {
      const nextIndex = (currentIndex + 1) % slides.length;
      updateSelected(nextIndex);
    }, CAROUSEL_TRANSITION_DURATION);
  }

  function resetAutoSlide() {
    clearInterval(intervalId);
  }

  nextBtn.addEventListener('click', () => {
    const nextIndex = (currentIndex + 1) % slides.length;
    updateSelected(nextIndex);
    resetAutoSlide();
  });

  prevBtn.addEventListener('click', () => {
    const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSelected(prevIndex);
    resetAutoSlide();
  });

  buttonContainer.addEventListener('click', (e) => {
    if (e.target.matches('.btn-indicator')) {
      const index = indicatorBtns.indexOf(e.target);
      updateSelected(index);
      resetAutoSlide();
    }
  });

  // 마우스 올렸을 때 일시정지 / 벗어나면 다시 실행
  carousel.addEventListener('mouseenter', () => clearInterval(intervalId));
  carousel.addEventListener('mouseleave', startAutoSlide);

  slideWrapper.append(...slides);
  slideContainer.appendChild(slideWrapper);
  buttonContainer.append(prevBtn, ...indicatorBtns, nextBtn);
  carousel.append(slideContainer, buttonContainer);

  // 초기 상태에서 자동 슬라이드 시작
  setTimeout(startAutoSlide, 1000);

  return carousel;
}
