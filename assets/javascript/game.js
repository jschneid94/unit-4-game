// Create array of objects for each character
    // Character has three properties: HP, attack power, and counter attack power
        
// Create global variables
var heroChosen = false;
var defenderChosen =false;


// Create functions
    // generate characters
    // reset function
    // chooseHero function 
        // When player clicks on a character in the select section...
            // Assign character as a hero
            // Set heroChosen to true
            // Remove hero from array and move to heroArea div
            // Move the remaining characters to the defenderSelection div
        heroChosen = true;
    // chooseDefender
        // When the player clicks on a character in the enemies section...
            // Assign that character as a defender
            // Remove the defender from the array and move to defenderArea div
        defenderChosen = true;
    // attack function
        // Attack power will double after every consecutive attack
    // counterattack function
    // checkHealth function
        // if hero health < 0
            // Change button text to "Reset"
            // Run reset function
        // if defender health < 0
            // Remove character from the flow of the page
            // Set defenderChosen to false


// When page loads, generate the characters as divs into the heroSelection div





// When player clicks fight button...
    // Check if player has selected hero and defender
    if (heroChosen === false || defenderChosen === false) {
        return false;
    }
    // Run attack function on defender
    // Run counterattack function on hero
    // Display the results in the fightResults section

// If 