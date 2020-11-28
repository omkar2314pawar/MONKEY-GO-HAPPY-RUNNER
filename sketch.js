var PLAY =1;
var END =0;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup, bananaGroup;
var score;
var survivalTime=0;
var ground,groundImage;
var invisibleGround;
var gameState=PLAY;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  groundImage= loadImage("ground.png");
 
}



function setup() {
  createCanvas(400,400);
  
  monkey=createSprite(40,310,20,20);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale=0.12;
  

  
  ground = createSprite(200,370,400,10);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  invisibleGround = createSprite(200,355,400,10);
  invisibleGround.visible=false;
  
  bananaGroup= new Group();
  obstacleGroup= new Group();
  
  score =0;
  
}


function draw() {
  background("white");
  
  if(gameState===PLAY){
    
      ground.velocityX=-3;
    
    
  stroke("blue");
  textSize(20);
  fill("blue");
  text("Score : "+score,250,50);
   
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime =Math.ceil(frameCount/frameRate());
  text("Survival Time :" + survivalTime,50,50);  
    
  
    
    if (ground.x < 130){
      ground.x = ground.width/2;
    }
  
    
  if(keyDown("space")&& monkey.y>=309){
    monkey.velocityY=-17;
  }
    
    
  monkey.velocityY=monkey.velocityY+0.8;
  
  food();
    
  obstacles();
    
  monkey.collide(invisibleGround);

    
    if(bananaGroup.isTouching(monkey)){
      score=score+1;
       
        bananaGroup.destroyEach(); 
    }
      
    }
    
 if(obstacleGroup.isTouching(monkey)){

   bananaGroup.destroyEach();
    obstacleGroup.destroyEach();
    score=0;
    survivalTime=0;
    monkey.velocityX=0;
    ground.velocityX=0;
    obstacleGroup.velocityX=0;
    
    
 } 
   
  
  drawSprites();
  
}

function food(){
  if(frameCount % 80 ===0){
    banana = createSprite(400,200,5,5);
    banana.y= Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.velocityX=-3;
    banana.lifetime=200;
    
    
    bananaGroup.add(banana);
    
  }
  
  
  
}


function obstacles(){
  if (frameCount%300===0){
    obstacle= createSprite(400,350,50,20);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.2;
    obstacle.velocityX=-3;
    obstacle.lifetime=200;
    
    obstacleGroup.add(obstacle);
    
  }
  
  function reset(){
    
    
  }
  
}

