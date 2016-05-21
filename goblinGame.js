//global variables
var canvas = document.getElementById("someCanvas");
var context = canvas.getContext("2d");
var counter = 0;

//random starting postion for the monsters
var mon1MoveX = Math.floor(Math.random() * 450) +20;
var mon1MoveY = Math.floor(Math.random() * 420) +12;
var mon2MoveX = Math.floor(Math.random() * 450) +20;
var mon2MoveY = Math.floor(Math.random() * 420) +12;

// starting postion for the hero
var moveX = 430;
var moveY = 400;
var speed = 30;

//monster direction
var direction = ["left", "right", "up", "down", "up-left", "up-right", "down-left", "down-right"];
var currentDirection = "right";

//player score
var points = 0;

//puts hero on the board
function draw_image(){
  base_image = new Image();
  base_image.src = 'Images/hero.png';
  context.drawImage(base_image, moveX, moveY);
}

//puts monster on the board
function draw_monster(){
  monster = new Image();
  monster.src = 'Images/monster.png';
  context.drawImage(monster, mon1MoveX, mon1MoveY);
  context.drawImage(monster, mon2MoveX, mon2MoveY);

  //when interations > 51 but < 52 change monster postion

}

function monster_move() {
  if (currentDirection === "left") {
    mon1MoveX = mon1MoveX - 1;
  } else if (currentDirection === "right") {
    mon1MoveX = mon1MoveX + 1;
  } else if (currentDirection === "up") {
    mon1MoveY = mon1MoveY - 1;
  } else if (currentDirection === "down"){
    mon1MoveY = mon1MoveY + 1;
  } else if (currentDirection === "up-left"){
    mon1MoveY = mon1MoveY - 1;
    mon1MoveX = mon1MoveX - 1;
  } else if (currentDirection === "up-right"){
    mon1MoveY = mon1MoveY - 1;
    mon1MoveX = mon1MoveX + 1;
  } else if (currentDirection === "down-left"){
    mon1MoveY = mon1MoveY + 1;
    mon1MoveX = mon1MoveX - 1;
  } else if (currentDirection === "down-right"){
    mon1MoveY = mon1MoveY + 1;
    mon1MoveX = mon1MoveX + 1;
  }


  //these if statements wraps the monsters around the game
  if (mon1MoveX < 20) {
    mon1MoveX = 445;
  }
  // mon1MoveX = mon1MoveX + 2;
  if (mon1MoveX > 445) {
    mon1MoveX = 20;
  }
  // mon1MoveY = mon1MoveY + 2;
  if (mon1MoveY > 420) {
    mon1MoveY = 17;
  }
  //mon1MoveY = mon1MoveY - 2;
  if (mon1MoveY < 17) {
    mon1MoveY = 420;
  }

  //this keeps the interation count
  if(counter === 10) {
    //swtich directions
    changeDir();
  }
}

function changeDir() {
  var idx = Math.floor(Math.random() * 8);
  currentDirection = direction[idx];
  //debugger
  //console.log(currentDirection);
}
// when monster is caught

function monster_catch() {
  if (moveX === mon1MoveX && moveY === mon1MoveY) {
    alert("yes");
  }
}
//puts the background image on the page
function redraw_background() {
  background = new Image();
  background.src = 'Images/background.png';
  context.drawImage(background, 0, 0);
}


window.addEventListener('keydown', function(e) {
  //restrictions for the hero
  if (moveX > 450){
    moveX = 445;
  } else if(moveX < 20){
    moveX = 25;
  }

  if (moveY > 420){
    moveY = 415;
  } else if(moveY < 12){
    moveY = 17;
  }

  //makes the hero move, based on arrow keystrokes
  var key = e.keyCode;

  if (key === 37) { // left
    moveX -= speed;
  }
  if (key === 39) { // right
    moveX += speed;
  }
  if (key === 38) { // up
    moveY -= speed;
  }
  if (key === 40) { // down
    moveY += speed;
  }


});


function main() {
  //counting the  counter
  if (counter < 50) {
    counter++;
  } else {
    counter = 0;
  }
  //console.log(counter);

  redraw_background();
  draw_image();
  draw_monster();
  monster_move();
  //monster_catch();
  requestAnimationFrame(main);
  monster_catch();
}
main();
