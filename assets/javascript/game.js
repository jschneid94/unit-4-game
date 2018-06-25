// Create array of objects for each character
    // Character has three properties: HP, attack power, and counter attack power
var character1 = {
    name: "Mario",
    health: 120,
    attack: 8,
    counterAttack: 12
};

var character2 = {
    name: "Luigi",
    health: 100,
    attack: 6,
    counterAttack: 16
};

var character3 = {
    name: "Princess Peach",
    health: 150,
    attack: 7,
    counterAttack: 14
};

var character4 = {
    name: "Bowser",
    health: 100,
    attack: 20,
    counterAttack: 20
};
        
// Create global variables
var heroChosen = false;
var defenderChosen =false;


// Create functions
    // reset function
        // empty heroArea, defenderSelection, and defenderArea
        // push heroes into array
        // display the array in the heroSelection div
        // Reset heroChosen and defenderChosen
        // heroChosen = false;
        // defenderChosen = false;
    // chooseHero function 
        // When player clicks on a character in the select section...
            // Assign character as a hero
            // Set heroChosen to true
            // Remove hero from array and move to heroArea div
            // Move the remaining characters to the defenderSelection div
        // heroChosen = true;
    // chooseDefender
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