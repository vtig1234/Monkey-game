//Viyath Wanninayake
//12/29/2020
//Project 16

//Create a sprite for the monkey
var monkey , monkey_running
//Create a sprite f or the banas and the obstacles
var banana ,bananaImage, obstacle, obstacleImage
//Create groups for the bananas and the obstacles
var foodGroup, obstacleGroup
//Make a score
var score=0
//Create a sprite for the ground
var ground

function preload(){
  
//Add animation to all the sprites  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}



function setup() {
  createCanvas(400,400);
  //Create a monkey and add animation to it 
  monkey = createSprite(55,330,50,50);
  monkey.addAnimation("monkey", monkey_running);
  monkey.scale=0.175
  //Create groups for the bananas and the obstacles
  foodGroup=createGroup();
  obstacleGroup=createGroup();
  //Create the ground
  ground=createSprite(0,396,2000,30)
}


function draw() {
  //Make the background white
 background(250);
  //Spawn obstacles
 spawnObstacles();
  //Spawn bananas
 spawnBananas();
  //Make the monkey jump
  if (keyDown("space")&&monkey.y>200){
    monkey.velocityY=-12;
  }
  //Increase the score if the monkey is touching a banana
  if (monkey.isTouching(foodGroup)){
    score=score+1;
    foodGroup.destroyEach();
  }
  //Make the game end if the monkey touches an obstacle
  if (monkey.isTouching(obstacleGroup)){
    //Stop the obstacles from moving
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    //Make the score 0
    score=0;   
    //Make the obstacles and bananas appear immediately
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
    //Stop the monkey jumping
    monkey.velocityY=0;
    //Add a text saying game over
    text("GAME OVER!!!",150,100);
  }
  //Add gravity to the monkey 
  monkey.velocityY=monkey.velocityY+0.8;
  //Make the monkey stay on the ground
  monkey.collide(ground);
  //Add a text for the score
  text("Bananas: "+score,300,50) 
 drawSprites();
}
//Make a funcion for the obstacles
function spawnObstacles(){
  if (frameCount%175===0){
    //Make a sprite for the obstacles
    obstacle=createSprite(500,350, 50, 50);
    //Add animation to them
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.2;
    //Make them move left                                     
    obstacle.velocityX=-6;
    //Make them have a lifetime
    obstacle.lifetime=200;
    obstacleGroup.add(obstacle);
  }
}

function spawnBananas(){
  if (frameCount%80===0){
    //Create the bananas
    banana=createSprite(500,Math.round(random(120,200)),50,50);
    //Add image to the banana
    banana.addImage(bananaImage);
    banana.scale=0.15;
    //Make them move left 
    banana.velocityX=-6;
    //Give them a lifetime
    banana.lifetime=200;
    foodGroup.add(banana);
  }
}