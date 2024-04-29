const express = require("express");
const multer = require("multer"); // per caricare dati
const bodyParser = require("body-parser"); // per il middleware
const path = require("path");

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



app.post("/upload",multer({ dest: "./uploads/" }).single("immagine"),(req, res) => {
        
        const evento = JSON.parse(req.body.evento);
        const immagine = req.file; // Ottieni il percorso del file dell'immagine caricata
        db.query(
            "INSERT INTO eventi SET ?",
            [{ ...evento, immagine: immagine.path.replace("\\", '/')}], 
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
                res.status(201).json({
                    evento: evento,
                    immagine: immagine.path.replace("\\", '/'),
                });
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
