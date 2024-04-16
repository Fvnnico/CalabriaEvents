document.getElementById('registrationForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevents the form from submitting normally

    const formData = new FormData(this); // Gets the form data
    const url = '/register'; // URL to send the form data
    const options = {
        method: 'POST',
        body: formData
    };

    try {
        const response = await fetch(url, options); // Sends the form data to the server
        if (!response.ok) {
            throw new Error('Errore durante la registrazione');
        }
        const data = await response.text(); // Reads the response from the server
        alert(data); // Displays the response message
        // Optionally, you can redirect the user to another page or perform other actions after successful registration
    } catch (error) {
        console.error('Errore durante la registrazione:', error);
        alert('Errore durante la registrazione. Si prega di riprovare.');
    }
});