//Pour les cartes

let filteredCardsClass = [];
let filteredCardsMana = [];
let filteredCardsRarity = [];
let filteredCardsType = [];
let filteredCardsRace = [];
let allCards = [];  

// Fonction pour récupérer les cartes depuis l'API
async function fetchCards() {
    try {
        // L'URL de l'API pour récupérer les cartes collectibles
        const response = await fetch('https://api.hearthstonejson.com/v1/latest/enUS/cards.collectible.json');
        
        // Vérifier si la réponse est correcte (code 200)
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données');
        }
        
        const cards = await response.json();

        // Utilisation d'un Map pour s'assurer que chaque carte a un nom unique
        const uniqueCardsMap = new Map();

        cards.forEach(card => {
            if (card.type !== "HERO" && !uniqueCardsMap.has(card.name)) {
                uniqueCardsMap.set(card.name, card);
            }
        });

        // Convertir en tableau unique de cartes
        allCards = Array.from(uniqueCardsMap.values());

        allCards.sort((a, b) => {
            // Trier d'abord par coût en mana (ordre croissant)
            if (a.cost !== b.cost) {
                return a.cost - b.cost;
            }
        });

        filteredCardsClass = allCards;
        filteredCardsMana = allCards;
        filteredCardsRarity = allCards;
        filteredCardsRace = allCards;

        // Afficher les cartes dans la page
        displayCards(allCards);

        fetchClass(allCards);
        fetchMana(allCards);
        fetchRarity(allCards);
        fetchType(allCards);
        fetchRace(allCards);

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
        `;
        //<div class="card-title">${card.name}</div>
        //<div class="card-description">${card.text ? card.text : 'Aucune description.'}</div>
        //<div>Coût en mana : ${card.cost ? card.cost : 'N/A'}</div>
        
        // Ajouter le contenu à l'élément cardDiv
        cardDiv.innerHTML = cardContent;
        
        // Ajouter la carte à la liste
        cardsList.appendChild(cardDiv);
    });
}

function fetchClass(cards) {

    const selectClass = document.getElementById("classe-select");
    
    //récupère les différentes classes en exluant les non définis
    const classes = [...new Set(cards.map(card => card.cardClass).filter(Boolean))].sort();

    classes.forEach(classe => {
        const option = document.createElement("option");
        option.value = classe;
        option.textContent = classe.charAt(0) + classe.slice(1).toLowerCase();
        selectClass.appendChild(option);
    })

    selectClass.addEventListener("change", async (event) => {
        const selectedClasse = event.target.value;

        if (selectedClasse === "all") {
            filteredCardsClass = allCards;
        } else {
            filteredCardsClass = allCards.filter(card => card.cardClass === selectedClasse);
        }
        updateDisplay();
    });
}

function fetchMana(cards) {

    const selectMana = document.getElementById("mana-select");
    
    //récupère les différentes classes en exluant les non définis
    const manas = [...new Set(cards.map(card => card.cost).filter(cost => cost !== null && cost !== undefined))].sort((a, b) => a - b);

    manas.forEach(mana => {
        const option = document.createElement("option");
        option.value = mana;
        option.textContent = mana;
        selectMana.appendChild(option);
    })

    selectMana.addEventListener("change", async (event) => {
        const selectedMana = event.target.value;

        if (selectedMana === "all") {
            filteredCardsMana = allCards;
        } else {
            filteredCardsMana = allCards.filter(card => card.cost === parseInt(selectedMana));
        }
        updateDisplay();
    });
}

function fetchRarity(cards) {

    const selectRarity = document.getElementById("rare-select");
    
    //récupère les différentes classes en exluant les non définis
    const rarete = ["FREE", "COMMON", "RARE", "EPIC", "LEGENDARY"];

    rarete.forEach(rare => {
        const option = document.createElement("option");
        option.value = rare;
        option.textContent = rare.charAt(0) + rare.slice(1).toLowerCase();
        selectRarity.appendChild(option);
    })

    selectRarity.addEventListener("change", async (event) => {
        const selectedRarity = event.target.value;

        if (selectedRarity === "all") {
            filteredCardsRarity = allCards;
        } else {
            filteredCardsRarity = allCards.filter(card => card.rarity === selectedRarity);
        }
        updateDisplay();
    });
}

function fetchType(cards) {

    const selectType = document.getElementById("type-select");
    
    //récupère les différentes classes en exluant les non définis
    const types = [...new Set(cards.map(card => card.type).filter(Boolean))].sort();

    types.forEach(type => {
        const option = document.createElement("option");
        option.value = type;
        option.textContent = type.charAt(0) + type.slice(1).toLowerCase();
        selectType.appendChild(option);
    })

    selectType.addEventListener("change", async (event) => {
        const selectedType = event.target.value;

        if (selectedType === "all") {
            filteredCardsType = allCards;
        } else {
            filteredCardsType = allCards.filter(card => card.type === selectedType);
        }
        updateDisplay();
    });
}

function fetchRace(cards) {

    const selectRace = document.getElementById("race-select");
    
    //récupère les différentes classes en exluant les non définis
    const races = [...new Set(cards.map(card => card.race).filter(Boolean))].sort();

    races.forEach(race => {
        const option = document.createElement("option");
        option.value = race;
        option.textContent = race.charAt(0) + race.slice(1).toLowerCase();
        selectRace.appendChild(option);
    })

    selectRace.addEventListener("change", async (event) => {
        const selectedRace = event.target.value;

        if (selectedRace === "all") {
            filteredCardsRace = allCards;
        } else {
            filteredCardsRace = allCards.filter(card => 
                Array.isArray(card.races) && card.races.includes(selectedRace)
            );
        }
        updateDisplay();
    });
}

function updateDisplay() {
    // Calculer l'intersection des filtres en utilisant un Set pour éviter les doublons
    const intersection = allCards.filter(card =>
        filteredCardsClass.includes(card) &&
        filteredCardsMana.includes(card) &&
        filteredCardsRarity.includes(card) &&
        filteredCardsType.includes(card) &&
        filteredCardsRace.includes(card)
    );

    // Afficher les cartes sans doublons
    displayCards([...new Set(intersection)]);
}

document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".onglet-button");
    const contents = document.querySelectorAll(".onglet-content");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            // Supprime la classe active de tous les boutons et contenus
            buttons.forEach(btn => btn.classList.remove("active"));
            contents.forEach(content => content.classList.remove("active"));

            // Active l'onglet cliqué
            button.classList.add("active");
            document.getElementById(`onglet-${button.dataset.onglet}`).classList.add("active");
        });
    });
});

fetchCards();