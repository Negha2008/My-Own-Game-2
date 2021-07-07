var girl,girl_jumping ;
var tower , towerImage ;
var climberImage;
var gameState ="level1";
var score =0;

var coinsGroup, o1Group, o2Group, o3Group, o4Group;
var invisilbeclimbersGroup, climbersGroup;

function preload(){
    girlstanding = loadAnimation("1.png");
girljumping = loadAnimation("1.png","2.png", "3.png","4.png");
girlImage = loadImage("1.png");
towerImage = loadImage("tower.gif");
climberImage = loadImage( "climber.png");
coinImage = loadImage ("coin4.png");
gameOverImg = loadImage("gameOver.png")
restartImg = loadImage("restart.png");
o1Img = loadImage("o1.png")
o2Img = loadImage("o2.png")
o3Img = loadImage("o3.png")
o4Img = loadImage("o4.png")

jumpSound = loadSound("jump.mp3")
gameOverSound = loadSound("gameOver.mp3")
levelChangeSound = loadSound("levelChange.mp3")
}

function setup(){
createCanvas (400, 600);
tower= createSprite(200,300, 600,600);
tower.addImage(towerImage);
//tower.scale = 0.1
tower.scale = 4 ;
girl = createSprite(width/2,height-50,50,50);
girl.addAnimation("standing", girlstanding);
girl.addAnimation("jumping",girljumping)
girl.debug=true;
girl.setCollider("rectangle", 0, 0, 10, 80, -45)
girl.scale = 0.3;
//girl.addImage(girlImage);

gameOver = createSprite(200,300)
gameOver.addImage(gameOverImg)
gameOver.scale = 0.2
gameOver.visible = false

restart = createSprite(200,370)
restart.addImage(restartImg)
restart.scale = 0.2
restart.visible = false

climbersGroup = new Group();
coinsGroup = new Group();
invisilbeclimbersGroup = new Group();
o1Group = new Group();
o2Group = new Group()
o3Group = new Group()
o4Group = new Group();

}

function draw(){
background(0);
if (gameState==="level1"||gameState === "level2"||gameState === "level3"||gameState === "level4"){
    
    girl.changeAnimation("standing", girlstanding)
    tower.velocityY = 1;
    if(tower.y>400 ){
        tower.y = tower.height/2
        
    }
    if(o1Group.isTouching(girl) ||o2Group.isTouching(girl)||o3Group.isTouching(girl)||o4Group.isTouching(girl)){
        gameOverSound.play();
        gameState="end"
    }
    if(coinsGroup.isTouching(girl)){
        score=score+1;
    }
    if(keyDown ("space") && girl.y >=100){
        girl.velocityY=-12 ;
        girl.changeAnimation("jumping", girljumping)
        jumpSound.play();
    }
    girl.velocityY=girl.velocityY + 0.8 ;
    if(keyDown("LEFT_ARROW")){
        girl.x=girl.x-5
    }
    if(keyDown("RIGHT_ARROW")){
        girl.x=girl.x+5;
    }
    r = Math.round(random(1,2))
    if(r===1){
        Spawnclimber();
    
    }
    else{
        Spawnclimber2();
    }
    
    SpawnObstacles1();
    SpawnObstacles2();
    SpawnObstacles3();
    SpawnObstacles4();
    if(score>100&&score<=200){
        gameState= "level2"
        levelChangeSound.play();
    }
    else if(score>200&&score<=300){
        gameState= "level3"
        levelChangeSound.play();
    }
    else if(score>300&&score<=400){
        gameState= "level4"
        levelChangeSound.play();
    }
    else if(score>400){
        gameOverSound.play();
        gameState = "end"
    }
}
else if(gameState==="end"){
reset();
}


girl.collide(invisilbeclimbersGroup);
drawSprites();
textSize (25);
fill ("yellow");
text("score:"+score,300,50)
}
function Spawnclimber(){
    if (frameCount%600===0){
        var climber = createSprite (0,0,10,20)
        var invisilbeclimber = createSprite (0,-10,10,20)
        climber.x=70
        invisilbeclimber.velocityY=1 ;
        invisilbeclimber.x=climber.x
        invisilbeclimber.lifetime=600
        invisilbeclimber.visible = false
        climber.velocityY=1 ;
        climber.lifetime=600
        climber.addImage(climberImage);
        climber.depth= girl.depth;
        girl.depth = girl.depth+1;
        var coin = createSprite (0,-60,10,20)
        coin.addImage(coinImage);
        coin.scale = 0.5;
        coin.velocityY=1;
        coin.x=climber.x+20;
        coin.lifetime=600

        coinsGroup.add(coin)
        invisilbeclimbersGroup.add(invisilbeclimber)
        climbersGroup.add(climber)
    
    }
}

function SpawnObstacles1(){
    if(gameState === "level1" && frameCount% 200 ===0){
        var obstacles = createSprite (0,0,10,30) ;
        obstacles.debug=true ;
        obstacles.x= Math.round(random(90,300));
        obstacles.addImage(o1Img);
        obstacles.scale = 0.1
        obstacles.velocityY=1;
        obstacles.lifetime = 600;
        o1Group.add(obstacles)
    }
    
    
}

function SpawnObstacles2(){
    if(gameState === "level2" && frameCount% 200 ===0){
        var obstacles2 = createSprite (0,0,10,30) ;
        obstacles2.x= Math.round(random(90,300));
        obstacles2.addImage(o2Img);
        obstacles2.scale = 0.1
        obstacles2.velocityY=1;
        obstacles2.lifetime = 600;
        o2Group.add(obstacles2)
    }
    
    
    

}

function SpawnObstacles3(){
    if(gameState === "level3" && frameCount% 200 ===0){
        var obstacles3 = createSprite (0,0,10,30) ;
        obstacles3.x= Math.round(random(90,300));
        obstacles3.addImage(o3Img);
        obstacles3.scale = 0.1
        obstacles3.velocityY=1;
        obstacles3.lifetime = 600;
        o3Group.add(obstacles3)
    }
   
    
    
}

function SpawnObstacles4(){
    if(gameState === "level4" && frameCount% 200 ===0){
        var obstacles4 = createSprite (0,0,10,30) ;
        obstacles4.x= Math.round(random(90,300));
        obstacles4.addImage(o4Img);
        obstacles4.scale = 0.1
        obstacles4.velocityY=1;
        obstacles4.lifetime = 600;
        o4Group.add(obstacles4)
    }
    
    
    
}

function Spawnclimber2(){
    if (frameCount%600===0){
        var climber = createSprite (0,0,10,20)
        var invisilbeclimber = createSprite (0,-10,10,20)
        climber.x=330
        invisilbeclimber.velocityY=1 ;
        invisilbeclimber.x=climber.x
        invisilbeclimber.lifetime=600
        invisilbeclimber.visible = false
        climber.velocityY=1 ;
        climber.lifetime=600
        climber.addImage(climberImage);
        climber.depth= girl.depth;
        girl.depth = girl.depth+1;
        var coin = createSprite (0,-60,10,20)
        coin.addImage(coinImage);
        coin.scale = 0.5;
        coin.velocityY=1;
        coin.x=climber.x+20;
        coin.lifetime=600

        coinsGroup.add(coin)
        invisilbeclimbersGroup.add(invisilbeclimber)
        climbersGroup.add(climber)
    
    }
}


function reset(){
    gameState = PLAY;
    gameOver.visible = false;
    restart.visible = false;
    
    obstaclesGroup.destroyEach();
    
    
    
    if(localStorage[0]<score){
      localStorage[0] = score;
    }
    console.log(localStorage[0]);
    
    score = 0;
    
  }