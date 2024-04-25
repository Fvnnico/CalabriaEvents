document.querySelector("#eventiForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const formData = new FormData();
    const immagine = document.querySelector("#immagine").files[0];
    const body = {
        titolo: data.get("titolo"),
        categoria: data.get("categoria"),
        data_inizio: data.get("data_inizio"),
        data_fine: data.get("data_fine"),
        luogo: data.get("luogo"),
        descrizione: data.get("descrizione"),
    };
    
    formData.append("immagine", immagine);
    formData.append("evento", JSON.stringify(body));
    
    const xhr = new XMLHttpRequest();

    xhr.open("POST", "/upload");

    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            console.log("Richiesta completata con successo");
            const response = JSON.parse(xhr.responseText); // Parse la risposta JSON
            const evento = response.evento; // Ottenere direttamente l'oggetto evento dalla risposta
            const responseDiv = document.querySelector("#response");
            responseDiv.innerHTML = `
                <h2>Evento Creato con Successo</h2>
                <p>Titolo: ${evento.titolo}</p>
                <p>Categoria: ${evento.categoria}</p>
                <p>Data inizio: ${evento.data_inizio}</p>
                <p>Data fine: ${evento.data_fine}</p>
                <p>Luogo: ${evento.luogo}</p>
                <p>Descrizione: ${evento.descrizione}</p>
                <img src="${response.immagine}" alt="Immagine dell'evento">
            `;
        } else {
            // Gestione degli errori
            console.error(xhr.statusText);
        }
    };
    
    

    xhr.onerror = function () {
        // Gestione degli errori di rete
        console.error("Errore di rete durante la richiesta.");
    };

    xhr.send(formData);
});
