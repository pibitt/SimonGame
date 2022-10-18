
let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;
let maxLevel = 0;


$(document).keypress(function () {
    if (!started) {
        $('h1')[0].innerText = "Level " + level;
        nextSequence();
        started = true;
    }
});

$('.btn').click(function (event) {
    let userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
})

function nextSequence() {
    userClickedPattern = [];
    level++;
    
    $('h1')[0].innerText = "Level " + level;
    let randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeToggle(100).fadeToggle(100);
    playSound(randomChosenColour);
}

function playSound(colorName) {
    var audio = new Audio("sounds/" + colorName + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $('#' + currentColour).addClass('pressed');
    setTimeout(function () {
        $('#' + currentColour).removeClass('pressed');
    }, 100);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");  
            
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("wrong");
        var audioGameOver = new Audio("sounds/wrong.mp3");
        audioGameOver.play();
        $('h1')[0].innerText = "Game Over, press any key to restart";
        
        if (level > maxLevel){
            maxLevel = level;
            $('h2')[0].innerText = "Max Level:" + maxLevel;
        }
        
        
        $('body').addClass('game-over');
        setTimeout(function () {
            $('body').removeClass('game-over');
            startOver();

        }, 2000);


    }
}

function startOver() {
    $('h1')[0].innerText = "Press A Key to Start";
    gamePattern = [];
    userClickedPattern = [];
    started = false;
    level = 0;
    

}









