
var characters;
var gameStatus;

// RESET FUNCTIONS

// Function used for initializing the game
function startGame() {
    characters = resetCharacters();
    gameStatus = resetGame();

    generateCharacters();
}

// Resets the characters to their original stats
function resetCharacters() {
    return {
        "mario" : {
            name: "Mario",
            health: 120,
            attack: 8,
            counterAttack: 8,
            imgURL: "assets/images/mario.png"
        },  
        
        "link" : {
            name: "Link",
            health: 110,
            attack: 9,
            counterAttack: 9,
            imgURL: "assets/images/link.jpg"
        },

        "samus" : {
            name: "Samus",
            health: 150,
            attack: 20,
            counterAttack: 20,
            imgURL: "assets/images/samus.jpg"
        },

        "pikachu" : {
            name: "Pikachu",
            health: 100,
            attack: 25,
            counterAttack: 25,
            imgURL: "assets/images/pikachu.png"
        }
    }
}

// Resets the selected characters, counter for enemies to fight, and the attack count multiplier
function resetGame() {
    return {
        heroSelected: null,
        defenderSelected: null,
        remainingEnemies: 0,
        numOfAttacks: 0
    }
}

function emptyDivs() {
    $("#heroSelection").empty();
    $("#heroArea").empty();
    $("#defenderSelection").empty();
    $("#defenderArea").empty();
}

// RENDERING FUNCTIONS

// Generates a character div using object properties
function createCharDiv(character, key) {
    var charDiv = $("<div class='character' data-name='" + key + "'>");
    var charName = $("<div class='character-name'>").text(character.name);
    var charImg = $("<div class='character-img'>").attr("src", character.imgURL);
    var charHealth = $("<div class='character-health'>").text(character.health);
    charDiv.append(charName).append(charImg).append(charHealth);
    return charDiv;
}

// Assigns a character object to a div and adds the div in the DOM
function renderCharacters() {
    var keys = Object.keys(characters);
    for (var i = 0; i < keys.length; i++) {
        // Assigns the character object to a newly created div
        var characterKey = keys[i];
        var character = characters[characterKey];
        var charDiv = createCharDiv(character, characterKey);
        // Puts the character div into the heroSelection div
        $("#heroSelection").append(charDiv);
    }
}



