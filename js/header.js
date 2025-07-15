function initHeader() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const loginUserName = localStorage.getItem('loginUserName');

  const loggedOutEl = document.querySelector('.userLoggedOut');
  const loggedInEl = document.querySelector('.userLoggedIn');
  const loginUserNameSpan = document.getElementById('loginUserName');

  if (isLoggedIn && loginUserName) {
    // 로그인 상태
    if (loggedOutEl) loggedOutEl.classList.add('hide');
    if (loggedInEl) loggedInEl.classList.remove('hide');
    if (loginUserNameSpan) loginUserNameSpan.textContent = loginUserName;

    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('loginUserName');
        sessionStorage.clear();
        alert('로그아웃 되었습니다.');
        window.location.href = '../index.html';
      });
    }
  } else {
    // 비로그인 상태
    if (loggedOutEl) loggedOutEl.classList.remove('hide');
    if (loggedInEl) loggedInEl.classList.add('hide');
  }
}

// header의 search 관련 이벤트
function initSearch() {
  const searchInput = document.getElementById('search');
  const searchButton = document.getElementById('search-button');

  const goToSearchPage = () => {
    window.location.href = '../search/search.html';
  };

  if (searchInput) {
    searchInput.addEventListener('click', goToSearchPage);
  }

  if (searchButton) {
    searchButton.addEventListener('click', (e) => {
      e.preventDefault();
      goToSearchPage();
    });
  }
}
