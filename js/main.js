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




