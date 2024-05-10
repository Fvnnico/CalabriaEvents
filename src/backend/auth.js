const bcrypt = require('bcrypt');
const connection = require('../db');

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */

const loginHandler = (req, res) => {
    const { email, password} = req.body; // prende i dati dalla richiesta

    const credenzialiAdmin = {
        email: 'adminEpico',
        password: 'admin'
    };

    // Query per ottenere l'utente dal database controllando l'email 
    const query = 'SELECT * FROM Utenti WHERE email = ?';
    connection.query(query, [email], (error, results, fields) => {
        if (error) {
            console.error('Errore durante il recupero dell\'utente:', error);
            res.statustext = 'Errore durante il login.';
            res.status(500).end();
            return;
        }

        // Verifica se l'utente esiste nel database
        if (results.length === 0) {
            res.statusText = 'Email o password non valide.';
            res.status(404).end();
            return;
        }

        // serve a contenere i dati dell'utente quindi prende i dati dalla query fatta prima
        const user = results[0];

        // Verifica se la password è corretta confrontandola col metodo compare
        bcrypt.compare(password, user.password, (err, result) => {
            console.log('Verifico la password');
            if (err || !result) {
                res.statusText = 'Email o password non valide.';
                res.status(401).end();
                return;
            }
        });
         
        // se le credenziali corrispondono a quelle dell'admin restituisce isAdmin: true 
        if (email === credenzialiAdmin.email && password === credenzialiAdmin.password) {
            res.json({ user: user, isAdmin: true });
        } else {
            res.json({user: user, isAdmin: false });
        }
    });
};

module.exports = loginHandler;