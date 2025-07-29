/** 대시보드 API 요청 */
export async function fetchDashboardData() {
  const token = localStorage.getItem('token');
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
