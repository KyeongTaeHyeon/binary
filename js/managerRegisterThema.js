import { LoadData } from './utils.js';

const regionLists = [];
const categoryLists = [];
const thicknessLists = [];
const noodleTypes = [];
const brothCategories = [];
const brothStyles = [];
const brothRichs = [];
const brothRichness = [];

const filterWrapper = document.getElementById('filterWrapper');
const selectWrapper = document.getElementById('selectorWrapper');
const cate1 = document.getElementById('cate1');
const cate2 = document.getElementById('cate2');

const filterState = {
  region: [],
  kind: [],
  thickness: [],
  shape: [],
  category: [],
  type: [],
  rich: [],
  richness: [],
  style: [],
};

// 필터 UI 생성용 (원래 기능 유지)
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
      filterTitle.innerHTML = list.title.split('/')[1].toString().trim() || '';
    } else {
      filterTitle.innerHTML = list.title || '';
    }

    const filterLI = document.createElement('li');
    filterLI.innerHTML = list.name;
    filterLI.dataset.value = list.id;
    filterLI.dataset.title = list.type || '';
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
    const group = e.target.dataset.title;
    const value = e.target.dataset.value;

    if (filterState[group] && filterState[group].includes(value)) return;

    if (filterState[group]) filterState[group].push(value);

    const selectLi = document.createElement('li');
    selectLi.dataset.value = value;
    selectLi.dataset.title = group;

    const spanText = document.createElement('span');
    spanText.innerText = e.target.innerHTML;

    selectLi.appendChild(spanText);
    selectWrapper.querySelector('.selectorContents').appendChild(selectLi);
  }
};

// ▶ cate1 변경 시 cate2 내용 갱신
function updateCate2(selected) {
  cate2.innerHTML = '';

  let options = [];
  let isDisabled = false;

  switch (selected) {
    case 'legion':
      options = regionLists.map((r) => r.name);
      isDisabled = true;
      break;
    case 'type':
      options = categoryLists.map((c) => c.name);
      isDisabled = true;
      break;
    case 'noodle':
      options = ['두께', '형태'];
      isDisabled = false;
      break;
    case 'broth':
      options = ['카테고리', '계열', '기름기', '농도'];
      isDisabled = false;
      break;
    default:
      break;
  }

  options.forEach((optionText) => {
    const option = document.createElement('option');
    option.value = optionText;
    option.textContent = optionText;
    cate2.appendChild(option);
  });

  cate2.disabled = isDisabled;
}

document.addEventListener('DOMContentLoaded', () => {
  Promise.all([
    LoadData('../data/region.json'),
    LoadData('../data/category.json'),
    LoadData('../data/noodle.json'),
    LoadData('../data/broth.json'),
  ]).then(([regionData, categoryData, noodleData, brothData]) => {
    regionLists.push(...regionData);
    categoryLists.push(...categoryData);
    thicknessLists.push(
      ...noodleData.filter((item) => item.type === 'thickness')
    );
    noodleTypes.push(...noodleData.filter((item) => item.type === 'shape'));
    brothCategories.push(
      ...brothData.filter((item) => item.type === 'category')
    );
    brothStyles.push(...brothData.filter((item) => item.type === 'style'));
    brothRichs.push(...brothData.filter((item) => item.type === 'rich'));
    brothRichness.push(...brothData.filter((item) => item.type === 'richness'));

    // 필터 뿌리기
    setLists(regionLists);
    setLists(categoryLists);
    setLists(thicknessLists);
    setLists(noodleTypes);
    setLists(brothCategories);
    setLists(brothStyles);
    setLists(brothRichs);
    setLists(brothRichness);

    // ▶ 처음 로딩 시: cate1은 "지역"이 기본값이므로 자동 출력
    updateCate2(cate1.value);

    // ▶ cate1 변경 시 cate2 내용 갱신
    cate1.addEventListener('change', () => {
      updateCate2(cate1.value);
    });
  });
});
