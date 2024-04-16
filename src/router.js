const express = require('express');
const app = express();



// Definisci un router per gestire le richieste GET alla radice del tuo sito
app.get('/', (req, res) => {
  res.send('');
});

// Definisci un router per gestire le richieste GET a un percorso specifico
app.get('/about', (req, res) => {
  res.send('Informazioni su di noi');
});

// Definisci un router per gestire le richieste POST
app.post('/api/data', (req, res) => {
  // Gestisci la logica per salvare i dati nel server
  res.send('Dati ricevuti');
});

// Avvia il server e fa in modo che ascolti le richieste sulla porta 3000
app.listen(3000, () => {
  console.log('Il server è in esecuzione sulla porta 3000');
});