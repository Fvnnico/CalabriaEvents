function elimina(id_evento) {
    fetch(`/api/eventi/${id_evento}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (response.ok) {
            // Rimuovi l'evento dall'HTML
            
            const eventoContainer = document.querySelector(`[id_evento="${id_evento}"]`);
            if (eventoContainer) {
                eventoContainer.remove();
            }
        } else {
            console.error('Errore durante l\'eliminazione dell\'evento:', response.statusText);
        }
    })
    .catch(error => {
        console.error('Errore di rete durante la richiesta:', error);
    });
}
