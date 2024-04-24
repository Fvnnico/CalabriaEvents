const express = require("express");
const multer = require("multer"); // per caricare dati
const bodyParser = require("body-parser"); // per il middleware

const app = express();
const port = 3300;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const db = require("./db");

app.use("/pictures", express.static("src/public/pictures"));
app.use("/style", express.static("src/public/style"));
app.use("/src/scripts", express.static("src/scripts"));

const pages = require("./router"); // router
const api = require("./routes/api"); // api
const loginHandler = require("./routes/auth");

// Collega il router all'app principale
app.use("/", pages);

app.post(
    "/upload",
    multer({ dest: "./uploads/" }).single("immagine"),
    (req, res) => {
        // per gli eventi json
        const evento = JSON.parse(req.body.evento);
        const immagine = req.file.path; // Ottieni il percorso del file dell'immagine caricata
        db.query(
            "INSERT INTO eventi SET ?",
            [{ ...evento, immagine: immagine }], // Aggiungi il percorso del file all'array di valori
            (err, result) => {
                if (err) {
                    console.error(
                        "Errore durante l'inserimento dell'evento nel database MySQL:",
                        err
                    );
                    res.status(500).send(
                        "Errore durante l'inserimento dell'evento nel database MySQL"
                    );
                    return;
                }
                console.log("Nuovo evento inserito nel database MySQL");
                res.status(201).send(
                    "Evento inserito correttamente nel database MySQL"
                );
                console.log("files", req.file);
                console.log("evento", req.body.evento);
                res.ren
            }
        );
    }
);

// operazioni sul database backend
app.use("/api", api);
app.post("/auth", loginHandler);

// Gestione degli errori per le route non trovate
app.use((req, res, next) => {
    res.status(404).send("Route non trovata.");
    next();
});
// Avvio del server
app.listen(port, () => {
    console.log(`Server in ascolto sulla porta ${port}`);
});
