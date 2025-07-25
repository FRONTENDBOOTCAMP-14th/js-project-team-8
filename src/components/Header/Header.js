import './Header.css';

export function Header({ isLoggedIn = false }) {
  const header = document.createElement('header');
  header.className = 'header';

  header.innerHTML = `
    <div class="header-left">
      <img src="/src/assets/icon/logo.svg" alt="로고" class="logo" />
    </div>
    <div class="header-right"></div>
  `;

  const logo = header.querySelector('.logo');
  logo.addEventListener('click', () => {
    const targetLink = isLoggedIn ? '#home' : '#community';
    window.location.href = targetLink;
  });

  const headerRight = header.querySelector('.header-right');

  if (isLoggedIn) {
    const profile = document.createElement('img');
    profile.src = '#';
    profile.alt = '프로필';
    profile.className = 'profile-img';

    profile.addEventListener('click', () => {
      const shouldLogout = confirm('로그아웃하시겠습니까?');

      if (shouldLogout) {
        console.log('로그아웃합니다.');
      } else {
        console.log('로그아웃 취소됨');
      }
    });

    headerRight.appendChild(profile);
  } else {
    const loginBtn = document.createElement('button');
    loginBtn.textContent = '로그인';
    loginBtn.className = 'login-btn';
    headerRight.appendChild(loginBtn);
  }

  return header;
}
