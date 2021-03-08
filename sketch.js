var tower, towerImage;
var door, doorImage, doorsGroup;
var climber, climberImage, climbersGroup;
var ghost, ghostImage;
var invisibleBlock, invisibleBlocksGroup;
var gameState = "play";
var spookySound;
var score = 0;

function preload() {
  towerImage = loadImage("tower.png");
  doorImage = loadImage("door.png");
  climberImage = loadImage("climber.png");
  ghostImage = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600,600);
  
  spookySound.loop();
  
  tower = createSprite(300,300);
  tower.addImage("tower", towerImage);
  tower.velocityY = 1;
  tower.scale = 0.9;
  
  ghost = createSprite(200,200,50,50);
  ghost.addImage("ghost", ghostImage);
  ghost.scale = 0.3;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlocksGroup = new Group();
}

function draw() {
  background(0);
  
  stroke("yellow");
  fill("yellow");
  textSize(20);
  text("Score: "+score, 450, 50);

  if(gameState === "play") {
    if(keyDown("left_arrow")) 
    {
    ghost.x = ghost.x-3;
    }
    
    if(keyDown("right_arrow")) 
    {
    ghost.x = ghost.x+3;
    }
    
    if(keyDown("space")) 
    {
    ghost.velocityY = -5;
    }
    
    score = score+Math.round(getFrameRate()/60);
    
    ghost.velocityY = ghost.velocityY+0.3;
    
    if(tower.y > 400) 
    {
    tower.y = 300;
    }
    
    spawnDoors();
    
    if(climbersGroup.isTouching(ghost)) 
    {
    ghost.velocityY = 0;
    }
  
    if(invisibleBlocksGroup.isTouching(ghost) || ghost.y >   600)   
    {
    ghost.destroy();
    gameState = "end";
    }

    drawSprites();
  }
  
  if(gameState === "end") {
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over!", 230, 250);
  }
}

function spawnDoors() {
  if(frameCount % 240 === 0) {
    door = createSprite(200,-50);
    door.addImage("door", doorImage);
    door.velocityY = 1;
    door.x = Math.round(random(120,400));
    door.lifetime = 800;
    ghost.depth = door.depth;
    ghost.depth += 1
    doorsGroup.add(door);

    climber = createSprite(200,10);
    climber.addImage("climber", climberImage);
    climber.velocityY = 1;
    climber.x = door.x;
    climber.lifetime = 800;
    climbersGroup.add(climber);
    invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    invisibleBlock.x = door.x;
    invisibleBlock.velocityY = 1;
    invisibleBlock.debug = false;
    invisibleBlocksGroup.add(invisibleBlock);
  }
}