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
                window.location.href = "/admin";
            } else {
                window.location.href = "/homepage-log.html";
            }
        })
        .catch((err) => console.log(err));
});
