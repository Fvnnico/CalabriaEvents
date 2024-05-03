

function logout() {
    // Aggiungi un evento di click all'icona dell'omino
document.getElementById("logoutIcon").addEventListener("click", function() {
    // Mostra il modale quando si fa clic sull'icona dell'omino
    modal.style.display = "block";
});
    let modal = document.getElementById("myModal");
    let logoutButton = document.getElementById("logoutButton");
    let cancelButton = document.getElementById("cancelButton");

    // Quando l'utente clicca su "Logout", effettua il logout
    logoutButton.onclick = function () {
        // Qui inserisci la logica per effettuare il logout
        window.location.href = "/"; // Ad esempio, reindirizza alla pagina di logout
    };

    // Quando l'utente clicca su "Annulla", chiudi il modale
    cancelButton.onclick = function () {
        modal.style.display = "none";
    };

    
}

