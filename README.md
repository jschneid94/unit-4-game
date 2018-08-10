# unit-4-game

Deployed Page:
https://jschneid94.github.io/unit-4-game/

Unit 4 Game, or Super Smash RPG, is an object-oriented web app that allows users to choose their favorite Nintendo characters and engage in turn-based brawls. 

My approach for this project was to build character objects with various stats and abilities, along with event listeners that woulf place characters in fighting stage and calculate character's health until one was victorious. Characters are stored as objects and displayed to the page dynamically using javascript. Event listeners wait for the player to choose a character and an opponent, and doing so will relocate both to new divs or the "staging area." Once chosen, the fight button can be pressed to start the fight; an event listener will play music when the battle was initiated and the characters' health will decrease with each attack. The player's character attack increases incrementally and if the correct opponents are chosen, the player has ability to defeat all the characters. If the player defeats all opponents or if the player loses, a graphic appears to indicate the game is over and an alert follows that prompts the user to play again; doing so will restart the game.
