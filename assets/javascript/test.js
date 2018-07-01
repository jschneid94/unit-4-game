// VARIABLES

// Global variables
var characters;
var gameStatus;

// Game sound variables
var theme = new Audio("assets/images/theme_song.mp3");
var narrReady = new Audio("assets/images/narr_ready.wav");
var narrGo = new Audio("assets/images/narr_go.wav");
var narrGame = new Audio("assets/images/narr_game.wav");
var gameFinish = new Audio("assets/images/finished_game_audio.wav");
var narrContinue = new Audio("assets/images/narr_continue.wav");

// FUNCTIONS

// Function used for initializing the game
function startGame() {
    characters = resetCharacters();
    gameStatus = resetGame();
    generateCharacters();

    // Hides attack button and the game finished graphic
    $("#attack-btn").hide();
    $("#game_finished").hide();

    // Restarts the theme music and resets the audio used in battleSound function
    theme.load();
    narrReady = new Audio("assets/images/narr_ready.wav");
    narrGo = new Audio("assets/images/narr_go.wav");
}

// Resets the characters to their original stats
function resetCharacters() {
    return {
        "mario" : {
            name: "Mario",
            health: 120,
            attack: 8,
            counterAttack: 8,
            imgURL: "assets/images/mario.png",
            audio: "assets/images/mario_choose.wav"
        },  
        
        "link" : {
            name: "Link",
            health: 110,
            attack: 9,
            counterAttack: 9,
            imgURL: "assets/images/link.png",
            audio: "assets/images/link_choose.wav"
        },

        "samus" : {
            name: "Samus Aran",
            health: 150,
            attack: 20,
            counterAttack: 20,
            imgURL: "assets/images/samus.png",
            audio: "assets/images/samus_choose.wav"
        },

        "pikachu" : {
            name: "Pikachu",
            health: 100,
            attack: 25,
            counterAttack: 25,
            imgURL: "assets/images/pikachu.png",
            audio: "assets/images/pikachu_choose.wav"
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
    var charDiv = $("<div class='character col-md-2 col-sm-3 mx-auto text-light text-center' data-name='" + key + "'>");
    var charName = $("<div class='character-name h2 card-title'>").text(character.name);
    var charImg = $("<img class='character-img card-img-top'>").attr("src", character.imgURL);
    var charHealth = $("<div class='character-health h3 card-text'>").text(character.health);
    var charSound = $("<audio><source src='" + character.audio + "'></source></audio>")
    var charBody = $("<div class='card-body'>");
    charBody.append(charName).append(charHealth).append(charSound);
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
        $(this).addClass("villain col-md-12 col-sm-12").removeClass("character col-md-2");
        $(".villain").unbind("click");

        // Reveal the attack button now that there is a hero and defender
        $("#attack-btn").show();

        // Prevent the remaining characters from being clicked
        $("#defenderSelection").off("click");

        // Plays the character's audio when they are selected
        var audio = $(this).find("audio");
        audio[0].play();
        
    });
}

// Plays a sound when the first fight has begun.
function battleSound() {
    narrReady.loop = false;
    narrReady.load();
    narrReady.play();
    setTimeout(function() {
        narrGo.loop = false;
        narrGo.load();
        narrGo.play();
        narrGo = false;
    }, 1000);

    // Both sounds are set to false after playing so they won't play again
    narrReady = false;
}

// Stops the theme music and plays the end sounds
function endSound() {
    theme.pause();
    narrGame.play();
    gameFinish.play();
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

        // Ends game with graphic and sound effects
        $("#game_finished").show();
        endSound();

        // Plays narrContinue right before the confirm
        setTimeout(function() {
            narrContinue.play();
        }, 2000);

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
        }, 2050);
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

// Checks if the hero has defeated all the remaining enemies.
function checkWin() {
    var playAgain;
    if (gameStatus.remainingEnemies === 0) {
        $("#game_finished").css({"top":"400px"}).show();
        endSound();
        setTimeout(function() {
            playAgain = confirm("You WON! Play again?");
            if (playAgain === true) {
                emptyDivs();
                startGame();
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
        $(this).addClass("hero col-md-12 col-sm-12").removeClass("character col-md-2");
        $(".hero").unbind("click");
        
        // Move the remaining characters to defenderSelection
        moveCharacters();

        // Play character audio
        var audio = $(this).find("audio");
        audio[0].play();

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

        // Starts theme music and initial battle sound
        theme.play();
        battleSound();
    });

    // When DOM loads, run the game
    startGame();

});


