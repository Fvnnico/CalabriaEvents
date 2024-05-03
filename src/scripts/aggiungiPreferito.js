
function aggiungiPreferito(id_evento, iconaPreferiti) {
    // Verifica se l'evento è già nei preferiti
    const isPreferito = iconaPreferiti.classList.contains("preferito");

    // Se l'evento è già nei preferiti, lo rimuovi
    if (isPreferito) {
        iconaPreferiti.classList.remove("preferito");
        iconaPreferiti.src = "/pictures/preferiti.png"; // Cambia l'icona del cuore preferiti
        
        // Rimuovi visivamente l'elemento dalla pagina
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

    } else {
        // Se l'evento non è nei preferiti, lo aggiungi
        iconaPreferiti.classList.add("preferito");
        iconaPreferiti.src = "/pictures/preferiti-attivo.png"; // Cambia l'icona del cuore preferiti
        
        // Invia una richiesta al server per aggiungere l'evento ai preferiti
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/api/preferiti");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = function () {
            if (xhr.status === 200 || xhr.status === 201) {
                console.log("Evento aggiunto ai preferiti con successo.");
            } else {
                console.error("Errore durante l'aggiunta dell'evento ai preferiti:", xhr.statusText);
            }
        };
        
        xhr.onerror = function () {
            console.error("Errore di rete durante la richiesta.");
        };
        xhr.send(JSON.stringify({ id_evento: id_evento }));
    }
}
