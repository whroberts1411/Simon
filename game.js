//  Javascript code for the Simon Game ----------------------------------------

// Variables that are used during the game ------------------------------------
var level = 0;
var gameStarted = false;
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
$(".next").animate({ opacity: 0 });

// Event listeners that are used in the game ----------------------------------
$(".btn").on("click", function () {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePressed(userChosenColour);
});

$("body").keydown(function () {
  $(".next").animate({ opacity: 1 });
  if (!gameStarted) {
    gameStarted = true;
    nextSequence();
  } else {
    checkAnswer();
  }
});

$(".next").on("click", function () {
  checkAnswer();
});

// ----------------------------------------------------------------------------
function nextSequence() {
// ----------------------------------------------------------------------------
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);
  userClickedPattern.length = 0;
  selected = $("#" + randomChosenColour);
  playSound(randomChosenColour);

  for (var i = 0; i < 3; i++) {
    selected.fadeOut(80).fadeIn(80);
  }

  level += 1;
  $("#level-title").text("Level " + level);
}
// ----------------------------------------------------------------------------
function playSound(name) {
// ----------------------------------------------------------------------------
  sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}
// ----------------------------------------------------------------------------
function animatePressed(currentColour) {
// ----------------------------------------------------------------------------
  control = $("#" + currentColour);
  control.addClass("pressed");
  setTimeout(function () {
    control.removeClass("pressed");
  }, 100);
}
// ----------------------------------------------------------------------------
function checkAnswer() {
// ----------------------------------------------------------------------------
  if (JSON.stringify(gamePattern) === JSON.stringify(userClickedPattern)) {
    playSound('beep');
    setTimeout(function () {
      nextSequence();
    }, 500);
  } else {
    resetGame();
  }
}
// ----------------------------------------------------------------------------
function resetGame() {
// ----------------------------------------------------------------------------
  $('body').addClass('game-over');
  setTimeout(function () {
    $('body').removeClass('game-over');
  }, 200);

  swal(
    "You Got To Level " + (level - 1) + "!",
    "PC : " + gamePattern + "\nYou : " + userClickedPattern
  );

  playSound("wrong");
  $(".next").animate({ opacity: 0 });
  $("#level-title").text("Press A Key to Start");
  gamePattern.length = 0;
  level = 0;
  gameStarted = false;
}
// ----------------------------------------------------------------------------
