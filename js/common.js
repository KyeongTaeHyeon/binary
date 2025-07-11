let depthCount = 0;

function loadHTML(selector, url) {
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
      if (depthCount === 0) {
        document.querySelector(selector).innerHTML = data;
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
        document.querySelector(selector).innerHTML = tempDiv.innerHTML;
      }
    });
}

window.addEventListener('DOMContentLoaded', () => {
  loadHTML('#header', './includes/header.html');
  loadHTML('#footer', './includes/footer.html');
});
