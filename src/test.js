/* // Route per la registrazione di un nuovo utente
app.post('/registrazione', async (req, res, next) => {
    try {
        const { nome,cognome,email, password } = req.body;

        // Verifica se l'utente esiste già nel database
        const [existingUser] = await connection.promise().query('SELECT * FROM users WHERE username = ?', [username]);
        if (existingUser.length > 0) {
            return res.status(400).send('Questo nome utente è già stato utilizzato. Si prega di sceglierne un altro.');
        }

        // Hash della password prima di salvarla nel database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Salva l'utente nel database
        await connection.promise().query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);

        res.status(201).send('Utente registrato con successo!');
    } catch (error) {
        next(error);
    }
});
 */