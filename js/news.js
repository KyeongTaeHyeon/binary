import { LoadData } from "./utils.js";

let newsList = [];
let currentFilter = "all"; // 기본 필터는 'all'
let currentPage = 1; // 현재 페이지 번호
const itemsPerPage = 5; // 한 페이지에 표시할 항목 수

LoadData("../data/news.json").then((data) => {
    newsList = data;
    showNewList();
    setupFilterEvents(); // newsList 로드 후 필터 이벤트 설정
});

let showNewList = () => {
    /** @type {HTMLTemplateElement} */
    const newsTemplate = document.getElementById("newsTemplate");
    const newsContainer = document.getElementById("postNumber");
    newsContainer.innerHTML = ""; // 기존 목록을 지우고 다시 렌더링

    // news.js 파일의 showNewList 함수 내
    // const filteredNews = newsList.filter(news => { ... }); 이 부분을 수정합니다.

    const filteredNews = newsList.filter((news) => {
        if (currentFilter === "all") {
            return true; // '전체' 필터일 때는 모든 뉴스 반환
        } else if (currentFilter === "issue") {
            return news.tags === "issue"; // '라면 관련 이슈' 필터일 때는 'issue' 태그만 반환
        } else if (currentFilter === "years") {
            // '올해의 라멘' 필터일 때는 'years' 태그만 반환
            return news.tags === "years"; // <-- 이 부분을 이렇게 수정해야 합니다.
        }
        return false; // 그 외의 경우는 반환하지 않음 (이 부분은 사실상 도달하지 않을 수 있음)
    });

    // 현재 페이지에 해당하는 뉴스만 슬라이스
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedNews = filteredNews.slice(startIndex, endIndex);

    paginatedNews.forEach((news, index) => {
        // index를 사용하여 페이지 내 순번 계산
        const newsItem = newsTemplate.content.firstElementChild.cloneNode(true);
        newsItem.href = news.links || "../index.html"; // 링크가 없으면 기본값으로 '../index.html'

        const newsNameDiv = newsItem.querySelector(".name");
        newsNameDiv.innerHTML = ""; // 기존 .name div의 내용을 모두 지우기

        // 필터에 따라 표시할 ID 또는 순번 결정
        let displayId;
        if (currentFilter === "all") {
            displayId = news.id; // '전체'일 때는 원본 ID 사용
        } else {
            displayId = startIndex + index + 1; // 필터링된 목록 내에서의 순번
        }

        // 1. ID span 생성 및 추가
        const newsId = document.createElement("span");
        newsId.textContent = `${displayId}. `; // ID 뒤에 점과 공백 추가
        newsId.classList.add("news-id");
        newsNameDiv.appendChild(newsId);

        // 2. 새로운 tag-box 요소 생성 및 텍스트 설정
        const tagBox = document.createElement("div");
        tagBox.classList.add("tag-box");
        if (news.tags === "issue") {
            tagBox.textContent = "이슈";
        } else if (news.tags === "years") {
            tagBox.textContent = "올해의 라멘";
            tagBox.classList.add("tag-box-years");
        } else {
            tagBox.textContent = news.tags || "정보"; // 기타 태그는 그대로 표시
        }
        newsNameDiv.appendChild(tagBox);

        // 3. 제목 span 생성 및 추가
        const newsTitle = document.createElement("span");
        newsTitle.textContent = news.title || "No Title"; // 제목이 없으면 'No Title'
        newsTitle.classList.add("title-text");
        newsNameDiv.appendChild(newsTitle);

        newsContainer.appendChild(newsItem);
    });

    // 페이지네이션 버튼 렌더링
    renderPaginationButtons(filteredNews.length);
};

// 페이지네이션 버튼 렌더링 함수
let renderPaginationButtons = (totalItems) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const paginationList = document.querySelector(".page-list");
    paginationList.innerHTML = ""; // 기존 페이지 버튼 초기화

    // 이전 버튼
    const prevButton = document.querySelector(".page-btn.prev");
    if (prevButton) {
        prevButton.onclick = () => {
            if (currentPage > 1) {
                currentPage--;
                showNewList();
            }
        };
        prevButton.disabled = currentPage === 1; // 첫 페이지일 때 비활성화
    }

    for (let i = 1; i <= totalPages; i++) {
        const pageItem = document.createElement("li");
        pageItem.classList.add("page-item");
        if (i === currentPage) {
            pageItem.classList.add("active");
        }

        const pageButton = document.createElement("button");
        pageButton.textContent = i;
        pageButton.onclick = () => {
            currentPage = i;
            showNewList();
        };
        pageItem.appendChild(pageButton);
        paginationList.appendChild(pageItem);
    }

    // 다음 버튼
    const nextButton = document.querySelector(".page-btn.next");
    if (nextButton) {
        nextButton.onclick = () => {
            if (currentPage < totalPages) {
                currentPage++;
                showNewList();
            }
        };
        nextButton.disabled = currentPage === totalPages; // 마지막 페이지일 때 비활성화
    }
};

// news.js 파일의 setupFilterEvents 함수 전체를 아래 코드로 교체합니다.

let setupFilterEvents = () => {
    const filterLinks = document.querySelectorAll('.filter a');
    filterLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // 기본 링크 동작 방지

            // 모든 링크에서 active 클래스 제거
            filterLinks.forEach(l => {
                l.classList.remove('active');
                // l.classList.remove('years-active'); // <-- 이 줄은 제거합니다.
            });

            // 클릭된 링크에 active 클래스 추가
            link.classList.add('active');

            const filterText = link.querySelector('span').textContent;
            if (filterText === '전체') {
                currentFilter = 'all';
            } else if (filterText === '라면 관련 이슈') {
                currentFilter = 'issue';
            } else if (filterText === '올해의 라멘') {
                currentFilter = 'years';
                // link.classList.add('years-active'); // <-- 이 줄도 제거합니다.
            }
            currentPage = 1; // 필터 변경 시 첫 페이지로 리셋
            showNewList(); // 새 필터로 목록 다시 렌더링
        });
    });
};
