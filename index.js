// Fonction pour récupérer les cartes depuis l'API
async function fetchCards() {
    try {
        // L'URL de l'API pour récupérer les cartes collectibles
        const response = await fetch('https://api.hearthstonejson.com/v1/latest/enUS/cards.collectible.json');
        
        // Vérifier si la réponse est correcte (code 200)
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données');
        }

        // Convertir la réponse en JSON
        const cards = await response.json();

        // Afficher les cartes dans la page
        displayCards(cards);
    } catch (error) {
        console.error(error);
        alert('Une erreur est survenue lors de la récupération des données');
    }
}

// Fonction pour afficher les cartes dans le DOM
function displayCards(cards) {
    const cardsList = document.getElementById('cards-list');
    cardsList.innerHTML = '';  // Effacer le contenu précédent

    // Parcourir les cartes et créer un élément pour chaque carte
    cards.forEach(card => {
        // Récupérer l'ID de la carte (ex : "EX1_001")
        const cardId = card.id;
        
        // Construire l'URL de l'image en utilisant l'ID de la carte et la résolution souhaitée
        const imageUrl = `https://art.hearthstonejson.com/v1/render/latest/enUS/512x/${cardId}.png`; // Vous pouvez changer la résolution ici (512x ou 256x)
        
        // Créer un div pour chaque carte
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');
        
        // Ajouter l'image de la carte
        const cardImage = `<img src="${imageUrl}" alt="${card.name}">`;
        
        // Ajouter les informations de la carte (nom, description, coût)
        const cardContent = `
            ${cardImage}
            <div class="card-title">${card.name}</div>
            <div class="card-description">${card.text ? card.text : 'Aucune description.'}</div>
            <div>Coût en mana : ${card.cost ? card.cost : 'N/A'}</div>
        `;
        
        // Ajouter le contenu à l'élément cardDiv
        cardDiv.innerHTML = cardContent;
        
        // Ajouter la carte à la liste
        cardsList.appendChild(cardDiv);
    });
}




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

// Appeler la fonction pour récupérer et afficher les cartes
fetchCards();