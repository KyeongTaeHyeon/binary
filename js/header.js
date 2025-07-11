window.addEventListener('load', () => {
  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
  const userEmail = sessionStorage.getItem('userEmail');

  const activeEl = document.querySelector('.active');
  const loginMypageEl = document.querySelector('.loginMypage');
  alert('userEmail');
  alert('userEmail' + userEmail);

  if (isLoggedIn && userEmail) {
    // 로그인 상태
    if (activeEl) activeEl.style.display = 'none';
    if (loginMypageEl) loginMypageEl.style.display = 'flex';

    // 로그아웃 버튼 기능 추가
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        sessionStorage.clear();
        alert('로그아웃 되었습니다.');
        window.location.reload(); // 또는 window.location.href = '../index.html';
      });
    }
  } else {
    // 비로그인 상태
    if (activeEl) activeEl.style.display = 'flex';
    if (loginMypageEl) loginMypageEl.style.display = 'none';
  }
});
