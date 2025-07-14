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

import { LoadData } from './utils.js';

const filterWrapper = document.getElementById('filterWrapper');
const selectWrapper = document.getElementById('selectorWrapper');
const contentList = document.getElementById('contentList');
/** @type {HTMLTemplateElement} */
const contentItemTemplate = document.getElementById('contentItemTemplate');

document.addEventListener('DOMContentLoaded', () => {
    LoadData('../data/region.json').then((data) => {
        regionLists.push(...data);
        setLists(regionLists);
    });

    LoadData('../data/category.json').then((data) => {
        categoryLists.push(...data);
        setLists(categoryLists);
    });

    LoadData('../data/noodle.json').then((data) => {
        thicknessLists.push(
            ...data.filter((item) => item.type === 'thinkness')
        );
        setLists(thicknessLists);
        noodleTypes.push(...data.filter((item) => item.type === 'shape'));
        setLists(noodleTypes);
    });

    LoadData('../data/broth.json').then((data) => {
        brothCategories.push(
            ...data.filter((item) => item.type === 'category')
        );
        setLists(brothCategories);
        brothStyles.push(...data.filter((item) => item.type === 'style'));
        setLists(brothStyles);
        brothRichs.push(...data.filter((item) => item.type === 'rich'));
        setLists(brothRichs);
        brothRichness.push(...data.filter((item) => item.type === 'richness'));
        setLists(brothRichness);
    });

    LoadData('../data/shopData.json').then((data) => {
        shopList.push(...data);
        console.log(shopList);
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

function renderPagination(totalItems) {
    const paginationWrapper =
        document.getElementById('paginationWrapper') ||
        document.createElement('div');
    paginationWrapper.id = 'paginationWrapper';
    paginationWrapper.innerHTML = '';

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        btn.className = i === currentPage ? 'active' : '';
        btn.addEventListener('click', () => {
            currentPage = i;
            renderContent(pagedData);
            renderPagination(totalItems);
        });
        paginationWrapper.appendChild(btn);
    }

    // 페이지네이션이 처음 생성될 때만 추가
    if (!document.getElementById('paginationWrapper')) {
        contentList.parentNode.appendChild(paginationWrapper);
    } else if (!contentList.parentNode.contains(paginationWrapper)) {
        contentList.parentNode.appendChild(paginationWrapper);
    }
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
        const li = document.createElement('li');
        li.innerHTML = item.category;
        categoryList.appendChild(li);

        const contentDescription = contentItem.querySelector(
            '.contentDescription'
        );
        contentDescription.innerHTML = item.content || '';

        contentList.appendChild(contentItem);
    });

    renderPagination(data.length);
};
