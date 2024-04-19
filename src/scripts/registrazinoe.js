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
        // Get the modal
    let modal = document.getElementById("myModal");

    // Get the button that opens the modal
    let btn = document.getElementById("accedi");

    // Get the <span> element that closes the modal
    let span = document.getElementsByClassName("close")[0];

    // When the user clicks on the button, open the modal
    btn.onclick = function() {
    modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
    modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    /* window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
    }  */
}

registrazione().then(modal());