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
            const response = JSON.parse(xhr.responseText);
            const evento = response.evento;
            const immagine = response.immagine;
            const responseDiv = document.querySelector("#response");
            responseDiv.innerHTML = `
                
                <div class="eventoContainer">
                    <h1 class="categoria">Categoria: ${evento.categoria}</h1>
                <div class="sfondoContainer">
                    <div class="topEventoContainer">
                        <div class="dataInizio">${evento.data_inizio}</div>
                        <img src="/pictures/cestino.png" alt="cestino">
                    </div>
                    <img src="${immagine}" alt="Immagine dell'evento">

                    <div class="bottomEventoContainer">
                        <div class="bottomEventoSu">
                            <div>Titolo: ${evento.titolo}</div>
                            
                        </div>
                        <div class="bottomEventoGiu">
                            <img class="posizioneImmagine" src="/pictures/posizione.png">
                            <div class="luogo">Luogo: ${evento.luogo}</div>
                            <button class="leggiPiu">Leggi di più</button>
                        </div>
                        
                    </div>
                
                </div>
                
            </div>
                
            `;
        } else {
            console.error(xhr.statusText);
        }
    };

    xhr.onerror = function () {
        console.error("Errore di rete durante la richiesta.");
    };

    xhr.send(formData);
});
