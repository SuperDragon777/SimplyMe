window.addEventListener("scroll", function () {
    const header = document.getElementById("mainHeader");
    if (window.scrollY > 50) {
        header.classList.add("small");
    } else {
        header.classList.remove("small");
    }
});

const element = document.getElementById("hom");
const element3 = document.getElementById("only_m");
const header_container = document.getElementById("header-container");
const Cb_text = document.getElementById("b_text");
const Cb_td = document.getElementById("b_text-div");
const pochemy_ya_tak_nazval_class = document.getElementById("pochemy_ya_tak_nazval_class");
const steam_workshop = document.getElementById("steam_workshop");
    document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded');
    element3.style.display = 'none'
    if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        console.log('Mobile user');
        element.style.display = 'none'
        element3.style.display = 'block'
        header_container.style.justifyContent = "center"
        Cb_text.style.fontSize = "calc(10px + 5vh)"
        Cb_td.style.paddingTop =  "0px"
        Cb_td.style.paddingBottom =  "0px"
        pochemy_ya_tak_nazval_class.style.flexDirection = "column"
        steam_workshop.style.height = "auto"
        steam_workshop.style.width = "auto"
        console.log('Mobile code done');

}
    console.log('All good');
});