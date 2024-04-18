document.querySelector("#registrationForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const body = {
        nome: data.get('nome'),
        cognome: data.get('cognome'),
        email: data.get('email'),
        password: data.get('password'),
    }
    fetch("/api/utenti", {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((res) => res.json())
        .then((data) => {

        })
        .catch((err) => console.log(err));
});