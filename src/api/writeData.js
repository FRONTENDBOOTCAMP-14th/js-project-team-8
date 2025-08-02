import { getAuthToken, redirectIfNotLoggedIn } from '../utils/auth';

/** 글쓰기 페이지 - 책 목록 API 요청 */
export async function fetchBookData() {
  const token = getAuthToken();
  if (!token) {
    redirectIfNotLoggedIn();
    throw new Error('토큰 없음');
  }

  const res = await fetch('https://server.bookmark.soop.run/write/booklist', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 401) {
    alert('로그인 토큰이 만료되었습니다. 재로그인해주세요.');
    redirectIfNotLoggedIn();
    throw new Error('토큰 만료');
  }

  if (!res.ok) {
    throw new Error(`책 목록 데이터 요청 실패: ${res.status} ${res.statusText}`);
  }

  return await res.json();
}

/** 글쓰기 페이지 - 책 디테일 API 요청 */
export async function fetchBookDetail(isbn13 = '') {
  const token = getAuthToken();
  if (!token) {
    redirectIfNotLoggedIn();
    throw new Error('토큰 없음');
  }

  const res = await fetch(`https://server.bookmark.soop.run/write/booklist/${isbn13}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 401) {
    alert('로그인 토큰이 만료되었습니다. 재로그인해주세요.');
    redirectIfNotLoggedIn();
    throw new Error('토큰 만료');
  }

  if (!res.ok) {
    throw new Error(`책 목록 데이터 요청 실패: ${res.status} ${res.statusText}`);
  }

  return await res.json();
}

/** 글쓰기 페이지 - 리뷰 업로드 API 요청 */
export async function postReview(review) {
  const token = getAuthToken();
  if (!token) {
    redirectIfNotLoggedIn();
    throw new Error('토큰 없음');
  }

  const res = await fetch(`https://server.bookmark.soop.run/write/reviews/write`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: review.title,
      imageUrl: review.ImageUrl,
      oneLineDescription: review.oneLineDescription,
      detailDescription: review.detailDescription,
      rate: review.rate,
      currentPage: review.currentPage,
      totalPage: review.totalPage,
      date: review.date,
      public: review.public,
      isbn13: review.isbn13,
    }),
  });

  if (res.status === 401) {
    alert('로그인 토큰이 만료되었습니다. 재로그인해주세요.');
    redirectIfNotLoggedIn();
    throw new Error('토큰 만료');
  }

  if (!res.ok) {
    throw new Error(`리뷰 업로드 실패: ${res.status} ${res.statusText}`);
  }

  return await res.json();
}
