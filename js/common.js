let depthCount = 0;


function loadHTML(selector, url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.text();
        } else {
          return fetch('../' + url.replace('./', '')).then((response2) => {
            if (response2.ok) {
              depthCount = 1;
              return response2.text();
            } else {
              throw new Error('Network response was not ok');
            }
          });
        }
      })
      .then((data) => {
        const container = document.querySelector(selector);

        if (depthCount === 0) {
          container.innerHTML = data;
        } else {
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = data;

          const imgs = tempDiv.querySelectorAll('img');
          imgs.forEach((img) => {
            let src = img.getAttribute('src');
            if (src.startsWith('./')) {
              src = src.replace('./', '../'.repeat(depthCount));
            } else if (src.startsWith('/')) {
              src = src.replace('/', '../'.repeat(depthCount));
            } else if (src.startsWith('img')) {
              src = src.replace('img', '../'.repeat(depthCount) + 'img');
            }
            img.setAttribute('src', src);
          });

          container.innerHTML = tempDiv.innerHTML;
        }

        resolve(); // HTML 삽입 완료
      })
      .catch((err) => {
        console.error(`Failed to load ${url}:`, err);
        reject(err);
      });
  });
}

/**
 * JS 파일을 동적으로 로드 후 콜백 실행
 */
function loadScript(url) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Script load error: ${url}`));
    document.head.appendChild(script);
  });
}

window.addEventListener('DOMContentLoaded', () => {
  // header 삽입 → header.js 로드 → initHeader 실행
  loadHTML('#header', './includes/header.html')
    .then(() => loadScript('../js/header.js'))
    .then(() => {
      if (typeof initHeader === 'function') {
        initHeader();
      }
    });

  // footer는 별도 처리
  loadHTML('#footer', './includes/footer.html');
});
