document.querySelectorAll('.tabBtn').forEach((btn) => {
    btn.addEventListener('click', function () {
        document
            .querySelectorAll('.tabBtn')
            .forEach((b) => b.classList.remove('active'));
        document
            .querySelectorAll('.tabContent')
            .forEach((c) => c.classList.remove('active'));
        this.classList.add('active');
        document.getElementById(this.dataset.tab).classList.add('active');
    });
});
