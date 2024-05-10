const xhr = new XMLHttpRequest();
xhr.open("GET", "/api/eventi");  // richiesta get su /api/eventi
xhr.onload = function () {
    if (xhr.status === 200) {
        const eventi = JSON.parse(xhr.response);   // parsa il json in oggetto
        const container = document.querySelector("#eventiContainer");
        
        eventi.forEach(evento => {   // per ogni evento  esegue queste azioni
            const html = `
                
                <div class="eventoContainer" id_evento="${evento.id_evento}">
                <div class="categoria">Categoria: ${evento.categoria}</div>
                    <div class="sfondoContainer">
                        <div class="topEventoContainer">
                            <div class="dataInizio">${evento.data_inizio}</div>
                            <img id="preferiti" class="preferiti" src="/pictures/preferiti-disattivo.png" alt="preferiti"  onclick="aggiungiPreferito(${evento.id_evento}, this);"/>                        </div>
                        <img class="immagineSfondo" src="${evento.immagine}" alt="Immagine dell'evento">
                        <div class="bottomEventoContainer">
                            <div class="bottomEventoSu">
                                <div>Titolo: ${evento.titolo}</div>
                            </div>
                            <div class="bottomEventoGiu">
                                <img src="/pictures/posizione.png" class="posizioneImmagine" alt="posizione">
                                <div class="luogo">Luogo: ${evento.luogo}</div>
                                <a href="/eventi:${evento.id_evento}">
                                <button id="leggiDiPiu" class="modifica" >Leggi di più</button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            container.innerHTML += html;
        });
    } else {
        console.error("Errore durante il recupero degli eventi:", xhr.statusText);
    }
};
xhr.onerror = function () {
    console.error("Errore di rete durante la richiesta.");
};
xhr.send(); 

