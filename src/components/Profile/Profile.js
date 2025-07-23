import './Profile.css';

export function Profile({ imageUrl = null }) {
  const img = document.createElement('img');
  img.className = 'profile-image';
  img.src = imageUrl;
  img.alt = '사용자 프로필 이미지';

  return img;
}
