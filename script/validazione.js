function validaModuloEvento() {
    // Ottieni i valori dai campi del modulo
    const nomeEvento = document.getElementById('nome-evento').value.trim();
    const luogoEvento = document.getElementById('luogo-evento').value.trim();
    const dataInizio = document.getElementById('data-inizio').value.trim();
    const descrizioneEvento = document.getElementById('descrizione-evento').value.trim();

    // Esegui la validazione dei campi
    if (nomeEvento === '' || luogoEvento === '' || dataInizio === '' || descrizioneEvento === '') {
        alert('Si prega di compilare tutti i campi del modulo.');
        return false;
    }
    return true;
}
