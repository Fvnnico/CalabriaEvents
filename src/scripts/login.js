const bcrypt = require('bcrypt');
const connection = require('../db');


const loginHandler = (req, res) => {
    const { email, password } = req.body;

    // Query per ottenere l'utente dal database
    const query = 'SELECT * FROM Utenti WHERE email = ?';
    connection.query(query, [email], (error, results, fields) => {
        if (error) {
            console.error('Errore durante il recupero dell\'utente:', error);
            res.status(500).send('Errore durante il login.');
            return;
        }

        // Verifica se l'utente esiste nel database
        if (results.length === 0) {
            res.status(401).send('Email o password non valide.');
            return;
        }

        const user = results[0];

        // Verifica se la password è corretta
        bcrypt.compare(password, user.password, (err, result) => {
            if (err || !result) {
                res.status(401).send('Email o password non valide.');
                return;
            }

            // Autenticazione riuscita, reindirizza alla homepage
      /*       console.error(err); */
            res.redirect('/');
        });
    });
};

module.exports = loginHandler;