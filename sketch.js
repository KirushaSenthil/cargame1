var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;
var cars=[]
var car1,car2,car3,car4;
var cars1, cars2, cars3, cars4;
var trackImage;

var form, player, game;

function preload(){
  cars1=loadImage("car1.png")
  cars2=loadImage("car2.png")
  cars3=loadImage("car3.png")
  cars4=loadImage("car4.png")
  trackImage=loadImage("track.jpg")
}


function setup(){
  canvas = createCanvas(displayWidth,displayHeight);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState===2){
    game.end();
  }
}
