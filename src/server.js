const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt'); 
const mysql = require('mysql2');
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

// Express capisce che gli assets sono dentro public (img,css ,etc)
app.use(express.static(path.join(__dirname, 'public')));


// Pagina homepage routing
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


// Quando clicchi registrazione bottone
app.post('/registrazione', (req, res) => {
    

    const { nome, cognome, email, password } = req.body;

    // Crittografa la password prima di memorizzarla nel database
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            console.error('Errore durante la crittografia della password:', err);
            res.status(500).send('Errore durante la registrazione.');
            return;
        }

        // Salva l'utente nel database con la password crittografata
        const query = 'INSERT INTO Utenti (nome, cognome, email, password) VALUES (?, ?, ?, ?)';
        const values = [nome, cognome, email, hash];

        connection.query(query, values, (error, results, fields) => {
            if (error) {
                console.error('Errore durante la registrazione dell\'utente:', error);
                res.status(500).send('Errore durante la registrazione.');
                return;
            }

            console.log('Utente registrato con successo!');
            res.redirect('/');
        });
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
