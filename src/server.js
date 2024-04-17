const express = require('express');
const bodyParser = require('body-parser');  // per il middleware
const path = require('path');  // test
const bcrypt = require('bcrypt');      // password hash


const app = express();
const port = 3300;
const authRouter = require('./router'); // router
const registrazioneHandler = require('./scripts/registrazione'); // registrazione degli utenti
const loginHandler = require('./scripts/login'); // login degli utenti

const connection = require('./db'); // connessione al database


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

// Gestione del login
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const query = 'SELECT * FROM Utenti WHERE email = ?';
    connection.query(query, [email], (error, results, fields) => {
        if (error) {
            console.error('Errore durante il login:', error);
            return res.status(500).send('Errore durante il login.');
        }

        // Controlla se l'utente è stato trovato
        if (results.length === 0) {
            // L'utente non esiste, reindirizza alla pagina di login con un messaggio di errore
            return res.send('Utente non trovato.');

        }

        // Utente trovato, verifica la password
        const user = results[0];
        bcrypt.compare(password, user.password, (err, passwordMatch) => {
            if (err) {
                console.error('Errore durante il confronto delle password:', err);
                return res.status(500).send('Errore durante il login.');
            }

            if (passwordMatch) {
                const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' }); // Genera un token JWT
                res.cookie('authToken', token, { httpOnly: true }); // Memorizza il token come cookie
                res.redirect('/'); // Reindirizza alla home page o ad altra pagina di successo
            } else  if(!passwordMatch){
                // La password non corrisponde, reindirizza alla pagina di login con un messaggio di errore
                console.log('non corrisponde password (non trova bo)');
            }
        });
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
