const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const mysql = require('mysql');
const csrf = require('csurf');

const app = express();
const port = 3300;


// Configurazione del database MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'adminFigo',
    password: 'admin',
    database: 'CalabriaEventi',
});

connection.connect((error) => {
    if (error) {
        console.error('Errore durante la connessione al database:', error);
        return;
    }
    console.log('Connessione al database MySQL avvenuta con successo!');
});
 
// Middleware per la protezione delle route amministratore                 -- spostato
const proteggiRouteAmministratore = (req, res, next) => {
    if (!req.session.userId || !isAdmin(req.session.userId)) {
        return res.status(403).send('Accesso non autorizzato.');
    }
    next();
};

// Middleware per il parsing dei dati della richiesta
app.use(bodyParser.json());

// Middleware per la gestione delle sessioni utente
app.use(session({
    secret: 'secret_key',
    resave: false,
    saveUninitialized: true
}));

// Middleware per la protezione CSRF
app.use(csrf());

// Middleware per la generazione del token CSRF
app.use((req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    req.session.csrfToken = res.locals.csrfToken;
    next();
});

// Gestione della registrazione utente
app.post('/registrazione', (req, res) => {
    // Verifica del token CSRF
    if (!req.session.csrfToken || req.body.csrfToken !== req.session.csrfToken) {
        return res.status(403).send('Token CSRF non valido.');
    }

    const { nome, email, password } = req.body;

    // Crittografa la password prima di memorizzarla nel database
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            console.error('Errore durante la crittografia della password:', err);
            res.status(500).send('Errore durante la registrazione.');
            return;
        }

        // Salva l'utente nel database con la password crittografata
        const query = 'INSERT INTO Utenti (nome, email, password) VALUES (?, ?, ?)';
        const values = [nome, email, hash];

        connection.query(query, values, (error, results, fields) => {
            if (error) {
                console.error('Errore durante la registrazione dell\'utente:', error);
                res.status(500).send('Errore durante la registrazione.');
                return;
            }

            console.log('Utente registrato con successo!');
            res.status(200).send('Utente registrato con successo!');
        });
    });
});

// Gestione del login utente
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Verifica dell'email e della password nel database
    const query = 'SELECT * FROM Utenti WHERE email = ?';
    connection.query(query, [email], (error, results, fields) => {
        if (error) {
            console.error('Errore durante il login:', error);
            res.status(500).send('Errore durante il login.');
            return;
        }

        if (results.length === 0) {
            res.status(401).send('Email o password non validi.');
            return;
        }

        const user = results[0];

        // Verifica della password
        bcrypt.compare(password, user.password, (err, result) => {
            if (err || !result) {
                res.status(401).send('Email o password non validi.');
                return;
            }

            // Login utente riuscito, salvare l'ID utente nella sessione
            req.session.userId = user.id;
            res.status(200).send('Login effettuato con successo!');
        });
    });
});

// Middleware per la protezione delle route riservate
const proteggiRouteRiservata = (req, res, next) => {
    if (!req.session.userId) {
        return res.status(401).send('Utente non autenticato.');
    }
    next();
};

// Recupero degli eventi
app.get('/eventi', (req, res) => {
    // Query per recuperare tutti gli eventi dal database
    const query = 'SELECT * FROM Eventi';
    connection.query(query, (error, results, fields) => {
        if (error) {
            console.error('Errore durante il recupero degli eventi:', error);
            res.status(500).send('Errore durante il recupero degli eventi.');
            return;
        }

        res.status(200).json(results);
    });
});

// Aggiunta di un evento ai preferiti di un utente
app.post('/preferiti', proteggiRouteRiservata, (req, res) => {
    const { id_evento } = req.body;
    const id_utente = req.session.userId;

    // Verifica se l'evento è già nei preferiti dell'utente
    const verificaQuery = 'SELECT * FROM Preferiti WHERE id_utente = ? AND id_evento = ?';
    connection.query(verificaQuery, [id_utente, id_evento], (error, results, fields) => {
        if (error) {
            console.error('Errore durante la verifica dei preferiti:', error);
            res.status(500).send('Errore durante la verifica dei preferiti.');
            return;
        }

        if (results.length > 0) {
            res.status(400).send('L\'evento è già nei preferiti.');
            return;
        }

        // Aggiunge l'evento ai preferiti dell'utente
        const aggiuntaQuery = 'INSERT INTO Preferiti (id_utente, id_evento) VALUES (?, ?)';
        connection.query(aggiuntaQuery, [id_utente, id_evento], (err, result) => {
            if (err) {
                console.error('Errore durante l\'aggiunta dell\'evento ai preferiti:', err);
                res.status(500).send('Errore durante l\'aggiunta dell\'evento ai preferiti.');
                return;
            }

            res.status(200).send('Evento aggiunto ai preferiti con successo.');
        });
    });
});

// Rimozione di un evento dai preferiti di un utente
app.delete('/preferiti/:id_evento', proteggiRouteRiservata, (req, res) => {
    const id_evento = req.params.id_evento;
    const id_utente = req.session.userId;

    // Rimuove l'evento dai preferiti dell'utente
    const rimozioneQuery = 'DELETE FROM Preferiti WHERE id_utente = ? AND id_evento = ?';
    connection.query(rimozioneQuery, [id_utente, id_evento], (error, results, fields) => {
        if (error) {
            console.error('Errore durante la rimozione dell\'evento dai preferiti:', error);
            res.status(500).send('Errore durante la rimozione dell\'evento dai preferiti.');
            return;
        }

        res.status(200).send('Evento rimosso dai preferiti con successo.');
    });
});

// Creazione di un nuovo evento (solo per amministratori)
app.post('/crea-evento', proteggiRouteAmministratore, (req, res) => {
    const { nome_evento, data_inizio, luogo, locandina, descrizione_evento } = req.body;

    // Inserisce il nuovo evento nel database
    const query = 'INSERT INTO Eventi (nome_evento, data_inizio, luogo, locandina, descrizione_evento) VALUES (?, ?, ?, ?, ?)';
    const values = [nome_evento, data_inizio, luogo, locandina, descrizione_evento];

    connection.query(query, values, (error, results, fields) => {
        if (error) {
            console.error('Errore durante la creazione dell\'evento:', error);
            res.status(500).send('Errore durante la creazione dell\'evento.');
            return;
        }

        res.status(200).send('Evento creato con successo!');
    });
});

// Modifica di un evento (solo per amministratori)
app.put('/modifica-evento/:id_evento', proteggiRouteAmministratore, (req, res) => {
    const id_evento = req.params.id_evento;
    const { nome_evento, data_inizio, luogo, locandina, descrizione_evento } = req.body;

    // Query per aggiornare i dettagli dell'evento nel database
    const query = 'UPDATE Eventi SET nome_evento = ?, data_inizio = ?, luogo = ?, locandina = ?, descrizione_evento = ? WHERE id = ?';
    const values = [nome_evento, data_inizio, luogo, locandina, descrizione_evento, id_evento];

    connection.query(query, values, (error, results, fields) => {
        if (error) {
            console.error('Errore durante la modifica dell\'evento:', error);
            res.status(500).send('Errore durante la modifica dell\'evento.');
            return;
        }

        res.status(200).send('Evento modificato con successo!');
    });
});

// Eliminazione di un evento (solo per amministratori)
app.delete('/elimina-evento/:id_evento', proteggiRouteAmministratore, (req, res) => {
    const id_evento = req.params.id_evento;

    // Query per eliminare l'evento dal database
    const query = 'DELETE FROM Eventi WHERE id = ?';
    
    connection.query(query, [id_evento], (error, results, fields) => {
        if (error) {
            console.error('Errore durante l\'eliminazione dell\'evento:', error);
            res.status(500).send('Errore durante l\'eliminazione dell\'evento.');
            return;
        }

        res.status(200).send('Evento eliminato con successo!');
    });
});

// Recupero degli eventi preferiti di un utente
app.get('/preferiti', proteggiRouteRiservata, (req, res) => {
    const id_utente = req.session.userId;

    // Query per recuperare gli ID degli eventi preferiti dell'utente
    const query = 'SELECT id_evento FROM Preferiti WHERE id_utente = ?';
    connection.query(query, [id_utente], (error, results, fields) => {
        if (error) {
            console.error('Errore durante il recupero degli eventi preferiti:', error);
            res.status(500).send('Errore durante il recupero degli eventi preferiti.');
            return;
        }

        // Estrae gli ID degli eventi preferiti dall'array di risultati
        const id_eventi_preferiti = results.map(result => result.id_evento);

        // Query per recuperare i dettagli degli eventi preferiti
        const eventoQuery = 'SELECT * FROM Eventi WHERE id IN (?)';
        connection.query(eventoQuery, [id_eventi_preferiti], (err, results, fields) => {
            if (err) {
                console.error('Errore durante il recupero dei dettagli degli eventi preferiti:', err);
                res.status(500).send('Errore durante il recupero dei dettagli degli eventi preferiti.');
                return;
            }

            res.status(200).json(results);
        });
    });
});



// Funzione per verificare se un utente è amministratore
const isAdmin = (userId) => {
    // Esempio di implementazione: controlla se l'utente ha un certo ruolo nel database
    // In questo caso, supponiamo che solo l'utente con ID 1 sia amministratore
    return userId === 1;
};

// Gestione degli errori per le route non trovate
app.use((req, res, next) => {
    res.status(404).send('Route non trovata.');
});

// Gestione degli errori generici
app.use((err, req, res, next) => {
    console.error('Errore interno del server:', err);
    res.status(500).send('Errore interno del server.');
});

// Avvio del server
app.listen(port, () => {
    console.log(`Server in ascolto sulla porta ${port}`);
});
