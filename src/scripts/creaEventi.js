document.querySelector("#eventiForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const formData = new FormData();
    const immagine = document.querySelector("#immagine").files[0];
    const body = {
        id_evento: data.get("id_evento"),
        titolo: data.get("titolo"),
        categoria: data.get("categoria"),
        data_inizio: data.get("data_inizio"),
        data_fine: data.get("data_fine"),
        luogo: data.get("luogo"),
        descrizione: data.get("descrizione"),
    };

    formData.append("immagine", immagine);
    formData.append("evento", JSON.stringify(body));

    try {
        await uploadFormData(formData);
        modal();
    } catch (error) {
        console.error(error);
    }
});

function uploadFormData(formData) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.open("POST", "/upload");

        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                const response = JSON.parse(xhr.responseText);
                resolve(response);
            } else {
                reject(new Error(xhr.statusText));
            }
        };

        xhr.onerror = function () {
            reject(new Error("Errore di rete durante la richiesta."));
        };

        xhr.send(formData);
    });
}

function modal() {
    let modal = document.getElementById("myModal");
    let btn = document.getElementById("crea-eventi");
    let span = document.getElementsByClassName("close")[0];

    btn.onclick = function () {
        modal.style.display = "block";
    };

    span.onclick = function () {
        modal.style.display = "none";
    };
    modal();
}


