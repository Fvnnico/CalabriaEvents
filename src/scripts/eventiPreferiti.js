const xhrEventi = new XMLHttpRequest();
xhrEventi.open("GET", "/api/eventi");
xhrEventi.onload = function () {
    if (xhrEventi.status === 200) {
        const eventi = JSON.parse(xhrEventi.response);
        const container = document.querySelector("#eventiContainer");

        // Funzione per caricare gli eventi preferiti dopo aver ottenuto gli eventi
        function caricaPreferiti() {
            const xhrPreferiti = new XMLHttpRequest();
            xhrPreferiti.open("GET", "/api/preferiti");
            xhrPreferiti.onload = function () {
                if (xhrPreferiti.status === 200) {
                    const preferiti = JSON.parse(xhrPreferiti.response);

                    // Ottieni gli ID degli eventi preferiti
                    const idPreferiti = preferiti.map(preferito => preferito.id_evento);

                    // Filtra gli eventi per includere solo quelli che sono preferiti
                    const eventiPreferiti = eventi.filter(evento => idPreferiti.includes(evento.id_evento));

                    // Visualizza solo gli eventi preferiti
                    eventiPreferiti.forEach(evento => {
                        const html = `
                            <div class="eventoContainer" id_evento="${evento.id_evento}">
                                <div class="categoria">Categoria: ${evento.categoria}</div>
                                <div class="sfondoContainer">
                                    <div class="topEventoContainer">
                                        <div class="dataInizio">${evento.data_inizio}</div>
                                        <img class="preferiti preferito" src="/pictures/preferiti-attivo.png" alt="preferiti" onclick="aggiungiPreferito(${evento.id_evento}, this);"/>
                                    </div>
                                    <img class="immagineSfondo" src="${evento.immagine}" alt="Immagine dell'evento">
                                    <div class="bottomEventoContainer">
                                        <div class="bottomEventoSu">
                                            <div>Titolo: ${evento.titolo}</div>
                                        </div>
                                        <div class="bottomEventoGiu">
                                            <img src="/pictures/posizione.png" class="posizioneImmagine" alt="posizione">
                                            <div class="luogo">Luogo: ${evento.luogo}</div>
                                            <button class="modifica">Leggi di più</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `;
                        container.innerHTML += html;
                    });
                } else {
                    console.error("Errore durante il recupero degli eventi preferiti:", xhrPreferiti.statusText);
                }
            };
            xhrPreferiti.onerror = function () {
                console.error("Errore di rete durante la richiesta per ottenere gli eventi preferiti.");
            };
            xhrPreferiti.send();
        }

        // Carica gli eventi preferiti
        caricaPreferiti();
    } else {
        console.error("Errore durante il recupero degli eventi:", xhrEventi.statusText);
    }
};
xhrEventi.onerror = function () {
    console.error("Errore di rete durante la richiesta per ottenere gli eventi.");
};
xhrEventi.send();
