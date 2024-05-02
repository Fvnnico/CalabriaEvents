function elimina(id_evento) {
    return new Promise((resolve, reject) => {
        // Funzione per aprire il modale di conferma
        function confermaEliminazione() {
            let confirmModal = document.getElementById("confirmModal");
            confirmModal.style.display = "block";

            // Gestore di evento per il pulsante di conferma
            document.getElementById("confirmDelete").addEventListener("click", function () {
                // Chiudi il modale di conferma
                confirmModal.style.display = "none";

                // Chiamata alla funzione per eliminare l'evento
                fetch(`/api/eventi/${id_evento}`, {
                    method: 'DELETE',
                })
                .then(response => {
                    if (response.ok) {
                        const eventoContainer = document.querySelector(`[id_evento="${id_evento}"]`);
                        if (eventoContainer) {
                            eventoContainer.remove();
                            // Dopo aver rimosso l'evento, mostrare il modale di eliminazione avvenuta con successo
                            let modal = document.getElementById("myModal");
                            modal.style.display = "block";
                            resolve(); // Risolve la promise una volta che il modale è stato mostrato
                        } else {
                            reject(new Error('Elemento evento non trovato nell\'HTML'));
                        }
                    } else {
                        reject(new Error(`Errore durante l'eliminazione dell'evento: ${response.statusText}`));
                    }
                })
                .catch(error => {
                    reject(new Error(`Errore di rete durante la richiesta: ${error}`));
                });
            });

            // Gestore di evento per il pulsante di annullamento
            document.getElementById("cancelDelete").addEventListener("click", function () {
                // Chiudi il modale di conferma senza fare nulla
                confirmModal.style.display = "none";
                reject(new Error('Operazione di eliminazione annullata'));
            });
        }

        confermaEliminazione();
    });
}




// Funzione per aprire il modale di conferma
function confermaEliminazione(id_evento) {
    let confirmModal = document.getElementById("confirmModal");
    confirmModal.style.display = "block";

    // Gestore di evento per il pulsante di conferma
    document.getElementById("confirmDelete").addEventListener("click", function () {
        // Chiudi il modale di conferma
        confirmModal.style.display = "none";

        // Chiamata alla funzione per eliminare l'evento
        elimina(id_evento);
    });

    // Gestore di evento per il pulsante di annullamento
    document.getElementById("cancelDelete").addEventListener("click", function () {
        // Chiudi il modale di conferma senza fare nulla
        confirmModal.style.display = "none";
    });
}



elimina(id_evento)
    .then(() => {
        confermaEliminazione(id_evento);
    })
    .catch(error => {
        // Gestione degli errori
        console.error(error);
    });
