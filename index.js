document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".tab-button");
    const contents = document.querySelectorAll(".tab-content");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            // Supprime la classe active de tous les boutons et contenus
            buttons.forEach(btn => btn.classList.remove("active"));
            contents.forEach(content => content.classList.remove("active"));

            // Active l'onglet cliqué
            button.classList.add("active");
            document.getElementById(`tab-${button.dataset.tab}`).classList.add("active");
        });
    });
});