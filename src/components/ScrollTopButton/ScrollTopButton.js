import './ScrollTopButton.css'

export function ScrollTopButton() {
  const scrollBtn = document.createElement('button')
  scrollBtn.classList.add('scroll-top-btn', 'opaque') // 처음엔 불투명
  scrollBtn.setAttribute('aria-label', '맨 위로 이동')

  const arrowTop = document.createElement('img')
  arrowTop.src = new URL('../../assets/icon/arrow-t.svg', import.meta.url).href
  arrowTop.alt = ''
  
  scrollBtn.appendChild(arrowTop)

  let lastScrollY = window.scrollY;
  document.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY
  const isScrollingDown = currentScrollY > lastScrollY;

  if (isScrollingDown && !scrollBtn.classList.contains('transparent')) {
    scrollBtn.classList.replace('opaque', 'transparent')
  } else if (!isScrollingDown && !scrollBtn.classList.contains('opaque')) {
    scrollBtn.classList.replace('transparent', 'opaque')
  }

  lastScrollY = currentScrollY;
})

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  return scrollBtn;
}
