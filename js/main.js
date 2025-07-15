import { LoadData } from "./utils.js";

// 섹션1 데이터 뿌리기

// const template1 = document.getElementById("Boxtype01");

// document.addEventListener("DOMContentLoaded", function () {
//     LoadData("../data/mainsect1.json")
//         .then((data) => {
//             // "G1" 데이터만 찾기
//             const ramenData = data.find((item) => item.id === "G1");

//             if (ramenData) {
//                 // 템플릿 가져오기
//                 const clone =
//                     template1.content.firstElementChild.cloneNode(true);

//                 // 데이터 삽입
//                 clone.querySelector(".ramenTitle").textContent = ramenData.name;
//                 clone.querySelector(".subTitle").textContent = ramenData.title;
//                 clone.querySelector(".ramenText").textContent = ramenData.info;
//                 clone.querySelector(
//                     ".price"
//                 ).textContent = `▲ ${ramenData.name}`;
//                 clone.querySelector(".shopIcon img").src = ramenData.image;
//                 clone.querySelector(".shopIcon img").alt = ramenData.name;

//                 // 원하는 위치에 삽입
//                 document.querySelector(".section1").appendChild(clone);

//                 // 모달 삽입
//                 showModal();
//             }
//         })
//         .catch((error) => {
//             console.error("데이터 불러오기 실패:", error);
//         });
// });
const template1 = document.getElementById("Boxtype01");

document.addEventListener("DOMContentLoaded", function () {
    LoadData("../data/mainsect1.json")
        .then((data) => {
            data.forEach((ramenData, index) => {
                if (ramenData) {
                    const clone =
                        template1.content.firstElementChild.cloneNode(true);

                    if (index % 2 !== 0) {
                        clone.classList.add("reverse");
                    }

                    clone.querySelector(".ramenTitle").textContent =
                        ramenData.name;
                    clone.querySelector(".subTitle").textContent =
                        ramenData.title;
                    clone.querySelector(".ramenText").textContent =
                        ramenData.info;
                    clone.querySelector(
                        ".price"
                    ).textContent = `▲ ${ramenData.name}`;
                    clone.querySelector(".shopIcon img").src = ramenData.image;
                    clone.querySelector(".shopIcon img").alt = ramenData.name;

                    document.querySelector(".section1").appendChild(clone);

                    showModal(ramenData.id);
                }
            });
        })
        .catch((error) => {
            console.error("데이터 불러오기 실패:", error);
        });
});

// 섹션2 데이터 뿌리기
const template2 = document.getElementById("Boxtype02");

document.addEventListener("DOMContentLoaded", function () {
    LoadData("../data/mainsect2.json")
        .then((data) => {
            // const ramenData = data.find((item) => item.id === "etc1");
            data.forEach((ramenData, index) => {
                if (ramenData) {
                    // 템플릿 가져오기
                    const clone =
                        template2.content.firstElementChild.cloneNode(true);

                    // 데이터 삽입
                    clone.querySelector(".featureNum").textContent =
                        ramenData.num;
                    clone.querySelector(".subTitle").textContent =
                        ramenData.title;
                    clone.querySelector(".etcInfo").textContent =
                        ramenData.info;
                    clone.querySelector(".etcLeft img").src = ramenData.image;
                    clone.querySelector(".etcLeft img").alt = ramenData.title;

                    // 원하는 위치에 삽입
                    document.querySelector(".section2").appendChild(clone);
                }
            });
        })
        .catch((error) => {
            console.error("데이터 불러오기 실패:", error);
        });
});

// 모달영역 함수
function showModal(id) {
    const modal = document.getElementById("modal");
    const btnOpenModal = document.querySelectorAll(".modal");
    const modalTemp = document.getElementById("ramenPopup");
    const cloneTemp = modalTemp.content.firstElementChild.cloneNode(true);

    btnOpenModal.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            modal.innerHTML = "";
            const modalWrap = cloneTemp.querySelector(".tempWrap");
            // 모달데이터 함수
            modalData(id);
            modalWrap.style.display = "flex";
            modal.appendChild(cloneTemp);
        });
    });

    const closeBtn = cloneTemp.querySelector(".closeBtn");
    closeBtn.addEventListener("click", () => {
        modal.innerHTML = "";
    });
}

// function modalData(id){
//     document.addEventListener("DOMContentLoaded", function () {
//     LoadData("../data/mainpopup.json")
//         .then((data) => {
//             // const ramenData = data.find((item) => item.id === "etc1");
//             data.find((ramenData, index) => {
//                 if (ramenData) {
//                     // 템플릿 가져오기
//                     // const clone =
//                     //     template2.content.firstElementChild.cloneNode(true);

//                     // 데이터 삽입
//                     clone.querySelector(".featureNum").textContent =
//                         ramenData.num;
//                     clone.querySelector(".subTitle").textContent =
//                         ramenData.title;
//                     clone.querySelector(".etcInfo").textContent =
//                         ramenData.info;
//                     clone.querySelector(".etcLeft img").src = ramenData.image;
//                     clone.querySelector(".etcLeft img").alt = ramenData.title;

//                     // 원하는 위치에 삽입
//                     document.querySelector(".section2").appendChild(clone);
//                 }
//             });
//         })
//         .catch((error) => {
//             console.error("데이터 불러오기 실패:", error);
//         });
// });
// }

// 모달데이터 뿌리기
function modalData(id) {
    document.addEventListener("DOMContentLoaded", function () {
        LoadData("../data/mainpopup.json")
            .then((data) => {
                // const modalTemp = document.getElementById("ramenPopup");
                if (!modalTemp) {
                    console.error("Error: 'ramenPopup' template not found.");
                    return;
                }

                // 각 라멘 데이터에 대해 팝업을 생성합니다.
                data.find((ramenDataItem) => {
                    // const clone = ramenPopupTemplate.content.firstElementChild.cloneNode(true);

                    // 팝업 내부에 라멘 데이터를 삽입합니다.
                    clone.querySelector(".tempRamenName").textContent =
                        ramenDataItem.name;
                    clone.querySelector(".rightbox").textContent =
                        ramenDataItem.soup;

                    // 농도 설정
                    const richnessIndex =
                        parseInt(ramenDataItem.richness.substring(1)) - 1;
                    const richnessCircles = clone.querySelectorAll(
                        ".tempList:nth-child(2) .tempCircle div"
                    );
                    richnessCircles.forEach((circle) =>
                        circle.classList.remove("active")
                    );
                    if (
                        richnessIndex >= 0 &&
                        richnessIndex < richnessCircles.length
                    ) {
                        richnessCircles[richnessIndex].classList.add("active");
                    }

                    // 기름진 정도 설정
                    const richIndex =
                        parseInt(ramenDataItem.rich.substring(1)) - 1;
                    const richCircles = clone.querySelectorAll(
                        ".tempList:nth-child(3) .tempCircle div"
                    );
                    richCircles.forEach((circle) =>
                        circle.classList.remove("active")
                    );
                    if (richIndex >= 0 && richIndex < richCircles.length) {
                        richCircles[richIndex].classList.add("active");
                    }

                    // 면의 굵기 설정
                    const thicknessIndex =
                        parseInt(ramenDataItem.thickness.substring(1)) - 1;
                    const thicknessCircles = clone.querySelectorAll(
                        ".tempList:nth-child(4) .tempCircle div"
                    );
                    thicknessCircles.forEach((circle) =>
                        circle.classList.remove("active")
                    );
                    if (
                        thicknessIndex >= 0 &&
                        thicknessIndex < thicknessCircles.length
                    ) {
                        thicknessCircles[thicknessIndex].classList.add(
                            "active"
                        );
                    }

                    // document.body.appendChild(clone);
                });
            })
            .catch((error) => {
                // 데이터 로딩 중 오류가 발생하면 콘솔에 에러 메시지를 출력합니다.
                console.error("데이터 불러오기 실패:", error);
            });
    });
}
// 히어로영역 버튼
document.addEventListener("DOMContentLoaded", () => {
    const heroPrev = document.querySelector(".btnPrev");
    const heroNext = document.querySelector(".btnNext");
    const slides = document.querySelector(".slideImg");
    const images = document.querySelectorAll(".slide img");
    const totalSlides = images.length;
    let currentIndex = 0;

    heroPrev.addEventListener("click", function () {
        currentIndex = currentIndex === 0 ? totalSlides - 1 : currentIndex - 1;
        updateSlider();
    });
    heroNext.addEventListener("click", function () {
        currentIndex = currentIndex === totalSlides - 1 ? 0 : currentIndex + 1;
        updateSlider();
    });
    function updateSlider() {
        const offset = -currentIndex * 100;
        slides.style.transform = `translateX(${offset}%)`;
    }
});
