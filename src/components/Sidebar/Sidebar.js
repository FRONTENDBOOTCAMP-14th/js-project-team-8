import './Sidebar.css';
import logo from '../../assets/icon/logo.svg';
import { authState, setAuthState } from '../../utils/auth';

export function Sidebar({ selectedIndex = 0 }) {
  const sidebarItems = [
    {
      href: '/src/pages/Dashboard/Dashboard.html',
      svg: `<svg
              width="14"
              height="16"
              viewBox="0 0 14 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.38086 10.7146V15.4285H5.61914V10.7146H8.38086ZM7 0.144287C8.05686 0.144354 8.94424 0.904528 10.7188 2.42554L11.6709 3.24194C12.6525 4.08334 13.1438 4.50385 13.4053 5.07202C13.6667 5.64034 13.667 6.28771 13.667 7.58081V11.6189C13.667 13.4147 13.6663 14.313 13.1084 14.8708C12.6076 15.3714 11.8328 15.4193 10.3809 15.4246V10.6667C10.3807 9.58868 9.50677 8.71475 8.42871 8.7146H5.57129C4.4932 8.71473 3.61927 9.58866 3.61914 10.6667V15.4246C2.16673 15.4193 1.39144 15.3717 0.890625 14.8708C0.332798 14.313 0.333008 13.4146 0.333008 11.6189V7.58081C0.333008 6.28771 0.333335 5.64034 0.594727 5.07202C0.856165 4.5039 1.34754 4.08329 2.3291 3.24194L3.28125 2.42554C5.05578 0.904511 5.94309 0.144287 7 0.144287Z"
                fill="currentColor"
              />
            </svg>`,
      alt: '홈',
    },
    {
      href: '/src/pages/MyShelf/MyShelf.html',
      svg: `<svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.8574 9.85742C13.8574 11.7429 13.8572 12.6857 13.2715 13.2715C12.6857 13.8572 11.7429 13.8574 9.85742 13.8574H4.14258C2.25708 13.8574 1.31429 13.8572 0.728516 13.2715C0.142749 12.6857 0.142578 11.7429 0.142578 9.85742V6.62891H4.07422V9.68164C4.07422 10.3664 4.07365 10.7095 4.16113 10.8936C4.35652 11.3041 4.82603 11.5003 5.25098 11.3496C5.44134 11.282 5.68012 11.0396 6.1582 10.5557C6.37965 10.3315 6.49068 10.2193 6.6084 10.1562C6.86698 10.0178 7.17693 10.0179 7.43555 10.1562C7.55329 10.2193 7.66433 10.3315 7.88574 10.5557C8.36409 11.0399 8.60353 11.2821 8.79395 11.3496C9.2188 11.5002 9.68738 11.304 9.88281 10.8936C9.9703 10.7095 9.9707 10.3664 9.9707 9.68164V6.62891H13.8574V9.85742ZM9.55273 0.142578C10.4065 0.142578 10.8335 0.142976 11.2139 0.307617C11.5943 0.472429 11.8866 0.78422 12.4707 1.40723L12.7754 1.73145C13.3098 2.30145 13.5767 2.58702 13.7168 2.94141C13.8569 3.29577 13.8574 3.6865 13.8574 4.46777V4.62891H0.142578V4.46777C0.142578 3.68646 0.14307 3.29579 0.283203 2.94141C0.423347 2.58702 0.690221 2.30145 1.22461 1.73145L1.5293 1.40723C2.11318 0.784425 2.40488 0.472453 2.78516 0.307617C3.1656 0.142799 3.59322 0.142578 4.44727 0.142578H9.55273Z"
                fill="currentColor"
              />
            </svg>`,
      alt: '내 서랍',
    },
    {
      href: '/src/pages/Community/Community.html',
      svg: `<svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.9126 0.142822C9.46973 0.142822 10.249 0.14286 10.8765 0.356689C12.0502 0.756785 12.9715 1.679 13.3716 2.85278C13.5854 3.48021 13.5854 4.25863 13.5854 5.81567C13.5854 7.37273 13.5854 8.15113 13.3716 8.77856C12.9715 9.95235 12.0502 10.8746 10.8765 11.2747C10.249 11.4885 9.46972 11.4885 7.9126 11.4885H3.56885C3.28951 11.4885 3.02282 11.6054 2.8335 11.8108L1.87842 12.8469C1.26125 13.5166 0.143066 13.0799 0.143066 12.1692V6.54321C0.143066 4.30301 0.142646 3.18206 0.578613 2.32642C0.962078 1.57392 1.57417 0.961839 2.32666 0.578369C3.1823 0.142397 4.30327 0.142822 6.54346 0.142822H7.9126ZM4.62451 6.43579C4.07246 6.43579 3.62488 6.88382 3.62451 7.43579C3.62451 7.98808 4.07223 8.43579 4.62451 8.43579H6.86475C7.41684 8.43557 7.86475 7.98794 7.86475 7.43579C7.86438 6.88396 7.41662 6.43601 6.86475 6.43579H4.62451ZM4.62451 3.19458C4.07232 3.19458 3.62466 3.64242 3.62451 4.19458C3.62451 4.74686 4.07223 5.19458 4.62451 5.19458H9.10498C9.65708 5.19436 10.105 4.74673 10.105 4.19458C10.1048 3.64256 9.65699 3.1948 9.10498 3.19458H4.62451Z"
                fill="currentColor"
              />
            </svg>`,
      alt: '커뮤니티',
    },
  ];
  const loginItems = {
    true: {
      href: '#',
      svg: `
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 1.5C12.803 1.5 15.9426 4.33079 16.4316 8H9.91406L11.957 5.95703L10.543 4.54297L6.08594 9L10.543 13.457L11.957 12.043L9.91406 10H16.4316C15.9426 13.6692 12.803 16.5 9 16.5C4.85786 16.5 1.5 13.1421 1.5 9C1.5 4.85786 4.85786 1.5 9 1.5Z" fill="currentColor"/>
      </svg>
      `,
      alt: '로그아웃하기',
    },
    false: {
      href: '/src/pages/LoginAndSignUp/LoginAndSignUp.html',
      svg: `
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.99951 1.5C13.1416 1.5 16.4995 4.85786 16.4995 9C16.4995 13.1421 13.1416 16.5 8.99951 16.5C5.19671 16.4998 2.05685 13.6691 1.56787 10H8.08545L6.04248 12.043L7.45654 13.457L11.9136 9L7.45654 4.54297L6.04248 5.95703L8.08545 8H1.56787C2.05685 4.3309 5.19671 1.50021 8.99951 1.5Z" fill="currentColor"/>
      </svg>
      `,
      alt: '로그인하기',
    },
  };
  const sidebarButtons = [];
  let clickedIndex = selectedIndex;

  const sidebar = document.createElement('nav');
  const sidebarContainer = document.createElement('div');
  const sidebarLogo = document.createElement('a');

  sidebar.className = 'sidebar';

  sidebarLogo.className = 'sidebar-logo';
  sidebarLogo.href = '/src/pages/Dashboard/Dashboard.html';
  sidebarLogo.innerHTML = `
    <h1>
      <img src="${logo}" alt="책갈피 홈으로" draggable="false"/>
    </h1>
  `;

  sidebar.append(sidebarLogo);

  for (let i = 0; i < sidebarItems.length; i++) {
    const sidebarButton = document.createElement('a');
    const sidebarIcon = document.createElement('div');

    sidebarButton.className = 'sidebar-btn';
    sidebarButton.href = sidebarItems[i].href;
    sidebarButton.setAttribute('aria-label', sidebarItems[i].alt);
    sidebarButton.dataset.index = i;

    sidebarIcon.className = 'sidebar-icon';
    sidebarIcon.innerHTML = sidebarItems[i].svg.replace(
      /<svg/,
      '<svg aria-hidden="true" focusable="false"'
    );

    sidebarButtons.push(sidebarButton);
    sidebarButton.append(sidebarIcon);
    sidebarContainer.append(sidebarButton);

    if (clickedIndex === i) {
      sidebarButton.classList.add('active');
    }
  }

  const loginButton = document.createElement('a');
  const loginIcon = document.createElement('div');

  loginButton.className = 'sidebar-btn';
  loginIcon.className = 'sidebar-icon';

  function setLoginButton(state) {
    loginIcon.innerHTML = loginItems[state].svg.replace(
      /<svg/,
      '<svg aria-hidden="true" focusable="false"'
    );
    loginButton.href = loginItems[state].href;
    loginButton.setAttribute('aria-label', loginItems[state].alt);
  }

  setLoginButton(authState.isLoggedIn);

  if (authState.isLoggedIn) {
    loginButton.addEventListener('click', (e) => {
      const answer = confirm('로그아웃 하시겠습니까?');
      e.preventDefault();

      if (!answer) {
        return;
      }

      authState.isLoggedIn = false;
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');

      setAuthState(false);
      setLoginButton(false);

      window.location.href = '/src/pages/Community/Community.html';
    });
  }

  loginButton.append(loginIcon);

  sidebar.append(sidebarContainer);
  sidebar.append(loginButton);

  sidebarContainer.addEventListener('click', (e) => {
    const target = e.target.closest('.sidebar-btn');
    if (!target) return;

    clickedIndex = target.dataset.index;

    sidebarButtons.forEach((el) => el.classList.remove('active'));
    target.classList.add('active');
  });

  const hamburgerButton = document.createElement('button');
  hamburgerButton.className = 'hamburger';
  hamburgerButton.innerHTML = `
    <div class="hamburger-icon">
      <svg width="28" height="20" viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.33325 18.3333H25.6666M2.33325 9.99999H25.6666M2.33325 1.66666H25.6666" stroke="#131314" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    <div>
  `;
  hamburgerButton.addEventListener('click', () => {
    sidebar.classList.toggle('isOpen');

    if (sidebar.classList.contains('isOpen')) {
      hamburgerButton.style.left = '88px';
      hamburgerButton.style.transitionDelay = '0s';
    } else {
      hamburgerButton.style.left = '24px';
      hamburgerButton.style.transitionDelay = '0.3s';
    }
  });

  sidebar.append(hamburgerButton);

  return sidebar;
}
