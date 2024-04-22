
const img = document.getElementById("hamburger");

function apriDropdown() {
    const dropdown = document.getElementById("dropdownApparso");    
    dropdown.classList.toggle("show");
    
    if (dropdown.classList.contains("show")) {
        img.setAttribute("src", "/pictures/x-chiudi.png");
    } else {
        img.setAttribute("src", "/pictures/hamburger.png"); // Icona Hamburger
    }



window.onclick = function (event) {
    if (!event.target.matches(".hamburger-menu")) {
        let dropdowns = document.getElementsByClassName("dropdownApparso");
        for (let i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i];
            if (openDropdown.classList.contains("show")) {
                openDropdown.classList.remove("show");
                img.setAttribute("src", "/pictures/hamburger.png");
            }
        }
    }
};
}