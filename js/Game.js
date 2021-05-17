class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
    car1=createSprite(100,200)
    car2=createSprite(300,200)
    car3=createSprite(500,200)
    car4=createSprite(700,200)
    car1.addImage(cars1)
    car2.addImage(cars2)
    car3.addImage(cars3)
    car4.addImage(cars4)
    cars=[car1,car2,car3,car4]
  }

  play(){
    form.hide();
    textSize(30);
    text("Game Start", 120, 100)
    Player.getPlayerInfo();
    player.getCarsAtEnd();

    if(allPlayers !== undefined){
      background("#684132")
      image(trackImage,0,-displayHeight*4,displayWidth,displayHeight*5)
      var index=0
      var x=175
      var y=0
      for(var plr in allPlayers){
        index=index+1
        x=x+200
        y=displayHeight-allPlayers[plr].distance
        cars[index-1].x=x
        cars[index-1].y=y
        if(index===player.index){
          strokeWeight(20)
          stroke("green")
          fill("pink")
          circle(x,y,100)
          cars[index-1].shapeColor=("green")
          camera.position.x=displayWidth/2
          camera.position.y=cars[index-1].y
        }
        else{
          cars[index-1].shapeColor=("red")
        }
      }
    }
    drawSprites();
    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=50
      player.update();
    }
    if(player.distance>500){
      gameState=2
      player.rank=player.rank+1
      Player.updateCarsAtEnd(player.rank)
      player.update()
    }
  }
  end(){
    console.log("game over")
    console.log(player.rank)
  }
  displayRanks(){

    camera.position.x=0
   camera.position.y=0
   background("white")
   image(rank1,-300,-100,200,200)
   image(rank2,-100,-100,200,200)
   image(rank3,100,-100,200,200)
   image(rank4,300,-100,200,200)
   Player.getPlayerInfo()
   for(var plr in allPlayers){
     textSize(25)
     if(allPlayers[plr].rank===1){
      
       text("first;"+allPlayers[plr].name,-300,100)
     }
     else if(allPlayers[plr].rank===2){
       text("second;"+allPlayers[plr].name,-100,100)
     }
     else if(allPlayers[plr].rank===3){
       text("third;"+allPlayers[plr].name,100,100)
     }
     else if(allPlayers[plr].rank===4){
       text("fourth;"+allPlayers[plr].name,300,100)
     }
   }
  }
}
