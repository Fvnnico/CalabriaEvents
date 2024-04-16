document.getElementById('registrazione-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Invia i dati al server per la registrazione
    fetch('/registrazione', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, email, password })
    })
    .then(response => {
        if (response.ok) {
            return response.text();
        } else {
            throw new Error('Errore durante la registrazione.');
        }
    })
    .then(data => {
        alert(data);
        window.location.href = '/login.html'; // Reindirizza alla pagina di login dopo la registrazione
    })
    .catch(error => {
        console.error('Errore:', error);
        alert('Si è verificato un errore durante la registrazione.');
    });
});
