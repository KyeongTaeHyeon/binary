import { LoadData } from './utils.js';

let newsList = [];

LoadData('../data/news.json').then((data) => {
    newsList = data;
    // 여기서 newsList 활용
    showNewList();
});

let showNewList = () => {
    /** @type {HTMLTemplateElement} */
    const newsTemplate = document.getElementById('newsTemplate');
    const newsContainer = document.getElementById('postNumber');
    console.log(newsList);
    newsList.forEach((news) => {
        const newsItem = newsTemplate.content.firstElementChild.cloneNode(true);
        console.log(newsItem);
        newsItem.href = news.links || '../index.html'; // 링크가 없으면 기본값으로 '#'
        const newsName = newsItem.querySelector('.name');
        newsName.textContent = news.title || 'No Title'; // 제목이 없으면 '
        newsContainer.appendChild(newsItem);
    });
};

LoadData('../data/news.json');
