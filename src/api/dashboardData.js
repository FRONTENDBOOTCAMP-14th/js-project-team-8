/** 대시보드 API 요청 */
export async function fetchDashboardData() {
  // TODO: 로그인 구현되면 아래 구문으로 교체
  // const token = localStorage.getItem('token');
  const token = '임시 토큰';

  if (!token) {
    const answer = confirm('로그인이 필요합니다. 로그인 페이지로 이동할까요?');

    const redirectUrl = answer
      ? '/src/pages/LoginAndSignUp/LoginAndSignUp.html'
      : '/src/pages/Community/Community.html';

    window.location.replace(redirectUrl);
    return;
  }

  const res = await fetch('https://server.bookmark.soop.run/dashboard', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error(`대시보드 데이터 요청 실패: ${res.status} ${res.statusText}`);
  }

  return await res.json();
}
