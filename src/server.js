const express = require('express');
const bodyParser = require('body-parser');  // per il middleware
const path = require('path');  // test
const bcrypt = require('bcrypt');      // password hash


const app = express();
const port = 3300;

const authRouter = require('./router'); // router
const connection = require('./db'); // connessione al database


const registrazioneHandler = require('./scripts/registrazione'); // registrazione degli utenti
const loginHandler = require('./scripts/login'); // login degli utenti



// Middleware per il parsing del body delle richieste
app.use(bodyParser.urlencoded({ extended: true }));

// Collega il router all'app principale
app.use('/', authRouter);

// Express capisce che gli assets sono dentro public (img,css ,etc)
app.use(express.static(path.join(__dirname, 'public')));

// Quando clicchi registrazione bottone
app.post('/registrazione', registrazioneHandler);

// Quando accedi 
app.post('/login', loginHandler);




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
