var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var ground;
var survivalTime = 0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  
  createCanvas(600,400);
  
 monkey = createSprite(50,300,10,10);
 monkey.addAnimation("runing",monkey_running); 
 monkey.scale = 0.1;
  
 ground = createSprite(10,390,900,10);
 ground.velocityX = -4;
 ground.x = ground.width/2;
 console.log(ground.x);
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
  
}


function draw() {

  background('lightBlue');

  if (gameState===PLAY){
  
  
  if(ground.x>0){
    
    ground.x = 440;
    
  }
  
  monkey.collide(ground);
  
  if(keyDown("space")&&(monkey.y>=300)){
    
   monkey.velocityY = -15;
    
  }
  
  monkey.velocityY = monkey.velocityY + 0.8;
  
  bananaSpawn();
  
  obstacleSpawn();
  
  survivalTime = survivalTime + Math.round(getFrameRate()/60);
    
   obstacleGroup.setDepthEach(1);
  monkey.depth = monkey.depth+1;
    
   bananaGroup.setDepthEach(1);
  monkey.depth = monkey.depth+1;
    
  if(obstacleGroup.isTouching(monkey)){
    
    gameState = END;
    
  }
  
  }else if(gameState===END){
    
  monkey.velocityY = 0;
  ground.velocityX = 0;
    
  obstacleGroup.setVelocityXEach(0);
  bananaGroup.setVelocityXEach (0);
    
  obstacleGroup.setLifetimeEach(-1);
  obstacleGroup.setLifetimeEach(-1);
    
  }
  
  stroke = "black";
  fill = "black";
  textSize = 50;
  text("survivalTime " + survivalTime,300,30);
  
  drawSprites();
  
}


function bananaSpawn(){
  
  if(frameCount%80===0){
    
  var banana = createSprite(550,0,10,10);
  banana.addImage("image",bananaImage);
  banana.y = Math.ceil(random(150,250));
  banana.scale = 0.1;
  banana.velocityX = -4;
  banana.lifeTime = 150;
  
  banana.velocityX = -(8+2*(survivalTime/100));  
    
  bananaGroup.add(banana);  
    
  }
  
}

function obstacleSpawn(){
  
  if(frameCount%300===0){
    
    var obstacle = createSprite(0,350,10,10);
    obstacle.addImage("spawn",obstacleImage);
    obstacle.x = Math.ceil(random(300,600));
    obstacle.velocityX = -5;
    obstacle.scale = 0.2;
    obstacle.lifeTime = 120;
    
    obstacle.velocityX = -(7+2*(survivalTime/300));
    
    obstacleGroup.add(obstacle); 
    
  }
  
}


