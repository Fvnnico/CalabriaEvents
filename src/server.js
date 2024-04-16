const express = require('express');
/* const session = require('express-session'); */
const bodyParser = require('body-parser');
/* const bcrypt = require('bcrypt'); */
const mysql = require('mysql2');
/* const csrf = require('csurf'); */
const path = require('path');  // test

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

// Router per la gestione delle pagine
const authRouter = express.Router();


// Collega il router all'app principale
app.use('/', authRouter);


// Pagina homepage 
authRouter.get('/', (req, res) => {
    const filePath = path.join(__dirname, 'pages', 'homepage.html');
    console.log('Percorso del file:', filePath);
    res.sendFile(filePath, (err) => {
        if (err) {
            console.log('error');
            res.status(500).send('Errore interno del server'); 
        }
    });
});


// Pagina di registrazione
authRouter.get('/registrazione', (req, res) => {
    
    const filePath = path.join(__dirname, 'pages', 'registrazione.html');
    res.sendFile(filePath, (err) => {
        if (err) {
            console.log(err);
            res.status(500).send('Errore interno del server');
        }
    });
});

// Pagina di login
authRouter.get('/login', (req, res) => {
    const filePath = path.join(__dirname, 'pages', 'login.html');
    res.sendFile(filePath, (err) => {
        if (err) {
            console.log(err);
            res.status(500).send('Errore interno del server');
        }
    });
});




// per errori below

// Gestione degli errori per le route non trovate
app.use((req, res, next) => {
res.status(404).send('Route non trovata.');
next();
}); 
 

// Gestione degli errori generici
app.use((err, req, res, next) => {
    console.error('Errore interno del server:', err);
    res.status(500).send('Errore interno del server.');
    next();
});

// Avvio del server
app.listen(port, () => {
    console.log(`Server in ascolto sulla porta ${port}`);
});
