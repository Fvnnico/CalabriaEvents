document.querySelector("#loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const body = {
        email: data.get("email"),
        password: data.get("password"),
    };
    fetch("/auth", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => {
            if (res.ok) return res.json();
            throw new Error(res.statusText);
        })
        .then((data) => {
            localStorage.setItem("utente", data);
            if (data.isAdmin) {
                // Se l'utente è un admin, reindirizza a una pagina esclusiva per gli admin
                window.location.href = "/admin";
            } else {
                // Altrimenti, reindirizza alla home page o a una pagina normale per gli utenti non-admin
                window.location.href = "/";
            }
        })
        .catch((err) => console.log(err));
});
