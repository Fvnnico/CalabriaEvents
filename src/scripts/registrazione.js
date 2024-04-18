const bcrypt = require('bcrypt');
const connection = require('../db'); 

const registrazioneHandler = (req, res) => {
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
            
        });
    });
    res.send("u cunnu e masdsdadsasdadsadasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdas  lorem4000000000000000000000   4000000000000000000")
};

module.exports = registrazioneHandler;
