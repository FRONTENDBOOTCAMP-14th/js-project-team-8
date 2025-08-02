// src/api/myShelfData.js
import { getAuthToken, redirectIfNotLoggedIn } from '../utils/auth';

/** 개인서랍 - 리뷰 목록 조회 */
export async function fetchReviewList() {
  const token = getAuthToken();
  if (!token) {
    redirectIfNotLoggedIn();
    throw new Error('토큰 없음');
  }

  const res = await fetch('https://server.bookmark.soop.run/reviews', {
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
    throw new Error(`리뷰 목록 불러오기 실패: ${res.status}`);
  }

  const data = await res.json();
  return data.totalReviews;
}

/** 개인서랍 - 리뷰 상세 조회 */
export async function fetchReviewDetail(isbn13) {
  const token = getAuthToken();
  if (!token) {
    redirectIfNotLoggedIn();
    throw new Error('토큰 없음');
  }

  const res = await fetch(`https://server.bookmark.soop.run/reviews/${isbn13}`, {
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
    throw new Error(`리뷰 상세 조회 실패: ${res.status}`);
  }

  return await res.json();
}
