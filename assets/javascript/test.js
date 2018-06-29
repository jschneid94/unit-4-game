
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

    $("#game_finished").hide();
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
            imgURL: "assets/images/link.png"
        },

        "samus" : {
            name: "Samus Aran",
            health: 150,
            attack: 20,
            counterAttack: 20,
            imgURL: "assets/images/samus.png"
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

// Function to empty the the playing field before resetting the game.
function emptyDivs() {
    $("#heroSelection").empty();
    $("#heroArea").empty();
    $("#defenderSelection").empty();
    $("#defenderArea").empty();
}

// Generates a character div using object properties
function createCharDiv(character, key) {
    var charDiv = $("<div class='character col-md-2 mx-auto text-light text-center' data-name='" + key + "'>");
    var charName = $("<div class='character-name card-title'>").text(character.name);
    var charImg = $("<img class='character-img card-img-top'>").attr("src", character.imgURL);
    var charHealth = $("<div class='character-health card-text'>").text(character.health);
    var charBody = $("<div class='card-body'>");
    charBody.append(charName).append(charHealth);
    charDiv.append(charImg).append(charBody);
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
        gameStatus.remainingEnemies = keys.length;
        console.log(gameStatus.remainingEnemies);
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
        $(this).addClass("villain col-md-12").removeClass("character col-md-3");
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
    checkHealth();
}

// Function for the defender to damage the hero's health
function counterAttack() {

    // If the defender has been killed, don't run this function
    if (gameStatus.defenderSelected === null) {
        return false;
    } 
    // If defender is still alive after attack, perform counterattack
    else {
        gameStatus.heroSelected.health -= gameStatus.defenderSelected.counterAttack;
        checkHealth();
    }
}

// Function to check hero and defender's health after the battle phase
function checkHealth () {
    var tryAgain;
    // If the player's health reaches 0...
    if (gameStatus.heroSelected.health <= 0) {
        // Remove the player from the DOM
        $(".hero").remove();
        gameStatus.heroSelected = null;
        $("#game_finished").show();

        // timeout so player can see hero has died
        setTimeout( function() {
            // Ask player if they would like to play again
            tryAgain = confirm("Continue?");
            // If yes, restart the game
            if (tryAgain) {
                emptyDivs();
                startGame();
            } 
            // If no, display Game Over
            else {
                alert("Game Over!");
            }
        }, 2000);
    }

    // if the defender's health reaches 0...
    if (gameStatus.defenderSelected.health <= 0) {
        // The defender is removed from the page
        $(".villain").remove();
        gameStatus.defenderSelected = null;

        // Decrements the count for remaining enemies
        gameStatus.remainingEnemies--;
        console.log(gameStatus.remainingEnemies);

        // Allow the player to choose another defender to challenge
        enableChooseDefender();
    }

    checkWin();
}

function checkWin() {
    var playAgain;
    if (gameStatus.remainingEnemies === 0) {
        $("#game_finished").attr("top", "0").show();
        setTimeout(function() {
            playAgain = confirm("You WON! Play again?");
            if (playAgain === true) {
                emptyDivs();
                startGame();
            } else {
                alert("Game Over!");
            }
        }, 2000);
    }
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
        gameStatus.remainingEnemies--;
        console.log(gameStatus.remainingEnemies);

        // Prevent the character from being clicked
        $(this).addClass("hero col-md-12").removeClass("character col-md-3");
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

        // Display the hero health to their div
        $("#heroArea .character-health").text(gameStatus.heroSelected.health);

        /* if statement to return nothing if the defenderSelected is killed,
            error message would occur bc killing defender would delete their health property */
        if (gameStatus.defenderSelected === null) {
            return false;
        }
        // Displays the defenders health to their div
        else {
            $("#defenderArea .character-health").text(gameStatus.defenderSelected.health);
        }
    });

    // When DOM loads, run the game
    startGame();

});


