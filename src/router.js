const authRouter =  require("express").Router();
const path = require("path");

// Pagina homepage routing
authRouter.get("/", (req, res) => {
    const filePath = path.join(__dirname, "pages", "homepage.html");
    res.sendFile(filePath, (err) => {
        if (err) {
            console.log("error");
            res.status(500).send("Errore interno del server");
        }
    });
});

// Pagina di registrazione routing
authRouter.get("/registrazione", (req, res) => {
    const filePath = path.join(__dirname, "pages", "registrazione.html");
    res.sendFile(filePath, (err) => {
        if (err) {
            console.log(err);
            res.status(500).send("Errore interno del server");
        }
    });
});

// Pagina di login routing
authRouter.get("/login", (req, res) => {
    const filePath = path.join(__dirname, "pages", "login.html");
    res.sendFile(filePath, (err) => {
        if (err) {
            console.log(err);
            res.status(500).send("Errore interno del server");
        }
    });
});


// Pagina di homepage admin
authRouter.get("/admin", (req, res) => {
    const filePath = path.join(__dirname, "pages", "homepageAdmin.html");
    res.sendFile(filePath, (err) => {
        if (err) {
            console.log(err);
            res.status(500).send("Errore interno del server");
        }
    });
});



/*  test di pug */
authRouter.get("/test", (req, res) => {
    res.render("index", {
        title: "Pagina di test",
        message: "Questa è una pagina di test",
    });
});

module.exports = authRouter;