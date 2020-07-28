
var buttonColors = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$("#level-title").click(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    $("#def").hide();
    nextSequence();
    started = true;
  }
});

$(".btn").click(function(){
  var userChoosenColor = $(this).attr("id");
  userClickedPattern.push(userChoosenColor);
  playSound(userChoosenColor);
  animatePress(userChoosenColor);
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    if(gamePattern.length===userClickedPattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }
  else{
    var audiow = new Audio("sounds/wrong.mp3");
    audiow.play();

    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("#level-title").text("Game Over,Please press here to Restart");
    startOver();
  }
}

function nextSequence(){
  userClickedPattern=[];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random()*4);
  var randomChoosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChoosenColor);

  $("#"+randomChoosenColor).fadeIn(200).fadeOut(300).fadeIn(200);
  playSound(randomChoosenColor);
}




function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function() {
    $("#"+currentColor).removeClass("pressed");
  }, 100);
}

function startOver(){
  started = false;
  level = 0;
  gamePattern = [];
  $("#def").show();
  $("#def").text(" Read the rules again:- A color will flash.You have to click the flashed color.Then another color will flash and you have to click previous as well as current color.In this way, you have to remember the sequence and click the colors in the sequence of the flashing.")
}
