const express = require('express');
const authRouter = express.Router();
const path = require('path');

const connection = require('./db'); 

// Pagina homepage routing
authRouter.get('/', (req, res) => {

    const filePath = path.join(__dirname, 'pages', 'homepage.html');
    res.sendFile(filePath, (err) => {
        if (err) {
            console.log('error');
            res.status(500).send('Errore interno del server'); 
        }
    });
});

// Pagina di registrazione routing
authRouter.get('/registrazione', (req, res) => {

    const filePath = path.join(__dirname, 'pages', 'registrazione.html');
    res.sendFile(filePath, (err) => {
        if (err) {
            console.log(err);
            res.status(500).send('Errore interno del server');
        }
    });
});

// Pagina di login routing
authRouter.get('/login', (req, res) => {

    const filePath = path.join(__dirname, 'pages', 'login.html');
    res.sendFile(filePath, (err) => {
        if (err) {
            console.log(err);
            res.status(500).send('Errore interno del server');
        }
    });
});


const registrazioneHandler = require('./scripts/registrazione');

const loginHandler = require('./scripts/login');

module.exports = authRouter;
