const regionLists = [];
const categoryLists = [];
const thicknessLists = [];
const noodleTypes = [];
const brothCategories = [];
const brothStyles = [];
const brothRichs = [];
const brothRichness = [];

const valueList = [];
const shopList = [];

let currentPage = 1;
const itemsPerPage = 8;
let pagedData = [];

// valueList를 아래처럼 그룹별로 분리해서 관리
const filterState = {
    region: [],
    kind: [],
    thickness: [],
    shape: [],
};

import { LoadData } from './utils.js';

const filterWrapper = document.getElementById('filterWrapper');
const selectWrapper = document.getElementById('selectorWrapper');
const contentList = document.getElementById('contentList');
/** @type {HTMLTemplateElement} */
const contentItemTemplate = document.getElementById('contentItemTemplate');

document.addEventListener('DOMContentLoaded', () => {
    Promise.all([
        LoadData('../data/region.json'),
        LoadData('../data/category.json'),
        LoadData('../data/noodle.json'),
        LoadData('../data/broth.json'),
        LoadData('../data/shopData.json'),
    ]).then(([regionData, categoryData, noodleData, brothData, shopData]) => {
        regionLists.push(...regionData);
        setLists(regionLists);

        categoryLists.push(...categoryData);
        setLists(categoryLists);

        thicknessLists.push(
            ...noodleData.filter((item) => item.type === 'thinkness')
        );
        setLists(thicknessLists);

        noodleTypes.push(...noodleData.filter((item) => item.type === 'shape'));
        setLists(noodleTypes);

        brothCategories.push(
            ...brothData.filter((item) => item.type === 'category')
        );
        setLists(brothCategories);

        brothStyles.push(...brothData.filter((item) => item.type === 'style'));
        setLists(brothStyles);

        brothRichs.push(...brothData.filter((item) => item.type === 'rich'));
        setLists(brothRichs);

        brothRichness.push(
            ...brothData.filter((item) => item.type === 'richness')
        );
        setLists(brothRichness);

        shopList.push(...shopData);
        renderContent(shopList);
    });
});

let setLists = (lists) => {
    const filter = filterWrapper.querySelector('.filters');
    const filterDiv = document.createElement('div');

    const filterTitle = document.createElement('div');
    filterTitle.classList.add('filterTitle');

    const filterList = document.createElement('div');
    filterList.classList.add('filterList');

    const filterContents = document.createElement('ul');
    filterContents.classList.add('filterContents');
    lists.forEach((list) => {
        if (list.title.includes('/')) {
            filterTitle.innerHTML =
                list.title.split('/')[1].toString().trim() || '';
        } else {
            filterTitle.innerHTML = list.title || '';
        }

        const filterLI = document.createElement('li');
        filterLI.innerHTML = list.name;
        filterLI.dataset.value = list.id;
        filterLI.dataset.title = list.title || '';
        filterContents.appendChild(filterLI);
    });
    filterDiv.appendChild(filterTitle);
    filterList.appendChild(filterContents);
    filterDiv.appendChild(filterList);
    filter.appendChild(filterDiv);

    filter.addEventListener('click', filterClick);
};

let filterClick = (e) => {
    if (e.target.tagName === 'LI') {
        if (valueList.some((item) => item.value === e.target.dataset.value)) {
            return;
        }
        valueList.push({
            value: e.target.dataset.value,
            title: e.target.dataset.title || '',
        });
        const selectLi = document.createElement('li');
        selectLi.innerHTML = e.target.innerHTML;
        selectLi.dataset.value = e.target.dataset.value;
        selectLi.dataset.title = e.target.dataset.title || '';

        selectLi.addEventListener('click', function () {
            // DOM에서 삭제
            this.remove();
            // valueList에서도 삭제
            const idx = valueList.findIndex(
                (item) => item.value === this.dataset.value
            );
            if (idx > -1) valueList.splice(idx, 1);
        });

        selectWrapper.querySelector('.selectorContents').appendChild(selectLi);
    }
};

function renderPaginationButtons(totalItems) {
    const totalPages = Math.ceil(totalItems / itemsPerPage); // 전체 페이지 수 계산
    const paginationList = document.querySelector('.pageList'); // 페이지 번호 목록 (ul)
    if (!paginationList) {
        console.warn(
            'WARNING: 페이지네이션 목록(.pageList)을 찾을 수 없습니다. HTML을 확인하세요.'
        );
        return;
    }
    paginationList.innerHTML = ''; // 기존 페이지 버튼 초기화

    // '이전' 버튼 (prevButton) 로직
    const prevButton = document.querySelector('.pageBtn.prev');
    if (prevButton) {
        prevButton.onclick = () => {
            if (currentPage > 1) {
                currentPage--; // 페이지 감소
                updatePostListAndPagination(); // 게시글 및 페이지네이션 다시 렌더링
            }
        };
        prevButton.disabled = currentPage === 1; // 첫 페이지면 비활성화
        prevButton.style.opacity = currentPage === 1 ? '0.5' : '1'; // CSS 비활성화 효과
        prevButton.style.pointerEvents = currentPage === 1 ? 'none' : 'auto'; // 클릭 이벤트 비활성화
    }

    // --- 페이지 번호 생성 및 생략 기호(…) 로직 ---
    const maxPageButtons = 10; // 화면에 표시할 최대 페이지 버튼 수
    let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

    // 만약 끝 페이지가 totalPages에 도달하여 10개를 채우지 못하는 경우,
    // 시작 페이지를 조정하여 뒤에서부터 10개의 페이지가 보이도록 함
    if (endPage - startPage + 1 < maxPageButtons) {
        startPage = Math.max(1, endPage - maxPageButtons + 1);
    }

    // 첫 페이지로 가는 생략 기호 (...) 표시 로직
    if (startPage > 1) {
        // 첫 페이지 버튼 추가
        const firstPageItem = document.createElement('li');
        firstPageItem.classList.add('page-item');
        const firstPageButton = document.createElement('button');
        firstPageButton.textContent = 1;
        firstPageButton.onclick = () => {
            currentPage = 1;
            updatePostListAndPagination();
        };
        firstPageItem.appendChild(firstPageButton);
        paginationList.appendChild(firstPageItem);

        if (startPage > 2) {
            // 1페이지 다음 바로 startPage가 아니면 ... 추가
            const ellipsisItem = document.createElement('li');
            ellipsisItem.classList.add('page-item', 'ellipsis');
            ellipsisItem.innerHTML = `<span>...</span>`;
            paginationList.appendChild(ellipsisItem);
        }
    }

    // 계산된 범위 내의 페이지 번호 버튼 생성
    for (let i = startPage; i <= endPage; i++) {
        const pageItem = document.createElement('li');
        pageItem.classList.add('page-item');
        if (i === currentPage) {
            pageItem.classList.add('active'); // 현재 페이지 활성화
        }

        const pageButton = document.createElement('button');
        pageButton.textContent = i; // 버튼 텍스트는 페이지 번호
        pageButton.onclick = () => {
            currentPage = i; // 클릭된 페이지로 현재 페이지 설정
            updatePostListAndPagination(); // 게시글 및 페이지네이션 다시 렌더링
        };
        pageItem.appendChild(pageButton);
        paginationList.appendChild(pageItem);
    }

    // 마지막 페이지로 가는 생략 기호 (...) 및 마지막 페이지 번호 표시 로직
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            // 마지막 페이지 바로 전이 아니면 ... 추가
            const ellipsisItem = document.createElement('li');
            ellipsisItem.classList.add('page-item', 'ellipsis');
            ellipsisItem.innerHTML = `<span>...</span>`;
            paginationList.appendChild(ellipsisItem);
        }

        // 마지막 페이지 번호 버튼 추가
        const lastPageItem = document.createElement('li');
        lastPageItem.classList.add('page-item');
        if (totalPages === currentPage) {
            lastPageItem.classList.add('active'); // 마지막 페이지가 현재 페이지면 활성화
        }
        const lastPageButton = document.createElement('button');
        lastPageButton.textContent = totalPages;
        lastPageButton.onclick = () => {
            currentPage = totalPages; // 클릭 시 마지막 페이지로 이동
            updatePostListAndPagination();
        };
        lastPageItem.appendChild(lastPageButton);
        paginationList.appendChild(lastPageItem);
    }

    // '다음' 버튼 (nextButton) 로직
    const nextButton = document.querySelector('.pageBtn.next');
    if (nextButton) {
        nextButton.onclick = () => {
            if (currentPage < totalPages) {
                currentPage++; // 페이지 증가
                updatePostListAndPagination(); // 게시글 및 페이지네이션 다시 렌더링
            }
        };
        nextButton.disabled = currentPage === totalPages; // 마지막 페이지면 비활성화
        nextButton.style.opacity = currentPage === totalPages ? '0.5' : '1'; // CSS 비활성화 효과
        nextButton.style.pointerEvents =
            currentPage === totalPages ? 'none' : 'auto'; // 클릭 이벤트 비활성화
    }
}

function updatePostListAndPagination() {
    contentList.innerHTML = '';

    // 필터링이 필요하다면 여기서 filteredList를 만들어주세요.
    // 예시: let filteredList = shopList.filter(...);
    // 지금은 전체 shopList 사용
    let filteredList = shopList;

    // 페이징 처리
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const itemsToShow = filteredList.slice(startIndex, endIndex);

    if (itemsToShow.length === 0) {
        const noContent = document.createElement('p');
        noContent.textContent = '표시할 내용이 없습니다.';
        noContent.style.textAlign = 'center';
        noContent.style.padding = '20px';
        contentList.appendChild(noContent);
    } else {
        itemsToShow.forEach((item) => {
            const contentItem =
                contentItemTemplate.content.firstElementChild.cloneNode(true);
            const contentImage = contentItem.querySelector('.contentImage img');
            contentImage.src = item.imageURL || '';

            const contentTitle = contentItem.querySelector('.contentTitle');
            contentTitle.innerHTML = item.name || '';

            const categoryList = contentItem.querySelector('.categoryList');
            if (item.region) {
                const li = document.createElement('li');
                li.innerHTML = item.region;
                categoryList.appendChild(li);
            }
            if (item.kind) {
                const li = document.createElement('li');
                li.innerHTML = item.kind;
                categoryList.appendChild(li);
            }
            if (item.category) {
                let categoryDataList = item.category.split('/');
                categoryDataList.forEach((category) => {
                    const li = document.createElement('li');
                    li.innerHTML = category.trim();
                    categoryList.appendChild(li);
                });
            }
            if (item.thinkness) {
                const li = document.createElement('li');
                li.innerHTML = item.thinkness;
                categoryList.appendChild(li);
            }

            const contentDescription = contentItem.querySelector(
                '.contentDescription'
            );
            contentDescription.innerHTML = item.content || '';

            contentList.appendChild(contentItem);
        });
    }

    // 페이지네이션 버튼 렌더링
    renderPaginationButtons(filteredList.length);
}

let renderContent = (data) => {
    pagedData = data;
    contentList.innerHTML = '';
    // 페이징 처리
    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    const pageItems = data.slice(startIdx, endIdx);

    pageItems.forEach((item) => {
        const contentItem =
            contentItemTemplate.content.firstElementChild.cloneNode(true);
        const contentImage = contentItem.querySelector('.contentImage img');
        contentImage.src = item.imageURL || '';

        const contentTitle = contentItem.querySelector('.contentTitle');
        contentTitle.innerHTML = item.name || '';

        const categoryList = contentItem.querySelector('.categoryList');
        if (item.region) {
            const li = document.createElement('li');
            li.innerHTML = item.region;
            categoryList.appendChild(li);
        }
        if (item.kind) {
            const li = document.createElement('li');
            li.innerHTML = item.kind;
            categoryList.appendChild(li);
        }
        if (item.category) {
            let categoryDataList = item.category.split('/');
            categoryDataList.forEach((category) => {
                const li = document.createElement('li');
                li.innerHTML = category.trim();
                categoryList.appendChild(li);
            });
        }
        if (item.thinkness) {
            const li = document.createElement('li');
            li.innerHTML = item.thinkness;
            categoryList.appendChild(li);
        }

        const contentDescription = contentItem.querySelector(
            '.contentDescription'
        );
        contentDescription.innerHTML = item.content || '';

        contentList.appendChild(contentItem);
    });

    renderPaginationButtons(data.length);
};
