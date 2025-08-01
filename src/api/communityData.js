/** 커뮤니티 API 요청 */
export async function fetchCommunityData() {
  const res = await fetch('https://server.bookmark.soop.run/community')

  if (!res.ok) {
    throw new Error(`커뮤니티 데이터 요청 실패: ${res.status} ${res.statusText}`)
  }
   return await res.json()
   
}