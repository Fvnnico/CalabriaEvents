const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const mysql = require('mysql2');
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

// Middleware per il parsing del body delle richieste
app.use(bodyParser.urlencoded({ extended: true }));

// Router per la gestione delle pagine di login e registrazione
const authRouter = express.Router();

// Pagina di registrazione
authRouter.get('/registrazione', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'registrazione.html'));
});

// Pagina di login
authRouter.get('/login', (req, res) => {
    res.send('Pagina di login');
});

/* // Gestione della registrazione
authRouter.post('/registrazione', (req, res) => {
    // Qui gestisci la logica di registrazione
    res.send('Logica di registrazione');
});

// Gestione del login
authRouter.post('/login', (req, res) => {
    // Qui gestisci la logica di login
    res.send('Logica di login');
}); */

// Collega il router all'app principale
app.use('/', authRouter);



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
