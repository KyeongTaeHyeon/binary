function loadHTML(selector, url) {
    fetch(url)
        .then((response) => response.text())
        .then((data) => {
            document.querySelector(selector).innerHTML = data;
        });
}

window.addEventListener('DOMContentLoaded', () => {
    loadHTML('#header', './includes/header.html');
    loadHTML('#footer', './includes/footer.html');
});
