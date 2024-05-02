const api = require("express").Router();
const bcrypt = require("bcrypt");
const db = require("../db");
const multer = require("multer");

const crudUtenti = function (nomeTabella) {
    const router = require("express").Router();

    //ritorna tutto
    router.get("/", (req, res) => {
        db.query("SELECT * FROM " + nomeTabella, (err, [results, _]) => {
            if (err) {
                console.error(err);
                res.status(500).send("Errore interno del server");
                return;
            }
            if (!results) {
                res.status(404).send("Nessun elemento trovato");
                return;
            }
            if (results.length === 0) {
                res.status(404).send("Nessun elemento trovato");
                return;
            }
            res.json(results);
        });
    });

    //ritorna un elemento
    router.get("/:id", (req, res) => {
        const id = req.params.id;
        db.query(
            `SELECT * FROM ${nomeTabella} WHERE id_utente = ${id}`,(err, [results, _]) => {
                if (err) {
                    console.error(err);
                    res.status(500).send("Errore interno del server");
                    return;
                }
                if (!results) {
                    res.status(404).send("Nessun elemento trovato");
                    return;
                }
                if (results.length === 0) {
                    res.status(404).send("Nessun elemento trovato");
                    return;
                }
                res.json(results);
            }
        );
    });

    router.post("/", async (req, res) => {
        const body = req.body;
        /* encrypta la password nel database */
        if (body.password) {
            body.password = await bcrypt.hash(body.password, 10);
        }

        db.query(
            `INSERT INTO ${nomeTabella} SET ` + db.escape(body),
            (err, results, fields) => {
                if (err) {
                    console.error(err);
                    res.status(500).send("Errore interno del server");
                    return;
                }
                if (!results) {
                    res.status(404).send("Nessun elemento trovato");
                    return;
                }
                if (results.length === 0) {
                    res.status(404).send("Nessun elemento trovato");
                    return;
                }
                res.json(results);
            }
        );
    });

    return router;
};



const crudEventi = function (nomeTabella) {
    const router = require("express").Router();

    

    router.get("/", (req, res) => {
        db.query("SELECT * FROM " + nomeTabella, (err, [results, _]) => {
            if (err) {
                console.error(err);
                res.status(500).send("Errore interno del server");
                return;
            }
            if (!results) {
                res.status(404).send("Nessun elemento trovato");
                return;
            }
            if (results.length === 0) {
                res.status(404).send("Nessun elemento trovato");
                return;
            }
            res.json(results);
        });
    });

    router.get("/:id", (req, res) => {
        const id = req.params.id;
        db.query(
            `SELECT * FROM ${nomeTabella} WHERE id_preferiti = ${id}`,(err, results) => {
                if (err) {
                    console.error(err);
                    res.status(500).send("Errore interno del server");
                    return;
                }
                if (!results) {
                    res.status(404).send("Nessun elemento trovato");
                    return;
                }
                if (results.length === 0) {
                    res.status(404).send("Nessun elemento trovato");
                    return;
                }
                res.json(results);
            }
        );
    });

    router.delete("/:id", (req, res) => {
        const id = req.params.id;
        console.log(req.params.id);
        db.query(
            `DELETE FROM ${nomeTabella} WHERE id_evento = ${id}`, (err, results) => {
                if (err) {
                    console.error(err);
                    res.status(500).send("Errore interno del server");
                    return;
                }
                if (results.affectedRows === 0) {
                    res.status(404).send("Nessun elemento trovato");
                    return;
                }
                res.status(204).send(results); // 204 No Content
            }
        )
    });

    return router;
};

const crudPreferiti = function (nomeTabella) {
    const router = require("express").Router();


    router.get("/", (req, res) => {
        // Query per selezionare tutti i dati degli eventi basati sugli ID evento presenti nella tabella dei preferiti
        const query = `
            SELECT *
            FROM eventi
            WHERE id_evento IN (
                SELECT id_evento
                FROM preferiti
            )
        `;
        
        // Esegui la query nel database
        db.query(query, (err, results) => {
            if (err) {
                console.error(err);
                res.status(500).send("Errore interno del server");
                return;
            }
            // Controlla se sono stati trovati preferiti
            if (results.length === 0) {
                res.status(404).send("Nessun preferito trovato");
                return;
            }
            // Restituisci i preferiti trovati come risposta
            res.json(results);
        });
    });
    

    router.get("/:id", (req, res) => {
        const id = req.params.id;
        db.query(
            `SELECT * FROM ${nomeTabella} WHERE id_preferiti = ${id}`,(err, results) => {
                if (err) {
                    console.error(err);
                    res.status(500).send("Errore interno del server");
                    return;
                }
                if (!results) {
                    res.status(404).send("Nessun elemento trovato");
                    return;
                }
                if (results.length === 0) {
                    res.status(404).send("Nessun elemento trovato");
                    return;
                }
                res.json(results);
            }
        );
    });

    router.post("/", (req, res) => {
        const id_evento = req.body.id_evento;
    
        // Controlla se id_evento è fornito nel corpo della richiesta
        if (!id_evento) {
            res.status(400).send("L'id_evento è obbligatorio.");
            return;
        }
    
        // Esegui una query per inserire l'evento nella tabella dei preferiti
        db.query(
            `INSERT INTO ${nomeTabella} (id_evento) VALUES (?)`,
            [id_evento],
            (err, results) => {
                if (err) {
                    console.error(err);
                    res.status(500).send("Errore interno del server.");
                    return;
                }
                res.status(201).send("Evento aggiunto ai preferiti con successo.");
            }
        );
    });
    
    
    
    
    router.delete("/:id", (req, res) => {
        const id = req.params.id;
    
        // Esegui una query per eliminare l'evento preferito dalla tabella dei preferiti
        db.query(
            `DELETE FROM ${nomeTabella} WHERE id_evento = ?`,
            [id],
            (err, results) => {
                if (err) {
                    console.error(err);
                    res.status(500).send("Errore interno del server");
                    return;
                }
                // Controlla se sono state eliminate righe
                if (results.affectedRows === 0) {
                    res.status(404).send("Nessun evento preferito trovato con questo ID");
                    return;
                }
                res.status(204).send(); // 204 No Content
            }
        );
    });
    
    

    return router;
}

api.use("/utenti", crudUtenti("utenti"));
api.use("/eventi", crudEventi("eventi"));
api.use("/preferiti", crudPreferiti("preferiti"));

module.exports = api;
