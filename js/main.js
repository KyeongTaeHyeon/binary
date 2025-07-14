const modal = document.getElementById("modal");
const btnOpenModal = document.querySelector(".modal");
const modalTemp = document.getElementById("ramenPopup");
const modalWrap = document.querySelector(".modalWrap");

document.querySelector(".modal").removeAttribute("href");

btnOpenModal.addEventListener("click", () => {
    modal.innerHTML = "";
    const cloneTemp = modalTemp.content.firstElementChild.cloneNode(true);
    modalWrap.style.display = "flex";
    modal.appendChild(cloneTemp);
});

function renderModal() {
    
}
