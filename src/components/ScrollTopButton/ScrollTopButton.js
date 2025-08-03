import './ScrollTopButton.css'

export function ScrollTopButton() {
  const scrollBtn = document.createElement('button')
  scrollBtn.classList.add('scroll-top-btn', 'opaque') // 처음엔 불투명
  scrollBtn.setAttribute('aria-label', '맨 위로 이동')

  const arrowTop = document.createElement('img')
  arrowTop.src = new URL('../../assets/icon/arrow-t.svg', import.meta.url).href
  arrowTop.alt = ''
  
  scrollBtn.appendChild(arrowTop)

  const scrollArea = document.querySelector('.community-container');
  let lastScrollY = scrollArea.scrollTop;

  scrollArea.addEventListener('scroll', () => {
    const currentScrollY = scrollArea.scrollTop
    const isScrollingDown = currentScrollY > lastScrollY;

    if (isScrollingDown && !scrollBtn.classList.contains('transparent')) {
      scrollBtn.classList.replace('opaque', 'transparent')
    } else if (!isScrollingDown && !scrollBtn.classList.contains('opaque')) {
      scrollBtn.classList.replace('transparent', 'opaque')
    }

    lastScrollY = currentScrollY;

  })

  scrollBtn.addEventListener('click', () => {
    scrollArea.scrollTo({ top: 0, behavior: 'smooth' });
  });
  return scrollBtn;
}
