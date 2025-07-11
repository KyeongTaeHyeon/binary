import { LoadData } from './utils.js';
let contentsList = [];
const tabBtns = document.getElementById('tabLists');
const contentsWrapper = document.getElementById('contentsWrapper');

/* 유래내용 불러오도록 설정 */
document.addEventListener('DOMContentLoaded', () => {
    LoadData('../data/origin.json').then((data) => {
        contentsList = data;
        showTabButtons();
        showTabContents();
    });
});

let showTabButtons = () => {
    // 유래 내용별 버튼 생성
    let idList = [];
    const buttonList = contentsList
        .map((content) => {
            if (!idList.includes(content.id)) {
                idList.push(content.id);
                if (idList.length == 1) {
                    return `<button class="tabBtn active" data-tab="tab${content.id}">${content.header}</button>`;
                } else {
                    return `<button class="tabBtn" data-tab="tab${content.id}">${content.header}</button>`;
                }
            }
        })
        .filter(Boolean);

    tabBtns.innerHTML = buttonList.join('');

    // 버튼별 내용 표현 관련 이벤트 추가
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
};

let showTabContents = () => {
    // 유래내용 표현부분 관련 생성
    contentsWrapper.innerHTML = ''; // Clear existing content
    if (contentsList.length === 0) {
        contentsWrapper.innerHTML = '<p>No content available.</p>';
        return;
    }

    let idList = [];
    contentsList.forEach((content) => {
        if (idList.includes(content.id)) {
            const existingContent = document.getElementById(`tab${content.id}`);
            existingContent.innerHTML += `
                <h2>${content.title}</h2>
                <ul>
                    ${content.description
                        .map((desc) => `<li>${desc}</li>`)
                        .join('')}
                </ul>
            `;
        } else {
            const tabContent = document.createElement('div');
            tabContent.id = `tab${content.id}`;
            tabContent.className = 'tabContent';
            if (content.id === 1) {
                tabContent.classList.add('active');
            }
            idList.push(content.id);
            tabContent.innerHTML = `
            <h2>${content.title}</h2>
            <ul>
                ${content.description
                    .map((desc) => `<li>${desc}</li>`)
                    .join('')}
            </ul>
        `;
        }
    });
};
