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
            } else {
                console.error(xhr.statusText);
            }
        };
    
        xhr.onerror = function () {
            console.error("Errore di rete durante la richiesta.");
        };
    
        xhr.send(formData);
    });



function modal() {
    let modal = document.getElementById("myModal");
    let btn = document.getElementById("accedi");
    let span = document.getElementsByClassName("close")[0];

    btn.onclick = function () {
        modal.style.display = "block";
    };

    span.onclick = function () {
        modal.style.display = "none";
    };
}


