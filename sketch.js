var play =1, end = 0;
var gameState = play;
var jungle, monkey, invisibleGround;
var jungleImage,  monkey_running, bananaImage, obstacleImage;
var foodGroup, obstacleGroup;
var score = 0, die = 0;

function preload(){
  
  jungleImage = loadImage("jungle.jpg");
  
  monkey_running = loadAnimation("Monkey_01.png" , "Monkey_02.png" ,"Monkey_03.png" ,"Monkey_04.png" ,"Monkey_05.png" ,"Monkey_06.png" ,"Monkey_07.png" ,"Monkey_08.png" ,"Monkey_09.png" ,"Monkey_10.png")
  
  bananaImage = loadImage("banana.png");
  
  obstacleImage = loadImage("stone.png");
}

function setup(){
  createCanvas(600, 500);
  
  jungle = createSprite(10, 20);
  jungle.velocityX = -7;
  jungle.addImage(jungleImage);
  jungle.scale = 1.5;
  
  monkey = createSprite(80, 350, 20, 20);
  monkey.addAnimation("moving" , monkey_running);
  monkey.scale = 0.10;
  
  invisibleGround = createSprite(80, 392, 200, 2);
  invisibleGround.visible = false;
  
   foodGroup = new Group();
   obstacleGroup = new Group(); 
}

function draw(){
  background("white")
  
  if(gameState === play){
    
     if (jungle.x < 0){
      jungle.x = jungle.width/2;
    }
  
  
  if(keyDown("space")) {
        monkey.velocityY = -12;
  }

  monkey.velocityY = monkey.velocityY +0.8;
  monkey.collide(invisibleGround);
    
  food();
  
  if(foodGroup.isTouching(monkey)){
    foodGroup.destroyEach();
    score = score +2;
  }
  
  
    textSize(20);
  text("die: " +die, 50, 50);
    
  if(obstacleGroup.isTouching(monkey)){
  obstacleGroup.destroyEach();
  monkey.scale = 0.1;
  die  =die+1
  }

    if(die === 2){
      gameState = end;
    }
  spawnObstacle(); 
  
  size();   
  }
  
  else if(gameState === end){
        jungle.velocityX = 0;
        monkey.velocityY = 0;
        obstacleGroup.setVelocityXEach(0);
        foodGroup.setVelocityXEach(0);
        obstacleGroup.setLifetimeEach(-1);
        foodGroup.setLifetimeEach(-1); 
  }
  
 
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("black");
  text("score: " +score, 500, 50);
  
}

function food(){
  if(frameCount % 60 === 0){
  banana = createSprite(500, 200);
  banana.addImage(bananaImage);
  banana.scale = 0.1;
  banana.velocityX = -7;
  banana.y = Math.round(random(100, 250));
  banana.lifetime = 100;
  foodGroup.add(banana);
  }
}

function spawnObstacle(){
  if(frameCount % 300 === 0){
  stone = createSprite(500, 370);
  stone.addImage(obstacleImage);
  stone.scale = 0.15;
  stone.velocityX = -7;
  stone.lifetime = 100;
  //  stone.debug = true;
  obstacleGroup.add(stone);
}
}


function size(){
switch (score) {
  case 10: monkey.scale = 0.12;
    break;
    case 20: monkey.scale = 0.14;
    break;
    case 30: monkey.scale = 0.16;
    break;
    case 40: monkey.scale = 0.18;
    break;

  default:
    break;
}
}