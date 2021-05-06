  var PLAY = 1;
  var END = 0;
  var gameState = PLAY;

  var bg , bgImage;
  var bird , birdImage;
  var eagle , eagleImage , eaglesGroup;
  var waterpot,waterpot_Image,waterpotsGroup;
  var score;
  var gameOver , gameOverImg,restart , restartImg;

  function preload(){
  //for loading the images
  bgImage = loadImage("4.jpg");
  birdImage = loadImage("2.png");
  eagleImage = loadImage("3.jpg");
  waterpot_Image = loadImage("5.jpg");
  restartImage = loadImage("restart.png");
  gameOverImg = loadImage("gameOver.png");

  }

  function setup() {
  createCanvas(600, 200);
  //For creating the background
  bg = createSprite(200,200,50,50);
  bg.addImage("backgroundImage" , bgImage );
  bg.velocityY = 1;

  //For creating the bird
  bird = createSprite(10,100,20,20);
  bird.addImage("birdImage",birdImage);

  //For creating the ground
  ground = createSprite(200,180,400,20);
  ground.x = ground.width /2;

  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);

  restart = createSprite(300,140);
  restart.addImage(restartImg);

  gameOver.scale = 0.5;
  restart.scale = 0.5;

  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  //for score
  score = 0;

  //For creating groups
  eaglesGroup = new Group();
  waterpotsGroup = new Group();
  }

  function draw() {
  if(gameState === PLAY){  
  if(bg.y > 500){
    bg.y = 300;
  }  

  if (ground.x < 0){
  ground.x = ground.width/2;
  }
    
if(eaglesGroup.isTouching(bird)){
  gameState = END;
}

  spawnEagles();
  spawnWaterpots();
    
  if(keyDown(DOWN_ARROW)){
  bird.y = bird.y + 1;   
  }
  
  if(keyDown(RIGHT_ARROW)){
    bird.x = bird.x + 1;
  }
    gameOver.visible = false;
   restart.visible = false;

  ground.velocityX = -(4 + 3* score/100);
  }


  if(gameState === END){
  gameOver.visible = true;
  restart.visible = true;
    
  ground.velocityX = 0;
  bird.velocityY = 0;

  if(mousePressedOver(restart)) {
  reset();
  }
 }

 
 camera.position.y - displayWidth/2;
 camera.position.x = monkey.x;

 
  drawSprites();
}

  function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;  
  eaglesGroup.destroyEach();
  waterpotsGroup.destroyEach();  
  score = 0; 

  }


  //function for creating eagles
  function spawnEagles(){

  if (frameCount % 60 === 0){
  eagle = createSprite(600,165,10,40);
  eagle.velocityX = -(6 + score/100);
  eagle.addImage(eagleImage)
  //add each eagle to the group
  eaglesGroup.add(eagle);

  }
}

  //function for creating waterpots
  function spawnWaterpots(){
    if (frameCount % 60 === 0) {
  waterpot = createSprite(600,120,40,10);
  waterpot.y = Math.round(random(80,120));
  waterpot.addImage(waterpot_Image);
  waterpot.velocityX = -3;

  //assign lifetime to the variable
  waterpot.lifetime = 200;

  //add each eagle to the group
  waterpotsGroup.add(waterpot);

  }
}