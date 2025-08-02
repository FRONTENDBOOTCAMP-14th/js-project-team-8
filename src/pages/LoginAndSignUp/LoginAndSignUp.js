import { login, requestSignupAuth, signup, updateNickname } from '../../api/loginAndSignupAuth.js';

// 비밀번호 토글 버튼 기능 (동적 생성 포함)
function setupPasswordToggles() {
  document.querySelectorAll('.password-toggle').forEach((btn) => {
    btn.addEventListener('click', () => {
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
    });
  });
}

setupPasswordToggles();

document.getElementById('login-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const keepLogin = document.getElementById('keep-login');
  login(email, password)
    .then((data) => {
      if (data.token) {
        if (keepLogin && keepLogin.checked) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('tokenSource', 'local');
          sessionStorage.removeItem('token');
          sessionStorage.removeItem('tokenSource');
        } else {
          sessionStorage.setItem('token', data.token);
          sessionStorage.setItem('tokenSource', 'session');
          localStorage.removeItem('token');
          localStorage.removeItem('tokenSource');
        }
        window.location.href = '/src/pages/Dashboard/Dashboard.html';
      } else {
        throw new Error(data.message || '로그인 실패');
      }
    })
    .catch((error) => {
      alert('네트워크 오류 : ' + error.message);
    });
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
  signupId.addEventListener('input', () => {
    if (!signupId.value) {
      showError(signupIdError, false);
    } else {
      showError(signupIdError, !validateEmail(signupId.value));
    }
  });
}

if (signupPassword) {
  signupPassword.addEventListener('input', () => {
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
  signupPasswordConfirm.addEventListener('input', () => {
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

let code = null;

if (signupForm && signupStepBtn) {
  signupStepBtn.addEventListener('click', () => {
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
      requestSignupAuth(signupId.value)
        .then((data) => {
          if (data.success) {
            code = data.code;
            signupCodeWrap.classList.remove('signup-code-hidden');
            signupCodeWrap.classList.add('signup-code-visible');
            signupStepBtn.textContent = '회원가입';
            signupStep = 2;
            console.log('인증번호 요청 응답:', data);
            console.log('인증번호 요청 성공:', code);
          } else {
            signupIdError.textContent = data.message;
            signupIdError.style.display = 'inline';
            signupId.focus();
            throw new Error(data.message || '인증번호 요청 실패');
          }
        })
        .catch((err) => {
          alert('네트워크 오류: ' + err.message);
        });
      startSignupTimer();
    } else if (signupStep === 2) {
      // 인증번호 요청 및 검증
      const signupCode = document.getElementById('signup-code');
      if (!signupCode.value) {
        signupCode.focus();
        return;
      }
      if (signupCode.value !== code) {
        if (signupCodeError) signupCodeError.style.display = 'inline';
        signupCode.focus();
        return;
      } else {
        if (signupCodeError) signupCodeError.style.display = 'none';
        if (timerInterval) clearInterval(timerInterval);
        const email = signupId.value;
        const password = signupPassword.value;
        signup(email, password)
          .then((data) => {
            if (!data.success) {
              throw new Error(data.message || '회원가입 실패');
            }
            if (nicknameModal) {
              nicknameModal.hidden = false;
              document.body.style.overflow = 'hidden';
            }
          })
          .catch((err) => {
            alert('네트워크 오류: ' + err.message);
          });
      }
    }
  });

  // 닉네임 모달 제출 이벤트
  const setNicknameModal = document.querySelector('.set-nickname-modal form');
  setNicknameModal.addEventListener('submit', (e) => {
    e.preventDefault();
    const nicknameInput = document.querySelector('.set-nickname-modal input');
    if (!nicknameInput.value) {
      alert('닉네임을 입력해주세요.');
      nicknameInput.focus();
      return;
    }
    updateNickname(signupId.value, nicknameInput.value)
      .then((data) => {
        if (!data.success) {
          throw new Error(data.message || '닉네임 설정 실패');
        }
        signupSection.hidden = true;
        loginSection.hidden = false;
        if (introSubtitle) introSubtitle.hidden = false;
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
        nicknameModal.hidden = true;
        alert('회원가입에 성공했어요. 가입한 이메일로 로그인해주세요!');
      })
      .catch((err) => {
        alert('네트워크 오류: ' + err.message);
      });
  });
}
