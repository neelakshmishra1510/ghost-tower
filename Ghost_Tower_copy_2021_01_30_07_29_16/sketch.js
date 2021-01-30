var ghost,ghostanimation;
var tower,toweranimation;
var dooranimation,climberanimation;
var climberGroup,standGroup;
var gameState,gameOver,Gameanimation
var PLAY,horrorSound


function preload(){
  ghostanimation = loadImage("ghost-standing.png")
  toweranimation = loadImage("tower.png")
  dooranimation = loadImage("door.png")
  climberanimation = loadImage("climber.png")
  Gameanimation = loadImage("game-over.png")

  horrorSound=loadSound("287.wav")
}
function setup(){
  createCanvas(500,500)
    
  horrorSound.loop()
  
  tower = createSprite(250,250,450,450)
  tower.scale =0.91
  tower.addAnimation("tower",toweranimation)
  tower.velocityY =3
  
  ghost = createSprite(250,250,20,50)
  ghost.addAnimation("standing",ghostanimation)
  ghost.scale = 0.3
  ghost.depth = 5
  
  climberGroup = new Group()
  standGroup = new Group()
  gameOver= createSprite(250,250,50,50)  
  gameOver.addAnimation("animation",Gameanimation)
  gameOver.visible = false;
}
function draw(){
  background("black")
   if(tower.y>502){
     tower.y =tower.width/3
     }
  
  if(gameState===PLAY){
 
  
  ghost.velocityY = ghost.velocityY + 0.8
  
  spawnDoors();
  controals();
  if(standGroup .isTouching(ghost)){
     ghost.velocityY = 0
     }
  if (climberGroup.isTouching(ghost)|| ghost.y > 600){
     gameState = "END";
     fill("red")
      }
  }
   else if(gameState==="END"){
       
       gameOver.visible=true
       fill("red")
    console.log("ghost is dead")
    tower.velocityY=0
   horrorSound.pause()
  }
  drawSprites()
}

function spawnDoors(){
  var door,xPosition,climber,yPosition,stand;
  
 
 
  if(frameCount%150 === 0){ 
     door = createSprite(250,250,70,50)
     xPosition = random(50,450)
     yPosition = random(1,10)
     door.x = xPosition
     door.y = yPosition
    door.velocityY = 2
     door.addAnimation("door",dooranimation)
     climber = createSprite(250,250,1,20)
  climber.addAnimation("climberAnimation",climberanimation)
    climber.x = door.x
    climber.y = door.y + 70
    climber.velocityY = 2
    door.depth = 1
    climber.debug =false
    climber.setCollider("rectangle",0,5,climber.width,15)
    climber.depth = 2
    stand = createSprite(10,10,95,10)
    stand.y = door.y + 64
    stand.x = door.x
    stand.velocityY = 2
    // ghost.collide(stand)
    if (ghost.isTouching(stand)){
        ghost.velocityY = 0
        }
    climberGroup.add(climber)
    standGroup.add(stand)
    stand.visible = false
     }
 
 
}
function controals(){
  if (keyDown("right")){
    ghost.x =ghost.x+5
  }
  if (keyDown("left")){
    ghost.x =ghost.x-5
  }
  if(keyDown("space")){
    // ghost.y =ghost.y - 0.1  
    ghost.velocityY = -5 
     }
}