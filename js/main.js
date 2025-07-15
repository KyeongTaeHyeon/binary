import { LoadData } from './utils.js';

// 섹션1 데이터 뿌리기
const template1 = document.getElementById('Boxtype01');
// 섹션2 데이터 뿌리기
const template2 = document.getElementById('Boxtype02');

document.addEventListener('DOMContentLoaded', function () {
    LoadData('../data/mainsect1.json')
        .then((data) => {
            data.forEach((ramenData, index) => {
                if (ramenData) {
                    const clone =
                        template1.content.firstElementChild.cloneNode(true);

                    if (index % 2 !== 0) {
                        clone.classList.add('reverse');
                    }

                    clone.querySelector('.ramenTitle').textContent =
                        ramenData.name;
                    clone.querySelector('.subTitle').textContent =
                        ramenData.title;
                    clone.querySelector('.ramenText').textContent =
                        ramenData.info;
                    clone.querySelector(
                        '.price'
                    ).textContent = `▲ ${ramenData.name}`;
                    clone.querySelector('.shopIcon img').src = ramenData.image;
                    clone.querySelector('.shopIcon img').alt = ramenData.name;
                    clone
                        .querySelector('.modal')
                        .setAttribute('data-id', ramenData.id);

                    document.querySelector('.section1').appendChild(clone);
                }
            });
        })
        .catch((error) => {
            console.error('데이터 불러오기 실패:', error);
        });

    LoadData('../data/mainsect2.json')
        .then((data) => {
            // const ramenData = data.find((item) => item.id === "etc1");
            data.forEach((ramenData, index) => {
                if (ramenData) {
                    // 템플릿 가져오기
                    const clone =
                        template2.content.firstElementChild.cloneNode(true);

                    // 데이터 삽입
                    clone.querySelector('.featureNum').textContent =
                        ramenData.num;
                    clone.querySelector('.subTitle').textContent =
                        ramenData.title;
                    clone.querySelector('.etcInfo').textContent =
                        ramenData.info;
                    clone.querySelector('.etcLeft img').src = ramenData.image;
                    clone.querySelector('.etcLeft img').alt = ramenData.title;

                    // 원하는 위치에 삽입
                    document.querySelector('.section2').appendChild(clone);
                }
            });
        })
        .catch((error) => {
            console.error('데이터 불러오기 실패:', error);
        });
});

document.querySelector('.section1').addEventListener('click', function (e) {
    const btn = e.target.closest('.modal');
    if (!btn) return;

    e.preventDefault();
    const id = btn.getAttribute('data-id');
    const modal = document.getElementById('modal');
    const modalTemp = document.getElementById('ramenPopup');
    modal.innerHTML = '';
    const cloneTemp = modalTemp.content.firstElementChild.cloneNode(true);
    const modalWrap = cloneTemp.querySelector('.tempWrap');
    modalData(id, cloneTemp); // cloneTemp를 전달해서 팝업에 데이터 삽입
    modalWrap.style.display = 'flex';
    modal.appendChild(cloneTemp);

    const closeBtn = cloneTemp.querySelector('.closeBtn');
    closeBtn.addEventListener('click', () => {
        modal.innerHTML = '';
    });
});

// 모달데이터 뿌리기
function modalData(id, cloneTemp) {
    Promise.all([
        LoadData('../data/mainpopup.json'),
        LoadData('../data/broth.json'),
        LoadData('../data/noodle.json'),
    ])
        .then(([popData, brothData, noodleData]) => {
            let dataList = popData.find(
                (item) => String(item.id) === String(id)
            );
            if (!dataList) {
                return;
            }

            // 팝업 내부에 라멘 데이터를 삽입합니다.
            cloneTemp.querySelector('.tempRamenName').textContent =
                dataList.name;
            cloneTemp.querySelector(
                '.tempText .tempList .rightbox'
            ).textContent = dataList.soup;
            // 스프 농도
            const richnessList = cloneTemp.querySelector(
                '.tempText .richness .tempCircle'
            );
            richnessList.innerHTML = '';
            let richnessData = brothData.filter(
                (item) => item.type === 'richness'
            );
            richnessData.forEach((item) => {
                const richnessDiv = document.createElement('div'); // 수정!
                richnessDiv.dataset.id = item.id;
                if (item.id === dataList.richness) {
                    richnessDiv.classList.add('active');
                }
                richnessList.appendChild(richnessDiv); // 부모에 추가
            });
            // 기름진 정도
            const richList = cloneTemp.querySelector(
                '.tempText .rich .tempCircle'
            );
            richList.innerHTML = '';
            let richData = brothData.filter((item) => item.type === 'rich');
            richData.forEach((item) => {
                const richDiv = document.createElement('div'); // 수정!
                richDiv.dataset.id = item.id;
                if (item.id === dataList.rich) {
                    richDiv.classList.add('active');
                }
                richList.appendChild(richDiv); // 부모에 추가
            });
            // 면의 굵기
            const thicknessList = cloneTemp.querySelector(
                '.tempText .thickness .tempCircle'
            );
            thicknessList.innerHTML = '';
            let thicknessData = noodleData.filter(
                (item) => item.type === 'thickness'
            );
            thicknessData.forEach((item) => {
                const thicknessDiv = document.createElement('div'); // 수정!
                thicknessDiv.dataset.id = item.id;
                if (item.id === dataList.thickness) {
                    thicknessDiv.classList.add('active');
                }
                thicknessList.appendChild(thicknessDiv); // 부모에 추가
            });
        })
        .catch((error) => {
            console.error('데이터 불러오기 실패:', error);
        });
}
