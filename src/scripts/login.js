document.querySelector("#loginForm").addEventListener("submit", (e) => {
    e.preventDefault(); // impedisci di ricaricare
    const data = new FormData(e.target); // prende i dati dal form
    const body = {
        email: data.get("email"),
        password: data.get("password"),
    };
    fetch("/auth", {  // richiesta post passando i dati come JSON
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => {
            if (res.ok) return res.json();  // torna un json
            throw new Error(res.statusText);
        })
        .then((data) => {
            localStorage.setItem("utente", data); // Salva i dati dell'utente nel localStorage
            if (data.isAdmin) {
                window.location.href = "/admin";  // se sei admin reindirizza nella pag admin altrimenti utente loggato
            } else {
                window.location.href = "/homepage-log.html";   
            }
        })
        .catch((err) => console.log(err));
});
