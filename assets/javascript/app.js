$(document).ready(function () {
var options = [
	{
		question: "Where was the first Super Bowl held?", 
		choice: ["Los Angeles", "Green Bay", "Miami", "New York" ],
		answer: 0,
		photo: "assets/images/LosAngeles.jpg"
	 },
	 {
	 	question: "I was the MVP of Super Bowl XLI. I attended the University of Tennessee and play the position of quarterback. Who am I?", 
		choice: ["Tom Brady", "Terry Bradshaw", "Joe Montana", "Peyton Manning" ],
		answer: 3,
		photo: "assets/images/Peyton.gif"
	 }, 
	 {
	 	question: "Who won the first Super Bowl?", 
		choice: ["Dallas Cowboys", "Green Bay Packers", "Baltimore Colts", "Oakland Raiders" ],
		answer: 1,
		photo: "assets/images/Packers.gif"
	}, 
	{
		question: "Which team has won the most Super Bowls?", 
		choice: ["Pittsburgh Steelers", "Dallas Cowboys", "New England Patriots", "New York Giants" ],
		answer: 0,
		photo: "assets/images/Steelers.jpg"
	}, 
	{
		question: "On average, how many calories does a Super Bowl viewer consumer on game day?", 
		choice: ["3,000", " 4,000", "5,000", "3500" ],
		answer: 0,
		photo: "assets/images/calories.jpg"
	}, 
	{
		question: "On Super Bowl weekend, there are fewer of what important event than any other time of year?", 
		choice: ["Birthday parties", "Funerals", "Weddings", "Engagement" ],
		answer: 2,
		photo: "assets/images/wedding.jpg"
	}, 
	{
		question: "Approximately how many pounds of guacamole are eaten by Americans on Super Bowl Sunday?", 
		choice: ["25 million", "44 million", "75 million", "32 million" ],
		answer: 1,
		photo: "assets/images/guacamole.gif"
	}, 
	{
		question: "Which city has hosted the most Super Bowls?", 
		choice: ["New Orleans", "Miami", "Tampa", "New York" ],
		answer: 1,
		photo: "assets/images/Miami.gif"
	}];

var correctCount = 0;
var wrongCount = 0;
var unanswerCount = 0;
var timer = 20;
var intervalId;
var userGuess ="";
var running = false;
var qCount = options.length;
var pick;
var index;
var newArray = [];
var holder = [];



$("#reset").hide();
//click start button to start game
$("#start").on("click", function () {
		$("#start").hide();
		displayQuestion();
		runTimer();
		for(var i = 0; i < options.length; i++) {
	holder.push(options[i]);
}
	})
//timer start
function runTimer(){
	if (!running) {
	intervalId = setInterval(decrement, 1000); 
	running = true;
	}
}
//timer countdown
function decrement() {
	$("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
	timer --;

	//stop timer if reach 0
	if (timer === 0) {
		unanswerCount++;
		stop();
		$("#answerblock").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
		hidepicture();
	}	
}

//timer stop
function stop() {
	running = false;
	clearInterval(intervalId);
}
//randomly pick question in array if not already shown
//display question and loop though and display possible answers
function displayQuestion() {
	//generate random index in array
	index = Math.floor(Math.random()*options.length);
	pick = options[index];

//	if (pick.shown) {
//		//recursive to continue to generate new index until one is chosen that has not shown in this game yet
//		displayQuestion();
//	} else {
//		console.log(pick.question);
		//iterate through answer array and display
		$("#questionblock").html("<h2>" + pick.question + "</h2>");
		for(var i = 0; i < pick.choice.length; i++) {
			var userChoice = $("<div>");
			userChoice.addClass("answerchoice");
			userChoice.html(pick.choice[i]);
			//assign array position to it so can check answer
			userChoice.attr("data-guessvalue", i);
			$("#answerblock").append(userChoice);
//		}
}



//click function to select answer and outcomes
$(".answerchoice").on("click", function () {
	//grab array position from userGuess
	userGuess = parseInt($(this).attr("data-guessvalue"));

	//correct guess or wrong guess outcomes
	if (userGuess === pick.answer) {
		stop();
		correctCount++;
		userGuess="";
		$("#answerblock").html("<p>Correct!</p>");
		hidepicture();

	} else {
		stop();
		wrongCount++;
		userGuess="";
		$("#answerblock").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
		hidepicture();
	}
})
}


function hidepicture () {
	$("#answerblock").append("<img src=" + pick.photo + ">");
	newArray.push(pick);
	options.splice(index,1);

	var hidpic = setTimeout(function() {
		$("#answerblock").empty();
		timer= 20;

	//run the score screen if all questions answered
	if ((wrongCount + correctCount + unanswerCount) === qCount) {
		$("#questionblock").empty();
		$("#questionblock").html("<h3>Game Over!  Here's how you did: </h3>");
		$("#answerblock").append("<h4> Correct: " + correctCount + "</h4>" );
		$("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>" );
		$("#answerblock").append("<h4> Unanswered: " + unanswerCount + "</h4>" );
		$("#reset").show();
		correctCount = 0;
		wrongCount = 0;
		unanswerCount = 0;

	} else {
		runTimer();
		displayQuestion();

	}
	}, 3000);


}

$("#reset").on("click", function() {
	$("#reset").hide();
	$("#answerblock").empty();
	$("#questionblock").empty();
	for(var i = 0; i < holder.length; i++) {
		options.push(holder[i]);
	}
	runTimer();
	displayQuestion();

})

})