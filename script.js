window.addEventListener("scroll", function () {
    const header = document.getElementById("mainHeader");
    if (window.scrollY > 50) {
        header.classList.add("small");
    } else {
        header.classList.remove("small");
    }
});

const element = document.getElementById("hom");
const element2 = document.getElementById("hom2");
const element3 = document.getElementById("only_m");
const wall = document.getElementById("wall");
const header_container = document.getElementById("header-container");
    document.addEventListener('DOMContentLoaded', function() {
    element3.style.display = 'none'
    if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        element.style.display = 'none'
        element2.style.display = 'none'
        element3.style.display = 'block'
        wall.style.maxHeight = "300px"
        header_container.style.justifyContent = "center"
}
});

