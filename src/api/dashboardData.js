import { getAuthToken, redirectIfNotLoggedIn } from '../utils/auth';

/** 대시보드 API 요청 */
export async function fetchDashboardData() {
  const token = getAuthToken();
  if (!token) {
    redirectIfNotLoggedIn();
    throw new Error('토큰 없음');
  }

  const res = await fetch('https://server.bookmark.soop.run/dashboard', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (res.status === 401) {
    alert('로그인 토큰이 만료되었습니다. 재로그인해주세요.');
    redirectIfNotLoggedIn();
    throw new Error('토큰 만료');
  }

  if (!res.ok) {
    throw new Error(`대시보드 데이터 요청 실패: ${res.status} ${res.statusText}`);
  }

  return await res.json();
}
