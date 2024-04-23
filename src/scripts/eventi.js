document.querySelector("#eventiForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const formData= new FormData();
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
    const fileBody = JSON.stringify(body);
    formData.append("body", new Blob([fileBody]));
    fetch("/api/upload", {
        method: "POST",
        body: formData,
        headers: {
            "Content-Type": 'multipart/form-data;',
        },
    })
        .then((res) => {
            if (res.ok) return res.json();
            throw new Error(res.statusText);
        })
        .then((data) => {
            console.log(data);
        })
        .catch((err) => console.log(err));
});
