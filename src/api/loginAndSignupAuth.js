// 로그인
export const login = async (email, password) => {
  const response = await fetch('https://server.bookmark.soop.run/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
};

// 회원가입 인증번호 요청
export const requestSignupAuth = async (email) => {
  const response = await fetch('https://server.bookmark.soop.run/sign-up/auth', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  return response.json();
};

// 회원가입
export const signup = async (email, password) => {
  const response = await fetch('https://server.bookmark.soop.run/sign-up', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
};

// 닉네임 등록
export const updateNickname = async (email, nickname) => {
  const response = await fetch('https://server.bookmark.soop.run/update_user_nickname', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, nickname }),
  });
  return response.json();
};
