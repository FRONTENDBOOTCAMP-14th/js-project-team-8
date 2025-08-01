// 로그인
export async function login(email, password) {
  const response = await fetch('https://server.bookmark.soop.run/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
}

// 회원가입 인증번호 요청
export async function requestSignupAuth(email) {
  const response = await fetch('https://server.bookmark.soop.run/sign-up/auth', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  return response.json();
}

// 회원가입
export async function signup(email, password) {
  const response = await fetch('https://server.bookmark.soop.run/sign-up', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
}

// 닉네임 등록
export async function updateNickname(email, nickname) {
  const response = await fetch('https://server.bookmark.soop.run/update_user_nickname', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, nickname }),
  });
  return response.json();
}
