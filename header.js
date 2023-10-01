window.onscroll = function() {moveHeader()};

var header = document.getElementById("header");
var tabs = document.getElementById("tabs");
var sticky = header.offsetTop;

function moveHeader() {
    if (document.documentElement.offsetTop > sticky) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }

    if (document.documentElement.scrollTop == 0) {
        tabs.classList.remove("withshadow");
    } else {
        tabs.classList.add("withshadow");
    }
}