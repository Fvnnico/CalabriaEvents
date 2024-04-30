const xhr = new XMLHttpRequest();
xhr.open("GET", "/api/eventi");
xhr.onload = function () {
    if (xhr.status === 200) {
        const eventi = JSON.parse(xhr.response);
        console.log(eventi);
        const container = document.querySelector("#eventiContainer");
        
        
        eventi.forEach(evento => {
            const html = `
                <div class="eventoContainer">
                    <div class="sfondoContainer">
                        <div class="topEventoContainer">
                            <div class="dataInizio">${evento.data_inizio}</div>
                            <img src="/pictures/cestino.png" alt="cestino">
                        </div>
                        <img class="immagineSfondo" src="${evento.immagine}" alt="Immagine dell'evento">
                        <div class="bottomEventoContainer">
                            <div class="bottomEventoSu">
                                <div>Titolo: ${evento.titolo}</div>
                            </div>
                            <div class="bottomEventoGiu">
                                <img src="/pictures/posizione.png" class="posizioneImmagine" alt="posizione">
                                <div class="luogo">Luogo: ${evento.luogo}</div>
                                <button class="leggiPiu">Leggi di più</button>
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
