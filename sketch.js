var PLAY = 1;
var END = 0;
var gameState = PLAY;

var player, player_running, bananaImg, banana, bg, backImage, ground, groundimg, obstacleImg, obstacle, obstacleGroup, Score, bananaGroup;

var gameOver, restart, gameoverImg, restartImg;

function preload() {
  backImage = loadImage("jungle.jpg");

  player_running = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");

  bananaImg = loadImage("Banana.png");
  obstacleImg = loadImage("stone.png");
  groundimg = loadImage("ground.jpg");

  gameoverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");

}


function setup() {
  createCanvas(600, 300);

  bg = createSprite(300, 0, 30, 40);
  bg.addImage(backImage);
  bg.velocityX = -8;

  ground = createSprite(400, 250, 800, 10);
  ground.velocityX = -4;
  ground.visible = false;


  player = createSprite(50, 200, 30, 40);
  player.addAnimation("player_running", "Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png")
  player.scale = 0.1;



  Score = 0;

  bananaGroup = createGroup();
  obstacleGroup = createGroup();

  gameOver = createSprite(300, 100, 20, 40);
  gameOver.addImage(gameoverImg);


  restart = createSprite(300, 150, 20, 20);
  restart.addImage(restartImg);

}


function draw() {
  background(255);

  ground.x = ground.width / 2
  player.collide(ground);

  if (bg.x < 300) {
    bg.x = bg.width / 2;
  }

  if (gameState === PLAY) {

    if (keyDown("space") && player.y > 130) {
      player.velocityY = -4;
    }

    player.velocityY = player.velocityY + 0.8;

    if (player.isTouching(bananaGroup)) {
      Score = Score + 2;
      bananaGroup.destroyEach();
    }

    if (player.isTouching(obstacleGroup)) {
      player.scale = 0.07;
      obstacleGroup.destroyEach();
      gameState = END;
    }

    switch (Score) {

      case 10:
        player.scale = 0.12
        break;
      case 20:
        player.scale = 0.14
        break;
      case 30:
        player.scale = 0.16
        break;
      case 40:
        player.scale = 0.18
        break;
      default:
        break;

    }


    spawnObstacle();
    spawnBanana();

    gameOver.visible = false;
    restart.visible = false;
  } else if (gameState === END) {
    player.visible = false;
    bg.velocityX = 0;
    gameOver.visible = true;
    restart.visible = true;
    bananaGroup.setvelocityX = 0;
    obstacleGroup.setVelocityX = 0;
    //gameState=PLAY;

  }

  if (mousePressedOver(restart)) {
    Restart();
    gameState = PLAY;
  }

  drawSprites();

  fill("red");
  text(Score, 540, 20);
  text("Score:", 500, 20);
}

function spawnObstacle() {
  if (World.frameCount % 170 === 0) {
    obstacle = createSprite(300, 220, 10, 30);
    obstacle.addImage(obstacleImg);
    obstacle.scale = 0.1;
    obstacle.velocityX = -3;
    obstacle.lifetime = 150;

    obstacleGroup.add(obstacle);
  }
}

function spawnBanana() {

  if (World.frameCount % 70 === 0) {
    banana = createSprite(300, 150, 40, 30);
    banana.addImage(bananaImg);
    banana.scale = 0.04;
    banana.velocityX = -3;
    banana.y = random(100, 200);
    banana.lifetime = 150;

    bananaGroup.add(banana);
  }
}

function Restart() {
  restart.visible = false;
  gameOver.visible = false;
  obstacleGroup.setvelocityX = -3;
  bananaGroup.setvelocityX = -3;
  gameState = PLAY;
  bg.velocityX = -8;

  Score = 0;

  player.visible = true;

  player.scale = 0.1;

}
