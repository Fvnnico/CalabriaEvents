function aggiungiPreferito(id_evento, iconaPreferiti) {
    // Verifica se l'evento è già nei preferiti
    const isPreferito = iconaPreferiti.classList.contains("preferito");

    if (isPreferito) {
        // Se l'evento è già nei preferiti, rimuovilo
        rimuoviPreferitoHome(id_evento, iconaPreferiti);
    } else {
        // Altrimenti, aggiungilo ai preferiti
        // Aggiorna l'icona
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

function rimuoviPreferitoHome(id_evento, iconaPreferiti) {
    // Verifica se l'icona è attualmente attiva
    const isPreferito = iconaPreferiti.classList.contains("preferito");

    // Invia una richiesta al server per rimuovere l'evento dai preferiti
    const xhr = new XMLHttpRequest();
    xhr.open("DELETE", `/api/preferiti/${id_evento}`);
    xhr.onload = function () {
        if (xhr.status === 204) {
            console.log("Rimosso dai preferiti db");

            // Se l'icona è attualmente attiva, cambiala in disattiva
            if (isPreferito) {
                iconaPreferiti.classList.remove("preferito");
                iconaPreferiti.src = "/pictures/preferiti-disattivo.png"; // Cambia l'icona del cuore preferiti
            }
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
