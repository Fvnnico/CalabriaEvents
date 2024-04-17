const mysql = require('mysql2');

// Configurazione del database MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'adminFigo',
    password: 'admin',
    database: 'CalabriaEventi',
});

// controllo connessione
connection.connect((error) => {
    if (error) {
        console.error('Errore durante la connessione al database:', error);
        return;
    }
    console.log('Connessione al database MySQL avvenuta con successo!');
});


module.exports = connection;