/** 인증 토큰 반환 함수
 * - 토큰이 없을 시(비로그인) 빈 문자열 반환
 * - 자동로그인 ON: localStorage 토큰
 * - 자동로그인 OFF: sessionStorage 토큰
 */
const TOKEN_KEY = 'token';
export function getAuthToken() {
  return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY) || null;
}

/** 비로그인 상태 시 로그인 페이지로 리디렉션하는 함수 */
export function redirectIfNotLoggedIn() {
  const answer = confirm('로그인이 필요합니다. 로그인 페이지로 이동할까요?');
  const redirectUrl = answer
    ? '/src/pages/LoginAndSignUp/LoginAndSignUp.html'
    : '/src/pages/Community/Community.html';

  window.location.replace(redirectUrl);
}
