import { LoadData } from "./utils.js";
// 모달영역 구현
const modal = document.getElementById("modal");
const btnOpenModal = document.querySelectorAll(".modal");
const modalTemp = document.getElementById("ramenPopup");
const cloneTemp = modalTemp.content.firstElementChild.cloneNode(true);

btnOpenModal.forEach(btn => {
    btn.addEventListener("click", (e) => {
    e.preventDefault();
    modal.innerHTML = "";
    const modalWrap = cloneTemp.querySelector(".tempWrap");
    modalWrap.style.display = "flex";
    modal.appendChild(cloneTemp);
});
})

const closeBtn = cloneTemp.querySelector(".closeBtn");
closeBtn.addEventListener("click",()=>{
    modal.innerHTML = "";
})

const template = document.getElementById("Boxtype01");

// 섹션1 데이터 뿌리기
document.addEventListener('DOMContentLoaded', function () {
    LoadData("../data/mainsect1.json").then((data) => {
        // "G1" 데이터만 찾기
        const ramenData = data.find(item => item.id === "G1");

        if (ramenData) {
            // 템플릿 가져오기            
            const clone = template.content.firstElementChild.cloneNode(true);

            // 데이터 삽입
            clone.querySelector(".ramenTitle").textContent = ramenData.name;
            clone.querySelector(".subTitle").textContent = ramenData.title;
            clone.querySelector(".ramenText").textContent = ramenData.info;
            clone.querySelector(".price").textContent = `▲ ${ramenData.name}`;
            clone.querySelector(".shopIcon img").src = ramenData.image;
            clone.querySelector(".shopIcon img").alt = ramenData.name;

            // 원하는 위치에 삽입
            document.querySelector(".section1").appendChild(clone);
        }
    }).catch((error) => {
        console.error("데이터 불러오기 실패:", error);
    });
});
