const bcrypt = require('bcrypt');
const connection = require('../db');

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
const loginHandler = (req, res) => {
    const { email, password} = req.body;

    const credenzialiAdmin = {
        email: 'adminEpico',
        password: 'admin'
    };

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
            console.log('Verifico la password');
            if (err || !result) {
                res.statusText = 'Email o password non valide.';
                res.status(401).end();
                return;
            }

            // Autenticazione riuscita, reindirizza alla homepage
            if (email === credenzialiAdmin.email && password === credenzialiAdmin.password) {
                // Se le credenziali corrispondono a quelle di un admin, restituisci una risposta indicando che l'utente è un admin
                res.json({ user: user, isAdmin: true });
                console.log("sei admin");
            } else {
                // Altrimenti, restituisci una risposta indicando che l'utente non è un admin
                res.json({user: user, isAdmin: false });
                /* res.status(401).json({ message: 'Non sei admin ripbozo' }); */
                console.log("nn sei admin");
            }
            /* res.json(user); */
        });
    });
};

module.exports = loginHandler;