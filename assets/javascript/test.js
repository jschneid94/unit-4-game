
var characters;
var gameStatus;

// RESET FUNCTIONS

// Function used for initializing the game
function startGame() {
    characters = resetCharacters();
    gameStatus = resetGame();

    generateCharacters();
    $("#attack-btn").hide();
    $("#restart-btn").hide();
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
            name: "Samus Aran",
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
};

function emptyDivs() {
    $("#heroSelection").empty();
    $("#heroArea").empty();
    $("#defenderSelection").empty();
    $("#defenderArea").empty();
}

// RENDERING FUNCTIONS

// Generates a character div using object properties
function createCharDiv(character, key) {
    var charDiv = $("<div class='character card col-md-3' data-name='" + key + "'>");
    var charName = $("<div class='character-name card-title'>").text(character.name);
    var charImg = $("<img class='character-img card-img-top'>").attr("src", character.imgURL);
    var charHealth = $("<div class='character-health card-text'>").text(character.health);
    var cardBody = $("<div class='card-body'>");
    cardBody.append(charName).append(charHealth);
    charDiv.append(charImg).append(cardBody);
    return charDiv;
}

// Assigns a character object to a div and adds the div in the DOM
function generateCharacters() {
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

// Moves remaining characters after hero has been selected
function moveCharacters() {
    $(".character").appendTo("#defenderSelection");
    // Once characters are moved, allow player to choose a defender
    enableChooseDefender();
}

// Allows player to choose a defender after hero has been chosen or after defender has been defeated
function enableChooseDefender() {
    $("#defenderSelection").on("click", ".character", function(){
        // Assigns the character object to the defenderSelected variable
        var opponentKey = $(this).attr("data-name");
        gameStatus.defenderSelected = characters[opponentKey];

        // Moves the character to the defenderArea
        $("#defenderArea").append(this);

        // Prevent the defender from being clicked
        $(this).addClass("villain").removeClass("character");
        $(".villain").unbind("click");

        // Reveal the attack button now that there is a hero and defender
        $("#attack-btn").show();

        // Prevent the remaining characters from being clicked
        $("#defenderSelection").off("click");
    });
}

// Function for hero to damage defender's health
function attack(numOfAttacks) {
    gameStatus.defenderSelected.health -= gameStatus.heroSelected.attack * numOfAttacks;
}

// Function for the defender to damage the hero's health
function counterAttack() {
    gameStatus.heroSelected.health -= gameStatus.defenderSelected.counterAttack;
}



// WHEN THE PAGE LOADS...

$(document).ready(function () {

    // When the hero is selected from the character heroSelection...
    $("#heroSelection").on("click", ".character", function() {
        // Assigns the character object to the heroSelected variable
        var selectedKey = $(this).attr("data-name");
        gameStatus.heroSelected = characters[selectedKey];

        // Move the character to heroArea
        $("#heroArea").append(this);

        // Prevent the character from being clicked
        $(this).addClass("hero").removeClass("character");
        $(".hero").unbind("click");
        
        // Move the remaining characters to defenderSelection
        moveCharacters();
    });

    $("#attack-btn").on("click", function() {
        // Total number of attack increases by 1
        gameStatus.numOfAttacks++;

        // Run attack and counterAttack functions
        attack(gameStatus.numOfAttacks);
        counterAttack();

        // Display the hero and defender's health
        $("#heroArea .character-health").text(gameStatus.heroSelected.health);
        $("#defenderArea .character-health").text(gameStatus.defenderSelected.health);
    });

    startGame();


});


