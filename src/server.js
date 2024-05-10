const express = require("express");
const multer = require("multer"); // per caricare dati
const bodyParser = require("body-parser"); // per il middleware
const path = require("path");

const app = express();
const port = 3300;

// Per controllare le richieste che vengono fatte HTTP via JSON o query string usando il bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./db");

// Serve per dare i file statici basandoti sulla richiesta, quindi se devi prendere una foto fai direttamente /pictures invece di tutta la path.
app.use("/pictures", express.static("src/public/pictures"));
app.use("/style", express.static("src/public/style"));
app.use("/src/scripts", express.static("src/scripts"));

const pages = require("./router"); // router
const api = require("./backend/api"); // api
const loginHandler = require("./backend/auth"); 

// Collega il router all'app principale
app.use("/", pages);


// Uso multer per l'upload di un singolo file ("immagine") e lo salva nella directory "./uploads/"
app.post("/upload",multer({ dest: "./uploads/" }).single("immagine"),(req, res) => {
        
        const evento = JSON.parse(req.body.evento); // oggetto evento
        const immagine = req.file; // Ottieni il percorso del file dell'immagine caricata
        db.query(
            "INSERT INTO eventi SET ?",  // inserisce l'evento con i dati relativi all'evento e la path dell'immagine
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
