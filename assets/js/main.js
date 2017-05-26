var riddles = [
	// Riddle 1
	{
	riddle:
	["The thunder comes before the lightning,", 
	"And the lightning comes before the cloud,", 
	"The rain dries all the land it touches,", 
	"Wrapping the earth in a blood red shroud."],
	answer:"VOLCANO"
	},
	// Riddle 2
		{
	riddle:
	["It may only be given,", 
	"Not taken or bought,", 
	"What the sinner desires,", 
	"But the saint does not."],
	answer:"FORGIVENESS"
	},
	// Riddle 3
	{
	riddle:
	["Made of ten but two we make,", 
	"When assembled others quake,", 
	"Five apart and we are weak,", 
	"Five together havoc wreak."],
	answer:"FISTS"
	},
	// Riddle 4
	{
	riddle:
	["Bury deep,", 
	"Pile on stones,", 
	"My mind will always,", 
	"Dig up them bones."],
	answer:"MEMORIES"
	},
	// Riddle 5
	{
	riddle:
	["You may think you know me,", 
	"But that's where you're wrong.", 
	"For many alike have pondered me long.", 
	"My secret is simple, but locked up tight.",
	"You hold the key, it is in your sight."],
	answer:"RIDDLE"
	}
]

// Grabbing HTML Interface Elements 
var startBtn = document.querySelector("#startBtn");
var msgField = document.querySelector("#messageField");
var gameFooter = document.querySelector(".gameFooter");
var lifeCount = document.querySelector("#lifeCount");
var wrongLetters = document.querySelector("#wrongGuesses");
var winsCount = document.querySelector("#wins");
var wins = 0;

// Initiate Game start
startBtn.onclick =  function(){
	gameStart();
};

//Game start function
function gameStart(){
	// Initial properties at the start of each new game.
	var score = 0;
	var chances = 7;
	var rightGuess = [];
	var wrongGuess = [];
	lifeCount.innerHTML = chances + " attempts left";
	winsCount.innerHTML = "Wins: " + wins;
	wrongLetters.innerHTML = "Wrong Guesses: " + wrongGuess;
	// Pick random riddle from the array of objects.
	var randRiddle = riddles[Math.floor(Math.random() * riddles.length)];
	// Assign the selected riddles answer to a variable.
	var randAnswer = randRiddle.answer;
	// Split each letter from the answer into a brand new array.
	var letterArr = randRiddle.answer.split('');
	// Create, Display, and Assign the guessing field in the interface. Get rid of start button.
	gameFooter.innerHTML = "<div class=\"wordWrap\"></div>";
	var wordWrap = document.querySelector(".wordWrap");
	// Create a blank underlined space with a unique ID for each letter in the answer.
	for(var i = 0; i < letterArr.length; i++){
		var mask = document.createElement("span");
		mask.className = "mask";
		mask.id = "id" + i;
		wordWrap.appendChild(mask);
	}
	// Display the riddle in the interface.
	msgField.innerHTML = "<div class=\"riddleWrap\"></div>";
	var riddleWrap = document.querySelector(".riddleWrap");
	// Display each line of the riddle picked from the array on its unique line. 
	for (var i = 0; i < randRiddle.riddle.length; i++) {
		var line = document.createElement("li");
		riddleWrap.appendChild(line);
		line.innerHTML = randRiddle.riddle[i] + "</br>";
	}
	// Event watch for the users keyboard choices.
	document.onkeyup = function(event){

		var keyInput = event.key.toUpperCase();
		var letterIndex = letterArr.indexOf(keyInput);
		var keyInputCode = keyInput.charCodeAt(0);

		//Check if the keys pressed are capital letters, and not meta keys.
		if(keyInput.length == 1 && (keyInputCode >= 65 && keyInputCode <= 99)) {
			// Check if the letter pressed is in the answer.
			if (letterIndex !== -1){
				// Check if this is not a duplicate selection. Then execute code.
				if (rightGuess.indexOf(keyInput) === -1){
					// Push new letters to rightGuess array to prevent future duplicates.
					rightGuess.push(keyInput);
					// Unmask each correct letter in its appropriate position.
					for (var i = 0; i < randAnswer.length; i++) {
						if(keyInput === randAnswer.charAt(i)){
							var unMask = document.getElementById("id"+i);
							unMask.className = "unMask";
							unMask.innerHTML = keyInput;
							// Increase score in order to keep track of correct letters.
							score++;
						}
						// If score matches the length of the answer, the player wins.
						if (score === randAnswer.length){
							wrongGuess.length = 0;
							wrongLetters.innerHTML = "";
							var newBtn = "<div class='btnWrap'><button id='playAgain' class='btn' autofocus>PLAY AGAIN</button></div>";
							riddleWrap.innerHTML = "<p>YOU WIN!</p></br>" + newBtn;
							wrongLetters.innerHTML = "Wrong Guesses: ";
							var playAgain = document.querySelector("#playAgain");
							playAgain.onclick =  function(){
								wins++;
								gameStart();
							};
						}
					}
				}

			} else {
				// Prevents the "attempts left" number from going into negatives. 
				if(chances > 0 && wrongGuess.indexOf(keyInput) === -1){
					wrongGuess.push(keyInput);
					// Decrease and the attempts left number and change the interface.
					chances--;
					lifeCount.innerHTML = chances + " attempts left";
					wrongLetters.innerHTML = "Wrong Guesses: " + wrongGuess;
				}
				// If we reach 0 attempts left, the player loses.
				if(chances == 0){
					var newBtn = "<div class='btnWrap'><button id='tryAgain' class='btn' autofocus>TRY AGAIN</button></div>";
					riddleWrap.innerHTML = "<p>YOU LOSE!</p></br>" + newBtn;
					var tryAgain = document.querySelector("#tryAgain");
					wrongGuess.length = 0;
					wrongLetters.innerHTML = "Wrong Guesses: ";
					document.onkeyup = function(event){
						console.log("you lost");
					};
					tryAgain.onclick =  function(){
						gameStart();
					};
				}
			}

		}

	};

};