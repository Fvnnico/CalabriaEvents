const bcrypt = require('bcrypt');
const connection = require('../db');

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
const loginHandler = (req, res) => {
    const { email, password } = req.body;

    // Query per ottenere l'utente dal database
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

        const user = results[0];

        // Verifica se la password è corretta
        bcrypt.compare(password, user.password, (err, result) => {
            if (err || !result) {
                res.statusText = 'Email o password non valide.';
                res.status(401).end();
                return;
            }

            // Autenticazione riuscita, reindirizza alla homepage
      /*       console.error(err); */
            res.json(user);
        });
    });
};

module.exports = loginHandler;