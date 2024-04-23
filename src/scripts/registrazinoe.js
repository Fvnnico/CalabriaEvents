window.resizeTo(1351, 430);

function registrazione() {
    return new Promise((resolve, reject) => {
        
    document.querySelector("#registrationForm").addEventListener("submit", (e) => {
            e.preventDefault();
            const data = new FormData(e.target);
            const body = {
                nome: data.get("nome"),
                cognome: data.get("cognome"),
                email: data.get("email"),
                password: data.get("password"),
            };
            fetch("/api/utenti", {
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
        resolve();
    });
    
};


/* modale per conferma registrazione */

function modal() {
        
    let modal = document.getElementById("myModal");

    
    let btn = document.getElementById("accedi");

    
    let span = document.getElementsByClassName("close")[0];

    
    btn.onclick = function() {
    modal.style.display = "block";
    }

    
    span.onclick = function() {
    modal.style.display = "none";
    }

    
}

registrazione().then(() => {
    modal();
});
