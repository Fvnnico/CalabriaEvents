// da fixa
function elimina() {
    const cestino = document.getElementById("cestino");

    cestino.addEventListener("click", function () {
        const eventoContainer = document.querySelector(".eventoContainer");
        if(eventoContainer){
            eventoContainer.remove();
        }
    });
}