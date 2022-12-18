// $("h1").on("click",function(){
//   $("h1").slideUp().slideDown().animate({opacity:0.5});
//   setTimeout(function(){$("h1").animate({opacity:1})},2000);
// });

var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var randomNumber;
var level=0;
var randomChosenColour;
var userClickedPattern = [];
var started = false;//missed it

function playSound(name){
    var playAudio = new Audio("sounds/" + name + ".mp3");
    playAudio.play();
}
function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}//took too long


//didn't do it on my own
function checkAnswer(currentLevel) {

    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
        if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
          setTimeout(function () {
          nextSequence();
          }, 1000);

      }

    }
    else {

      console.log("wrong");
      playSound("wrong");

      //2. In the styles.css file, there is a class called "game-over", apply this class to the body of the website when the user gets one of the answers wrong and then remove it after 200 milliseconds.
      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      //3. Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
      $("#level-title").text("Game Over, Press Any Key to Restart");

    }

}

function startOver(){
  level=0;

}
function nextSequence() {

  level++;
  $("h1").text("Level "+level);
  randomNumber = Math.floor(Math.random() * 4);
  randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);


  // Use jQuery to select the button with the same id as the randomChosenColour (step1 from module step3-Instructions)
  //added audio also
  // $("#"+randomChosenColour).on("click", function() {
  //   $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  //   var playAudio = new Audio("sounds/" + randomChosenColour + ".mp3");
  //   playAudio.play();
  // });

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}
  //detects when which button was pressed
  $(".btn").on("click", function(event) {


    var userChosenColour = event.target.id; //event.target.id gets me the id
    console.log(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    // $("#"+userChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    //2. Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
    checkAnswer(userClickedPattern.length-1);

  });




//detects which key was pressed
$("body").on("keydown",function(event){
  if(!started){
    started=true;
    nextSequence();}

});
//above's replacement
/*
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});
*/
function checkAnswer(currentLevel){
  level = 0;
  gamePattern = [];//took help
  started = false;//took help
}
