var buttonColours = ["red", "blue", "green", "yellow"];
var colorPattern = [];
var inputUser = [];
var level = 0;
var start = false;

// Start 
$(document).keypress(function(){
    if (!start) {
        start = true;
        $("#level-title").text("Level " + level);
        nextSequence();
    }
});

// Button when click
$("button").click(function(){
    if (!start) return; 

    var userChosenColour = $(this).attr("id");
    inputUser.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(inputUser.length - 1);
});

// Sequences
function nextSequence() {
    inputUser = []; // Reset input user
    level++;

    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];

    colorPattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

// Play sound
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// Animation Press
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 10);
}

// Checking Answer 
function checkAnswer(currentLevel) {
    if (inputUser[currentLevel] === colorPattern[currentLevel]) {
        if (inputUser.length === colorPattern.length) { // Make they're in the same length or IndexOutOf
            setTimeout(nextSequence, 1000);
        }
    } else {
        $("#level-title").text("Game Over! Press Any Key to Play Again");
        playSound("wrong");
        restart();
    }
}

// Restart
function restart() {
    level = 0;
    colorPattern = [];
    start = false;
}
