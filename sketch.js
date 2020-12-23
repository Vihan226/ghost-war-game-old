var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"


function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  //spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  //spookySound.loop();
   //ghost.addImage("ghost", ghostImg);
  
  tower=createSprite(300,300);
  tower.addImage("tower", towerImg);
  
  ghost=createSprite(200,200,50,50);
  ghost.addImage("ghost",ghostImg);
  ghost.scale=.3;
  
  
   
  tower.velocityY=1;
  
  doorsGroup=new Group();
  climbersGroup=new Group();
  
  invisibleBlockGroup=new Group();
}

function draw(){
  background(250);
  if(gameState==="play"){
    
  
 if(tower.y>400){
 tower.y=300;
 }

  if(keyDown("space")){
     ghost.velocityY=-5;
     }
  if(keyDown("left_arrow")){
     ghost.x=ghost.x-4;
     }
  if(keyDown("right_arrow")){
     ghost.x=ghost.x+4;
     }
  ghost.velocityY=ghost.velocityY+.5;
  
    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY=0
      
    }
  
  
  if(invisibleBlockGroup.isTouching(ghost)|| ghost.y>600){
      ghost.destroy();
    gameState="end";
      
    }
    spawnDoors();
  
    drawSprites();
}
  if(gameState==="end"){
    textSize(40);
    text("gameover",200,200);
  }
}
  
  
function spawnDoors() {
  //write code here to spawn the doors in the tower
  if(frameCount%200===0){
    door=createSprite(200,-50);
    door.addImage("door",doorImg)
    door.velocityY=1
    door.x=Math.round(random(150,400))
    door.lifetime=700
    doorsGroup.add(door);
    
    climber=createSprite(200,10)
    climber.addImage("climber",climberImg);
    climber.velocityY=1
    climber.x=door.x;
    
    
    invisibleBlock=createSprite(200,15);
    invisibleBlock.width=climber.width;
    invisibleBlock.height=2;
    invisibleBlock.x=door.x;
    invisibleBlock.velocityY=1;
    invisibleBlock.lifetime=700;
    invisibleBlockGroup.add(invisibleBlock);
    
    invisibleBlock.debug=true;
    
    climber.lifetime=700
    climbersGroup.add(climber);
    
    ghost.depth=door.depth;
    ghost.depth  +=1
     
     
     }
}

