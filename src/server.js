const express = require("express");
const multer = require("multer");
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
app.post("/upload", multer({ dest: './uploads/' }).single("immagine"), (req, res) => {
    console.log("files", req.file);
    console.log("evento", req.body.evento);
})

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
