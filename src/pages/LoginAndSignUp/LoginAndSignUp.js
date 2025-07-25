// import { Modal } from '../../components/Modal/Modal';

// 비밀번호 토글 버튼 기능 (동적 생성 포함)
function setupPasswordToggles() {
  document.querySelectorAll('.password-toggle').forEach(function (btn) {
    btn.onclick = function () {
      const targetId = btn.getAttribute('data-target');
      const input = document.getElementById(targetId);
      if (!input) return;
      if (input.type === 'password') {
        input.type = 'text';
        btn.classList.add('on');
      } else {
        input.type = 'password';
        btn.classList.remove('on');
      }
    };
  });
}
setupPasswordToggles();
document.getElementById('login-form').addEventListener('submit', async function (e) {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  try {
    // 실제 API 주소로 변경 필요
    const response = await fetch('https://your-api-url.com/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (response.ok) {
      alert('로그인 성공!');
      // 토큰 저장, 페이지 이동 등 추가 작업
    } else {
      alert(data.message || '로그인 실패');
    }
  } catch (error) {
    alert('네트워크 오류 : ' + error.message);
  }
});

// 회원가입 폼/로그인 폼 전환
const loginSection = document.getElementById('login-section');
const signupSection = document.getElementById('signup-section');
const showSignupBtn = document.getElementById('show-signup');
const introSubtitle = document.querySelector('.intro-subtitle');

const introTitle = document.querySelector('.intro-title');
let introTitleOriginHTML = '';
if (introTitle) {
  introTitleOriginHTML = introTitle.innerHTML;
}

if (showSignupBtn) {
  showSignupBtn.addEventListener('click', function () {
    loginSection.hidden = true;
    signupSection.hidden = false;
    introSubtitle.hidden = true;
    if (introTitle) {
      introTitle.innerHTML = '<p>반갑습니다!</p><p>회원가입을 진행할게요.</p>';
    }
  });
}

// --- 회원가입 인풋 유효성 검사 ---
const signupId = document.getElementById('signup-id');
const signupPassword = document.getElementById('signup-password');
const signupPasswordConfirm = document.getElementById('signup-password-confirm');
const signupIdError = document.getElementById('signup-id-error');
const signupPasswordError = document.getElementById('signup-password-error');
const signupPasswordConfirmError = document.getElementById('signup-password-confirm-error');

function validateEmail(email) {
  // Simple email regex
  return /^[\w-.]+@[\w-]+\.[a-zA-Z]{2,}$/.test(email);
}

function showError(el, show) {
  if (!el) return;
  el.style.display = show ? 'inline' : 'none';
}

if (signupId) {
  signupId.addEventListener('input', function () {
    if (!signupId.value) {
      showError(signupIdError, false);
    } else {
      showError(signupIdError, !validateEmail(signupId.value));
    }
  });
}

if (signupPassword) {
  signupPassword.addEventListener('input', function () {
    if (!signupPassword.value) {
      showError(signupPasswordError, false);
    } else {
      showError(signupPasswordError, signupPassword.value.length < 8);
    }
    // 비밀번호 확인도 같이 체크
    if (signupPasswordConfirm && signupPasswordConfirm.value) {
      showError(signupPasswordConfirmError, signupPassword.value !== signupPasswordConfirm.value);
    }
  });
}

if (signupPasswordConfirm) {
  signupPasswordConfirm.addEventListener('input', function () {
    if (!signupPasswordConfirm.value) {
      showError(signupPasswordConfirmError, false);
    } else {
      showError(signupPasswordConfirmError, signupPassword.value !== signupPasswordConfirm.value);
    }
  });
}

// 회원가입 2단계 폼 로직
const signupForm = document.getElementById('signup-form');
const signupStepBtn = document.getElementById('signup-step-btn');
const signupCodeWrap = document.getElementById('signup-code-wrap');
const signupCodeError = document.getElementById('signup-code-error');
const nicknameModal = document.querySelector('.set-nickname-modal');
// let nicknameMessage = null;

let signupStep = 1; // 1: 인증요청, 2: 인증번호 입력 및 회원가입

let timerInterval = null;
let timerSeconds = 300;
const signupTimer = document.getElementById('signup-timer');

function startSignupTimer() {
  timerSeconds = 300;
  updateSignupTimer();
  if (timerInterval) clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timerSeconds--;
    updateSignupTimer();
    if (timerSeconds <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      // 타임아웃: 1단계로 리셋
      resetSignupStep();
    }
  }, 1000);
}

function updateSignupTimer() {
  if (signupTimer) {
    const min = String(Math.floor(timerSeconds / 60)).padStart(2, '0');
    const sec = String(timerSeconds % 60).padStart(2, '0');
    signupTimer.textContent = `${min}:${sec}`;
  }
}

function resetSignupStep() {
  signupSection.hidden = false;
  loginSection.hidden = true;
  if (introSubtitle) introSubtitle.hidden = true;
  signupCodeWrap.classList.remove('signup-code-visible');
  signupCodeWrap.classList.add('signup-code-hidden');
  signupStepBtn.textContent = '인증 요청';
  signupStep = 1;
  if (signupForm) signupForm.reset();
  if (introTitle && introTitleOriginHTML) {
    introTitle.innerHTML = '<p>반갑습니다!</p><p>회원가입을 진행할게요.</p>';
  }
  if (signupTimer) signupTimer.textContent = '05:00';
}

if (signupForm && signupStepBtn) {
  signupStepBtn.addEventListener('click', function () {
    if (signupStep === 1) {
      // 1단계: 인증 요청
      let hasError = false;
      if (!signupId.value || !validateEmail(signupId.value)) {
        showError(signupIdError, true);
        hasError = true;
      }
      if (!signupPassword.value || signupPassword.value.length < 8) {
        showError(signupPasswordError, true);
        hasError = true;
      }
      if (!signupPasswordConfirm.value || signupPassword.value !== signupPasswordConfirm.value) {
        showError(signupPasswordConfirmError, true);
        hasError = true;
      }
      if (hasError) return;
      // 인증번호 입력창 보여주고 버튼 텍스트 변경
      signupCodeWrap.classList.remove('signup-code-hidden');
      signupCodeWrap.classList.add('signup-code-visible');
      signupStepBtn.textContent = '회원가입';
      signupStep = 2;
      startSignupTimer();
      // 실제로는 여기서 인증번호 요청 API 호출 필요
    } else if (signupStep === 2) {
      // 2단계: 회원가입
      const signupCode = document.getElementById('signup-code');
      if (!signupCode.value) {
        signupCode.focus();
        return;
      }
      // 인증번호 검증 (예시: 실제로는 서버에서 검증)
      // 예시: 올바른 인증번호는 '123456'로 가정
      const correctCode = '123456';
      if (signupCode.value !== correctCode) {
        if (signupCodeError) signupCodeError.style.display = 'inline';
        signupCode.focus();
        return;
      } else {
        if (signupCodeError) signupCodeError.style.display = 'none';
      }
      // 실제 회원가입 API 호출 및 처리 필요
      if (timerInterval) clearInterval(timerInterval);
      // 테스트용: 바로 닉네임 모달 띄우기
      if (nicknameModal) {
        nicknameModal.hidden = false;
        document.body.style.overflow = 'hidden';
        console.log('회원가입 성공! 닉네임 설정 모달을 띄웁니다.');
      }
      /*
      // 실제 API 호출 코드
      const email = signupId.value;
      const password = signupPassword.value;
      fetch('/sign-up', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
        .then(async (res) => {
          if (!res.ok) {
            const data = await res.json();
            alert(data.message || '회원가입 실패');
            return;
          }
          // 성공 시 닉네임 모달 띄우기
          if (nicknameModal) {
            nicknameModal.hidden = false;
            document.body.style.overflow = 'hidden';
          }
        })
        .catch((err) => {
          alert('네트워크 오류: ' + err.message);
        });
      */
    }
  });

  // 로그인으로 돌아가기 버튼 이벤트 (폼 내부에 있을 수 있음)
  signupForm.addEventListener('click', function (e) {
    if (e.target && e.target.id === 'show-login') {
      signupSection.hidden = true;
      loginSection.hidden = false;
      if (introSubtitle) introSubtitle.hidden = false;
      // 상태 초기화
      if (timerInterval) clearInterval(timerInterval);
      signupCodeWrap.classList.remove('signup-code-visible');
      signupCodeWrap.classList.add('signup-code-hidden');
      signupStepBtn.textContent = '인증 요청';
      signupStep = 1;
      if (signupForm) signupForm.reset();
      if (introTitle && introTitleOriginHTML) {
        introTitle.innerHTML = introTitleOriginHTML;
      }
      if (signupTimer) signupTimer.textContent = '05:00';
    }
  });
}
