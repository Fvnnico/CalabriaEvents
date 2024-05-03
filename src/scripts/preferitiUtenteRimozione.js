// Funzione per rimuovere un evento dai preferiti
function rimuoviPreferito(id_evento, iconaPreferiti) {
    
    const eventoContainer = iconaPreferiti.closest(".eventoContainer");
    if (eventoContainer) {
        eventoContainer.remove();
    }

    // Invia una richiesta al server per rimuovere l'evento dai preferiti
    const xhr = new XMLHttpRequest();
    xhr.open("DELETE", `/api/preferiti/${id_evento}`);
    xhr.onload = function () {
        if (xhr.status === 204) {
            console.log("Rimosso dai preferiti db");
        } else if (xhr.status >= 200 && xhr.status < 300) {
            console.log("L'evento è stato rimosso dai preferiti con successo.");
        } else {
            console.error("Errore durante la rimozione dell'evento dai preferiti:", xhr.statusText);
        }
    };
    xhr.onerror = function () {
        console.error("Errore di rete durante la richiesta.");
    };
    xhr.send();
}

