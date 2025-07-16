import { LoadData } from "./utils.js";

// 섹션1 데이터 뿌리기
const template1 = document.getElementById("Boxtype01");
// 섹션2 데이터 뿌리기
const template2 = document.getElementById("Boxtype02");
// GSAP ScrollTrigger 등록
gsap.registerPlugin(ScrollTrigger);

// 히어로 영역 데이터 뿌리기
// document.addEventListener("DOMContentLoaded", function () {
//     LoadData("../data/mainhero.json")
//         .then((data) => {
//             // const mainSlides = document.querySelector('.mainSlides');
//             // mainSlides.innerHTML = ''; // 기존 슬라이드 초기화
//             // data.forEach((ramenData, index) => {
//             //     const slide = document.createElement('div');
//             //     slide.className = 'slide';

//             //     const slideImg = document.createElement("div");
//             //     slideImg.className = "slideImg";

//             //     const image = document.createElement("img");
//             //     // 파일명은 name과 매핑되어 있다고 가정
//             //     const imgName = ramenData.name.toLowerCase(); // 예: "이에케"
//             //     image.src = ramenData.image; // 예: img/hero이에케.jpeg
//             //     image.alt = ramenData.name;
//             //     slideImg.appendChild(image);

//             //     const slideText = document.createElement("div");
//             //     slideText.className = "slideText";

//             //     const slideTitle = document.createElement("p");
//             //     slideTitle.className = "slideTitle";
//             //     slideTitle.textContent = ramenData.name;

//             //     const modalLink = document.createElement("a");
//             //     modalLink.href = "";
//             //     modalLink.className = "modal";
//             //     modalLink.textContent = "라멘 데이터";

//             //     slideText.appendChild(slideTitle);
//             //     slideText.appendChild(modalLink);

//             //     slide.appendChild(slideImg);
//             //     slide.appendChild(slideText);
//             });
//         })
//         .catch((error) => {
//             console.error("Error loading ramen data:", error);
//         });
// });

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
                    clone
                        .querySelector(".modal")
                        .setAttribute("data-id", ramenData.id);

                    document.querySelector(".section1").appendChild(clone);
                }
            });

            // section1의 각 라멘 박스에 애니메이션 적용
            document
                .querySelectorAll(".section1 .contentsBox")
                .forEach((box, idx) => {
                    gsap.from(box, {
                        opacity: 0,
                        y: 80,
                        duration: 0.8,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: box,
                            start: "top 80%",
                            end: "bottom 40%",
                            toggleActions: "play reverse play reverse",
                            // markers: true
                        },
                    });
                });
        })
        .catch((error) => {
            console.error("데이터 불러오기 실패:", error);
        });

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

            document
                .querySelectorAll(".section2 .feature")
                .forEach((box, idx) => {
                    gsap.from(box, {
                        scale: 0.8,
                        opacity: 0,
                        duration: 0.7,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: box,
                            start: "top 85%",
                            end: "bottom 40%",
                            toggleActions: "play reverse play reverse", // ← 이 부분!
                            // markers: true
                        },
                    });
                });
        })
        .catch((error) => {
            console.error("데이터 불러오기 실패:", error);
        });
});

document.querySelector(".section1").addEventListener("click", function (e) {
    const btn = e.target.closest(".modal");
    if (!btn) return;

    e.preventDefault();
    const id = btn.getAttribute("data-id");
    const modal = document.getElementById("modal");
    const modalTemp = document.getElementById("ramenPopup");
    modal.innerHTML = "";
    const cloneTemp = modalTemp.content.firstElementChild.cloneNode(true);
    const modalWrap = cloneTemp.querySelector(".tempWrap");
    modalData(id, cloneTemp); // cloneTemp를 전달해서 팝업에 데이터 삽입
    modal.style.zIndex = "9999";
    modalWrap.style.display = "flex"; // 또는 block
    modal.appendChild(cloneTemp);

    gsap.fromTo(
        cloneTemp.querySelector(".tempWrap"),
        { scale: 0.7, opacity: 0, rotation: 8 },
        { scale: 1, opacity: 1, rotation: 0, duration: 0.5, ease: "power2.out" }
    );

    const closeBtn = cloneTemp.querySelector(".closeBtn");
    closeBtn.addEventListener("click", () => {
        modal.innerHTML = "";
        modal.style.zIndex = "-1";
        // gsap.to(cloneTemp.querySelector('.modalWrap'), {
        //     opacity: 0,
        //     y: -100,
        //     duration: 0.4,
        //     onComplete: () => {
        //         modal.innerHTML = '';
        //     },
        // });
    });
});

// 모달데이터 뿌리기
function modalData(id, cloneTemp) {
    Promise.all([
        LoadData("../data/mainpopup.json"),
        LoadData("../data/broth.json"),
        LoadData("../data/noodle.json"),
    ])
        .then(([popData, brothData, noodleData]) => {
            let dataList = popData.find(
                (item) => String(item.id) === String(id)
            );
            if (!dataList) {
                return;
            }

            // 팝업 내부에 라멘 데이터를 삽입합니다.
            cloneTemp.querySelector(".tempRamenName").textContent =
                dataList.name;
            cloneTemp.querySelector(
                ".tempText .tempList .rightbox"
            ).textContent = dataList.soup;
            // 스프 농도
            const richnessList = cloneTemp.querySelector(
                ".tempText .richness .tempCircle"
            );
            richnessList.innerHTML = "";
            let richnessData = brothData.filter(
                (item) => item.type === "richness"
            );
            richnessData.forEach((item) => {
                const richnessDiv = document.createElement("div"); // 수정!
                richnessDiv.dataset.id = item.id;
                if (item.id === dataList.richness) {
                    richnessDiv.classList.add("active");
                }
                richnessList.appendChild(richnessDiv); // 부모에 추가
            });
            // 기름진 정도
            const richList = cloneTemp.querySelector(
                ".tempText .rich .tempCircle"
            );
            richList.innerHTML = "";
            let richData = brothData.filter((item) => item.type === "rich");
            richData.forEach((item) => {
                const richDiv = document.createElement("div"); // 수정!
                richDiv.dataset.id = item.id;
                if (item.id === dataList.rich) {
                    richDiv.classList.add("active");
                }
                richList.appendChild(richDiv); // 부모에 추가
            });
            // 면의 굵기
            const thicknessList = cloneTemp.querySelector(
                ".tempText .thickness .tempCircle"
            );
            thicknessList.innerHTML = "";
            let thicknessData = noodleData.filter(
                (item) => item.type === "thickness"
            );
            thicknessData.forEach((item) => {
                const thicknessDiv = document.createElement("div"); // 수정!
                thicknessDiv.dataset.id = item.id;
                if (item.id === dataList.thickness) {
                    thicknessDiv.classList.add("active");
                }
                thicknessList.appendChild(thicknessDiv); // 부모에 추가
            });
        })
        .catch((error) => {
            console.error("데이터 불러오기 실패:", error);
        });
}
// 히어로 버튼
document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelector(".slideImg");
    const prevButton = document.querySelector(".btnPrev");
    const nextButton = document.querySelector(".btnNext");
    const images = document.querySelectorAll(".slideImg img");
    const totalSlides = images.length;
    let currentIndex = 0;

    // 이전 버튼 클릭 시
    prevButton.addEventListener("click", () => {
        currentIndex = currentIndex === 0 ? totalSlides - 1 : currentIndex - 1;
        updateSlider();
    });

    // 다음 버튼 클릭 시
    nextButton.addEventListener("click", () => {
        currentIndex = currentIndex === totalSlides - 1 ? 0 : currentIndex + 1;
        updateSlider();
    });

    // 슬라이더의 CSS transform 속성을 업데이트하여 이미지를 이동시키는 함수
    function updateSlider() {
        const offset = -currentIndex * 100;
        slides.style.transform = `translateX(${offset}%)`;
        // 바 영역
        const ulEl = document.querySelector(".pagerUl");
        const liEl = ulEl.querySelectorAll("li");
        liEl.forEach((li, idx) => {
            li.classList.remove("active");
            if (currentIndex === idx) {
                li.classList.add("active");
            }
        });
    }
});
