// Create global variables
var heroChosen = false;
var defenderChosen = false;
var isGameOver = false;
var heroSelected = {};
var defenderSelected = {};

// Create array of objects for each character
    // Character has three properties: HP, attack power, and counter attack power
// var Mario = {
//     name: "Mario",
//     health: 120,
//     attack: 8,
//     counterAttack: 8
//     };

var Luigi = {
    name: "Luigi",
    health: 100,
    attack: 5,
    counterAttack: 5
    };

var Wario = {
    name: "Wario",
    health: 150,
    attack: 20,
    counterAttack: 20
    };

var Bowser = {
    name: "Bowser",
    health: 100,
    attack: 25,
    counterAttack: 25
    };

$("#mario").data( "Mario", { 
    name: "Mario",
    health: 120,
    attack: 8,
    counterAttack: 12 }
);



// Create functions
function initializeHero(chosenHero) {
    heroSelected.name = 
    // heroSelected.health = chosenHero.health;
    // heroSelected.attack = chosenHero.attack;
    // heroSelected.counterAttack = chosenHero.counterAttack;
}

function initializeDefender(chosenDefender) {
    defenderSelected.name = chosenDefender.name;
    defenderSelected.health = chosenDefender.health;
    defenderSelected.attack = chosenDefender.attack;
    defenderSelected.counterAttack = chosenDefender.counterAttack;
}



$(".card").on("click", function() {
    initializeHero(this);
    console.log()
});


    // reset function
        // empty heroArea, defenderSelection, and defenderArea
        // push heroes into array
        // Reset heroChosen and defenderChosen
        // heroChosen = false;
        // defenderChosen = false;
    // chooseHero function 
  
        // Prevent player from clicking if game is over or if defender has been chosen
        // if (isGameOver === true){
        //     return false;
        // }
        // When player clicks on a character in the select section...

            // Assign character as a hero
            //initializeHero(this);
            // Set heroChosen to true
            // heroChosen = true;
            // Remove hero from array and move to heroArea div
            // Move the remaining characters to the defenderSelection div
        // heroChosen = true;
    // chooseDefender
   
        // Prevent player from clicking if game is over
        // if (isGameOver === true){
        //     return false;
        // }
        // When the player clicks on a character in the enemies section...
            // Assign that character as a defender
            // Remove the defender from the array and move to defenderArea div
        // defenderChosen = true;
    // attack function
        // Defender loses health equal to hero attack power
        // Hero attack power doubles
        // Hero loses health equal to defender counter attack power
    // checkHealth function
        // if hero health < 0
            // isGameOver = true;
            // Change button text to "Reset"
            // Run reset function
        // if defender health < 0
            // Remove character from the flow of the page
            // Set defenderChosen to false


// When page loads, generate the characters as divs into the heroSelection div
//resetfunction();




// When player clicks fight button...
    // Check if player has selected hero and defender
    // if (heroChosen === false || defenderChosen === false) {
    //     return false;
    // }
    // Run attack function on defender
    // attack();
    // Display the results in the fightResults section

// If 