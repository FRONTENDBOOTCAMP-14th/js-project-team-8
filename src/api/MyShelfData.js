// src/api/myShelfData.js
import { getAuthToken } from '../utils/auth';

/** 개인서랍 - 리뷰 목록 조회 */
export async function fetchReviewList() {
  const token = getAuthToken();
  console.log('[fetchReviewList] 사용 토큰:', token);

  const res = await fetch('https://server.bookmark.soop.run/reviews', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error(`리뷰 목록 불러오기 실패: ${res.status}`);
  }

  const data = await res.json();
  return data.totalReviews;
}

/** 개인서랍 - 리뷰 상세 조회 */
export async function fetchReviewDetail(isbn13) {
  const token = getAuthToken();

  const res = await fetch(`https://server.bookmark.soop.run/reviews/${isbn13}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error(`리뷰 상세 조회 실패: ${res.status}`);
  }

  return await res.json();
}
