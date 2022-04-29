"use strict";

function fetchAndDisplayProejctDescription(projectDescriptionFile) {
    fetch(projectDescriptionFile).then((response) => {
        return response.text();
    }).then((text) => {
        document.getElementById("project-description").innerHTML = text;
    }).catch((error) => {
        console.error(error);
    });
}

fetchAndDisplayProejctDescription("message-in-a-bottle.txt");

document.querySelector("#map-app-list").addEventListener("click", (event) => {
    const mapAppListItems = document.querySelector("#map-app-list").getElementsByTagName("li");
    for (let i = 0; i < mapAppListItems.length; i++) {
        if (mapAppListItems[i].classList.contains("active")) {
            mapAppListItems[i].classList.remove("active");
        }
    }
    document.getElementById(event.target.id).classList.add("active");

    document.querySelector("#map-app-iframe").setAttribute("src", event.target.id + ".html");

    const projectDescriptionFile = event.target.id + ".txt";
    fetchAndDisplayProejctDescription(projectDescriptionFile);
});