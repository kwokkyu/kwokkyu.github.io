"use strict";

let menuAnchor = document.querySelector(".menu-anchor");
menuAnchor.addEventListener("click", () => {
    let menu = document.querySelector("#menu");
    if (menu.className == "menu-horizontal") {
        menu.className = "menu-vertical";
    } else {
        menu.className = "menu-horizontal";
    }
});

window.addEventListener("resize", () => {
    let menu = document.querySelector("#menu");
    if (window.innerWidth >= 768) {
        menu.className = "menu-horizontal";
    }
});