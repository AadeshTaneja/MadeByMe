
var PLAY = 0
var END = 1
var gamestate = PLAY
var bg;
var background,soldier,solider_img,ground,heart1,heart1img,enemy,enemy_img,bullet,enemyGroup,bulletGroup,solbullet,enbullet,solbullet_spr,jump,collided,gameOver;
var life
var die,gameOver,gameOverimg,score,fire

function preload(){

  bg = loadImage("bg.jpg")
  soldier_img = loadAnimation("img (1).png","img (2).png","img (3).png","img (4).png","img (5).png","img (6).png","img (7).png","img (8).png","img (9).png","img (10).png","img (11).png","img (12).png","img (13).png","img (14).png","img (15).png", "img (16).png","img (18).png","img (19).png", "img (21).png","img (22).png","img (23).png","img (24).png","img (25).png","img (26).png","img (27).png","img (28).png", "img (29).png","img (30).png")
  heart1img = loadImage("heart.png")
  enemy_img = loadImage("imge.png")
  enemy2 = loadImage("enemy.jpg")
  solbullet = loadImage("bullet1.png")
  enbullet = loadImage("bullet2.png")
  jump = loadSound("jump.mp3")
  die = loadSound("die.mp3")
  gameOverimg=loadImage("gameOver2.png");
  collided = loadAnimation("img (1).png")
  fire = loadSound("fire.mp3")

 
}

function setup() {
  createCanvas(1600,800)
  background= createSprite(800,400,1600,800)
  background.addImage("bg",bg)
  background.scale = 1.3
  background.x = background.width /2;
  background.velocityX = -4;
  soldier = createSprite(300,700,50,50)
  soldier.addAnimation("soldier_img",soldier_img)
  soldier.scale= 0.5
  ground = createSprite(800,770,1600,10)
  ground.visible = false;
  heart1 = createSprite(1200,100);
  heart1.addImage("pic",heart1img)
   enemyGroup = new Group();
  bulletGroup = new Group();
  solbullet1 = new Group();
  gameOver=createSprite(750,300,200,50)
  gameOver.addImage("over",gameOverimg)
  gameOver.scale=1.5
  gameOver.visible=false;
  life = 2
  score = 0
  
}

function draw() {
 

drawSprites();

if(gamestate===PLAY){
  
  textSize(24);
   fill("red")
   strokeWeight(2)
   stroke("red")
   text("Press SpaceBar to shoot",580,150);
   text("Press Enter to jump",600,100);
   text("Score: "+score,200,200)
   

   if(score%10 === 0 && score>0){
   
  }

 
    

  if (background.x < 0){
    background.x = background.width/2;
  }
  soldier.collide(ground)
if(keyDown ("enter")){
  soldier.velocityY = -12
  jump.play();
}


soldier.velocityY=soldier.velocityY+0.5
if(keyDown("space")){
spawnbull();
fire.play();
}
if(bulletGroup.isTouching(soldier)||enemyGroup.isTouching(soldier)){
life = 1
heart1.visible = false;
gamestate = END;
die.play();


}

spawnenemy();

if(solbullet1.isTouching(enemyGroup)){

  score = score+1
  solbullet1.destroyEach();
 
 enemyGroup.destroyEach();
 }  
}
if(solbullet1.isTouching(bulletGroup)){

  
  solbullet1.destroyEach();
 
 bulletGroup.destroyEach();
 }  
 else if(gamestate===END){

  gameOver.visible=true;
  
 
 background.velocityX=0
 soldier.velocityY=0
 enemyGroup.setVelocityXEach(0)
 bulletGroup.setVelocityXEach(0)
 solbullet1.setVelocityXEach(0)
 soldier.changeAnimation("collided",collided);
 enemyGroup.setLifetimeEach(0);
 bulletGroup.setLifetimeEach(0);
 solbullet1.setLifetimeEach(0);
 solbullet1.destroyEach();
 bulletGroup.destroyEach();
 enemyGroup.destroyEach();
 soldier.destroy();
 }

}


 

  



function spawnenemy(){

  if(World.frameCount % 200 === 0 && World.frameCount>0){
  rectMode(CENTER)
    enemy = createSprite(1600,700,50,50)
  enemy.velocityX=-6
  enemy.scale=0.5
  

    rectMode(CENTER)
    bullet = createSprite(1600,660,10,10);
    bullet.addImage("bull",enbullet);
    bullet.scale = 0.1;
    bullet.velocityX=-10
    bullet.lifetime=200
    bullet2 = createSprite(1600,660,10,10);
    bullet2.addImage("bull",enbullet)
    bullet2.scale = 0.1
    bullet2.velocityX=-9.5
    bullet2.lifetime=200
    bullet3 = createSprite(1600,660,10,10);
    bullet3.addImage("bull",enbullet)
    bullet3.scale = 0.1
    bullet3.velocityX=-9
    bullet3.lifetime=200
    bullet4 = createSprite(1600,660,10,10);
    bullet4.addImage("bull",enbullet)
    bullet4.scale = 0.1
    bullet4.velocityX=-8.5
    bullet4.lifetime=200
    bullet5 = createSprite(1600,660,10,10);
    bullet5.addImage("bull",enbullet)
    bullet5.scale =0.1
    bullet5.velocityX=-8
    bullet5.lifetime=200
    
  
  
   

  

  var rand = Math.round(random(1,2));
  switch(rand) {
  case 1: enemy.addImage("ene",enemy_img);
             enemy.y= 700;
             break;
  case 2: enemy.addImage("ene1",enemy2);
          enemy.y=670;
            break;
 
  default: break;
   }
  
  
   
   bullet2.setCollider("rectangle",0,0,40,40)
   bullet3.setCollider("rectangle",0,0,40,40)
   bullet4.setCollider("rectangle",0,0,40,40)
   bullet5.setCollider("rectangle",0,0,40,40)
  

   bullet.setCollider("rectangle",0,0,10,10)

   enemyGroup.add(enemy);
   bulletGroup.add(bullet);
   bulletGroup.add(bullet2);
   bulletGroup.add(bullet3)
   bulletGroup.add(bullet4)
   bulletGroup.add(bullet5)
 
  
}



}


function spawnbull(){

  rectMode(CENTER) 
  solbullet_spr = createSprite(300,665,50,50);
  solbullet_spr.velocityX=6;
  solbullet_spr.addImage("solbullet",solbullet);
  solbullet_spr.scale=0.07
  
  solbullet_spr.lifetime=100; 

  solbullet1.add(solbullet_spr); 
  

}
