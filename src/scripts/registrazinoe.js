function registrazione() {
    return new Promise((resolve, reject) => {
        document
            .querySelector("#registrationForm")
            .addEventListener("submit", (e) => { // aspetta l'evento submit 
                e.preventDefault();  // impedisce di ricaricare la pagina
                const data = new FormData(e.target); // prende i dati dal form
                const body = {  // oggetto con i dati 
                    nome: data.get("nome"),
                    cognome: data.get("cognome"),
                    email: data.get("email"),
                    password: data.get("password"),
                };
                fetch("/api/utenti", {  // richiesta post  passando i dati come JSON
                    method: "POST",
                    body: JSON.stringify(body),
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                    .then((res) => res.json())
                    .then((data) => {})
                    .catch((err) => console.log(err));
            });
        resolve();  // risolve la promise dopo aver eseguito con successo la risposta
    });
}

/* modale per conferma registrazione */

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
// chiama la funzione registrazione  e quando è completata esegue funzione modale
registrazione().then(() => {
    modal();
});
