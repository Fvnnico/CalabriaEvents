const api = require("express").Router();
const bcrypt = require("bcrypt");
const db = require("../db");

const crudUtenti = function (nomeTabella) {
    const router = require("express").Router();

    // prende tutto dalla tabella
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

    //ritorna un elemento dalla tabella
    router.get("/:id", (req, res) => {
        const id = req.params.id;
        db.query(
            `SELECT * FROM ${nomeTabella} WHERE id_utente = ${id}`,
            (err, [results, _]) => {
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

    // inserisci nella tabella
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

    // prende tutti eventi
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

    // prende un singolo evento
    router.get("/:id", (req, res) => {
        const id = req.params.id;
        db.query(
            `SELECT * FROM ${nomeTabella} WHERE id_evento = ${id}`,
            (err, results) => {
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

    // elimina un singolo evento
    router.delete("/:id", (req, res) => {
        const id = req.params.id;
        console.log(req.params.id);
        db.query(
            `DELETE FROM ${nomeTabella} WHERE id_evento = ${id}`,
            (err, results) => {
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
        );
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

    // seleziona un evento dai preferiti
    router.get("/:id", (req, res) => {
        const id = req.params.id;
        db.query(
            `SELECT * FROM ${nomeTabella} WHERE id_preferiti = ${id}`,
            (err, results) => {
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

    // inserisci nella tabella preferiti l'evento
    router.post("/", (req, res) => {
        const id_evento = req.body.id_evento;

        // Controlla se id_evento è fornito
        if (!id_evento) {
            res.status(400).send("L'id_evento è obbligatorio.");
            return;
        }

        db.query(
            `INSERT INTO ${nomeTabella} (id_evento) VALUES (?)`,
            [id_evento],
            (err, results) => {
                if (err) {
                    console.error(err);
                    res.status(500).send("Errore interno del server.");
                    return;
                }
                res.status(201).send(
                    "Evento aggiunto ai preferiti con successo."
                );
            }
        );
    });

    // Serve epr eliminare l'evento preferito dalla tabella dei preferiti
    router.delete("/:id", (req, res) => {
        const id = req.params.id;

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
                    res.status(404).send(
                        "Nessun evento preferito trovato con questo ID"
                    );
                    return;
                }
                res.status(204).send(); // 204 No Content
            }
        );
    });

    return router;
};

// Collega i route e vengono usato i nomi della tabelle del db come parametro
api.use("/utenti", crudUtenti("utenti")); // tutte  le richieste che iniziano con /utenti verrano gestite da crudUtenti, etc.
api.use("/eventi", crudEventi("eventi"));
api.use("/preferiti", crudPreferiti("preferiti"));

module.exports = api;
