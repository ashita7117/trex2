  var trex, trex_running, trex_collided;
  var ground, invisibleGround, groundImage;
  var cloudi, CloudsGroup;
  var ObstaclesGroup,Obstacles1,Obstacles2,Obstacles3,Obstacles4,Obstacles5,Obstacles6;
  var count = 0;
  //initiate Game STATEs
  var PLAY = 1;
  var END = 0;
  var WIN = 2
  var gameOver
  var restart
  var gameOveri
  var restarti
  var gameState = PLAY;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png")

  cloudi = loadImage("cloud.png");
  
  Obstacles1 = loadImage("obstacle1.png");
  Obstacles2 = loadImage("obstacle2.png");
  Obstacles3 = loadImage("obstacle3.png");
  Obstacles4 = loadImage("obstacle4.png");
  Obstacles5 = loadImage("obstacle5.png");
  Obstacles6 = loadImage("obstacle6.png");
  
  restarti = loadImage("restart.png");
  gameOveri = loadImage("gameOver.png");
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*count/100);
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  ObstaclesGroup = new Group();
  CloudsGroup = new Group();
  
  gameOver = createSprite(200,100);
  restart = createSprite(200,140);
  
  gameOver.addImage("gameOver",gameOveri);
  gameOver.scale = 0.5;
  restart.addImage("restart",restarti);
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
}

function draw() {
  background(190);
  
  textSize(10);
  text("REACH SCORE 200 TO WIN",1,100)

  if(gameState === PLAY){
   count = count + Math.round(getFrameRate()/60);  
    console.log(trex.y);
  if(keyDown("space") && trex.y > 161) {
    trex.velocityY = -14;
  }

  camera.position.x = displayWidth/8;
  camera.position.y = trex.y;
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/4;
  }
  
  trex.collide(invisibleGround);
  spawnObstacles();
  spawnClouds(); 
    
        //End the game when trex is touching the obstacle
    if(ObstaclesGroup.isTouching(trex)){
      gameState = END;
    }
  }
    else if(gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    ObstaclesGroup.setVelocityXEach(0);
    CloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("collided", trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    ObstaclesGroup.setLifetimeEach(-1);
    CloudsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
    reset();
  }
      
  
  }
  
  if(count === 200){
    gameState = WIN
  }

  if(gameState === WIN){
    //set lifetime of the game objects so that they are never destroyed
    ObstaclesGroup.setLifetimeEach(-1);
    CloudsGroup.setLifetimeEach(-1);
    restart.visible = true;
    textSize(20)
    text("YOU WON",150,110);
    ground.velocityX = 0;
    trex.velocityY = 0;
    trex.y = 161;
    ObstaclesGroup.setVelocityXEach(0);
    CloudsGroup.setVelocityXEach(0);
    trex.changeAnimation("collided", trex_collided);
    if(mousePressedOver(restart)) {
      reset();
    }  
  }
  text("Score: "+ count, 350, 90);
   
  drawSprites();
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  ObstaclesGroup.destroyEach();  
  CloudsGroup.destroyEach(); 
  count = 0;
  trex.changeAnimation("running", trex_running);
}
function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage("cloud",cloudi)
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    CloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -(6 + 3*count/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
switch(rand){
  case 1: obstacle.addImage(Obstacles1);
          break;                                           
    case 2: obstacle.addImage(Obstacles2);
          break;
    case 3: obstacle.addImage(Obstacles3);
          break;
     case 4: obstacle.addImage(Obstacles4);
          break;
      case 5: obstacle.addImage(Obstacles5);
          break;
    case 6: obstacle.addImage(Obstacles6);
          break;     
          default: break;
}
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    ObstaclesGroup.add(obstacle);
  }
}