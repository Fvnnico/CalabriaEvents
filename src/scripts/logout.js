

function logout() {
    // Aggiungi un evento di click all'icona dell'omino
document.getElementById("logoutIcon").addEventListener("click", function() {
    
    modal.style.display = "block";
});
    let modal = document.getElementById("myModal");
    let logoutButton = document.getElementById("logoutButton");
    let cancelButton = document.getElementById("cancelButton");

    // Quando l'utente clicca su "Logout", effettua il logout
    logoutButton.onclick = function () {
        window.location.href = "/"; 
    };

    cancelButton.onclick = function () {
        modal.style.display = "none";
    };

    
}

