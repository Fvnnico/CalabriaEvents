const authRouter = require("express").Router();  // gestire le route
const path = require("path"); // per i percorsi del file
const db = require("./db"); // il db in generale



authRouter.get("/", (req, res) => {
    const filePath = path.join(__dirname, "pages", "homepage.html");
    res.sendFile(filePath, (err) => {
        if (err) {
            console.log("error");
            res.status(500).send("Errore interno del server");
        }
    });
});

authRouter.get("/utente", (req, res) => {
    const filePath = path.join(__dirname, "pages", "homepage-log.html");
    res.sendFile(filePath, (err) => {
        if (err) {
            console.log("error");
            res.status(500).send("Errore interno del server");
        }
    });
});

authRouter.get("/preferiti", (req, res) => {
    const filePath = path.join(__dirname, "pages", "preferiti.html");
    res.sendFile(filePath, (err) => {
        if (err) {
            console.log("error");
            res.status(500).send("Errore interno del server");
        }
    });
});




authRouter.get("/registrazione", (req, res) => {
        const filePath = path.join(__dirname, "pages", "registrazione.html");
        res.sendFile(filePath, (err) => {
            if (err) {
                console.log(err);
                res.status(500).send("Errore interno del server");
            }
        });
    });


authRouter.get("/login", (req, res) => {
    const filePath = path.join(__dirname, "pages", "login.html");
    res.sendFile(filePath, (err) => {
        if (err) {
            console.log(err);
            res.status(500).send("Errore interno del server");
        }
    });
});


authRouter.get("/admin", (req, res) => {
    const filePath = path.join(__dirname, "pages", "admin.html");
    res.sendFile(filePath, (err) => {
        if (err) {
            console.log(err);
            res.status(500).send("Errore interno del server");
        }
    });
});


authRouter.get("/eventi", (req, res) => {
    const filePath = path.join(__dirname, "pages", "creazione-eventi.html");
    res.sendFile(filePath, (err) => {
        if (err) {
            console.log(err);
            res.status(500).send("Errore interno del server");
        }
    });
});

authRouter.get("/eventi:id", (req, res) => {
    const filePath = path.join(__dirname, "pages", "eventiSpecifico.html");
    res.sendFile(filePath, (err) => {
        if (err) {
            console.log(err);
            res.status(500).send("Errore interno del server");
        }
    });
});

authRouter.get("/api/eventi", async (req, res) => {
    try {
        const query = "SELECT * FROM eventi";
        db.query(query, (err, result) => {
            if (err) {
                console.error("Errore durante il recupero degli eventi:", err);
                res.status(500).json({ error: "Errore durante il recupero degli eventi." });
                return;
            }
            // Invia i dati degli eventi come JSON
            res.json(result);
        });
    } catch (error) {
        console.error("Errore durante il recupero degli eventi:", error);
        res.status(500).json({ error: "Errore durante il recupero degli eventi." });
    }
});


// route per recuperare le foto da questa path 
authRouter.get("/uploads/:img", (req, res) => {
    const filePath = path.join(__dirname, "../uploads", req.params.img);
    res.sendFile(filePath, (err) => {
        if (err) {
            console.log(err);
            res.status(500).send("Errore interno del server");
        }
    });
});

module.exports = authRouter;
