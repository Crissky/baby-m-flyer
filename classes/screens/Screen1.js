import { isCollision } from "../../utils/Collision.js";
import { Sound } from "../../utils/Sound.js";
import { GreenM } from "../chars/GreenM.js";
import { DoublePipeHandler } from "../handler/DoublePipeHandler.js";
import { MessageGetReady } from "../MessageGetReady.js";
import { MessageGameOver } from "../MessageGameOver.js";
import { Background1 } from "../scenarios/Backgrounds.js";
import { Floor1 } from "../scenarios/Floors.js";
import { Score1 } from "../hud/Score1.js";

// VARIABLES
const sprites = new Image();
sprites.src = './sprites/sprites.png';

//[Music]
// https://downloads.khinsider.com/game-soundtracks/album/super-mario-galaxy-ost-super-mario-35th-anniversary-release
// https://downloads.khinsider.com/game-soundtracks/album/super-mario-galaxy-2
// https://downloads.khinsider.com/game-soundtracks/album/super-mario-odyssey-original-soundtrack
const musicPath = [
  "https://lambda.vgmtreasurechest.com/soundtracks/super-mario-galaxy-ost-super-mario-35th-anniversary-release/qhpeanqo/1-17.%20Gusty%20Garden%20Galaxy.mp3",
  "https://lambda.vgmtreasurechest.com/soundtracks/super-mario-galaxy-ost-super-mario-35th-anniversary-release/skwehywl/1-28.%20Super%20Mario%202007.mp3",
  "https://lambda.vgmtreasurechest.com/soundtracks/super-mario-galaxy-ost-super-mario-35th-anniversary-release/gfgrpxuh/2-50.%20Flying%20Mario.mp3",

  "https://lambda.vgmtreasurechest.com/soundtracks/super-mario-galaxy-2/tjoqpcti/1-05.%20Sky%20Station%20Galaxy.mp3",
  "https://lambda.vgmtreasurechest.com/soundtracks/super-mario-galaxy-2/jgamievp/1-11.%20Yoshi%20Star%20Galaxy.mp3",
  "https://lambda.vgmtreasurechest.com/soundtracks/super-mario-galaxy-2/phtyjcii/1-14.%20The%20Starship%20Travels.mp3",
  "https://lambda.vgmtreasurechest.com/soundtracks/super-mario-galaxy-2/jwhvicpp/1-21.%20Wild%20Glide%20Galaxy.mp3",
  "https://lambda.vgmtreasurechest.com/soundtracks/super-mario-galaxy-2/kzttmfod/1-24.%20Hightail%20Falls%20Galaxy.mp3",
  "https://lambda.vgmtreasurechest.com/soundtracks/super-mario-galaxy-2/gefnwxvk/1-28.%20Freezy%20Flake%20Galaxy.mp3",
  "https://lambda.vgmtreasurechest.com/soundtracks/super-mario-galaxy-2/zggocsin/1-31.%20Cloudy%20Court%20Galaxy.mp3",
  "https://lambda.vgmtreasurechest.com/soundtracks/super-mario-galaxy-2/ggnxwsxl/2-16.%20Throwback%20Galaxy.mp3",
  "https://lambda.vgmtreasurechest.com/soundtracks/super-mario-galaxy-2/tihlksgg/2-29.%20Super%20Mario%20Galaxy%202.mp3",
  "https://lambda.vgmtreasurechest.com/soundtracks/super-mario-galaxy-2/vdfruxee/2-31.%20Green%20Star.mp3",
  "https://lambda.vgmtreasurechest.com/soundtracks/super-mario-galaxy-2/kjqblauw/2-32.%20Theme%20of%20SMG2.mp3",

  "https://lambda.vgmtreasurechest.com/soundtracks/super-mario-odyssey-original-soundtrack/dksinpjd/1-09.%20Fossil%20Falls.mp3",
  "https://lambda.vgmtreasurechest.com/soundtracks/super-mario-odyssey-original-soundtrack/lxctnkjq/2-09.%20The%20Band%27s%20All%20Here%20-%20Super%20Mario%20Bros.%20Ground%20BGM.mp3",
  "https://lambda.vgmtreasurechest.com/soundtracks/super-mario-odyssey-original-soundtrack/omtgaldi/3-12.%20The%20Super%20Mario%20Odyssey%20Crew.mp3",
  "https://lambda.vgmtreasurechest.com/soundtracks/super-mario-odyssey-original-soundtrack/anpkfult/3-30.%20Jump%20Up%2C%20Super%20Star%21%20-%20Japanese%20Ver.%20-%20Instrumental.mp3",
  "https://lambda.vgmtreasurechest.com/soundtracks/super-mario-odyssey-original-soundtrack/xcuolnfo/4-01.%20Fossil%20Falls%20-%208-Bit.mp3"
];

export class Screen1 {
  constructor(canvas, context, isMobile, debug = false) {
    this.music = new Sound(musicPath[Math.floor(Math.random() * musicPath.length)], true, isMobile);
    this.background = new Background1(canvas);
    //this.floor = new Floor(context, sprites, canvas, debug);
    this.floor = new Floor1(canvas, 1, debug);
    this.char = new GreenM(canvas, debug);
    this.pipesHandler = new DoublePipeHandler(context, sprites, canvas, this.floor, this.char, 500, debug);
    this.score = new Score1(canvas);
    this.messageGetReady = new MessageGetReady(context, sprites, canvas);
    this.messageGameOver = new MessageGameOver(context, sprites, canvas);
    this.startScreen = new Start(this);
    this.gameScreen = new Game(this);
    this.gameoverScreen = new Gameover(this);
    this.activeScreen = this.startScreen;
    this.startGameTime = 0;
    this.endGameTime = 0;
  }

  update() {
    this.activeScreen.update();
  }

  render() {
    this.activeScreen.render();
  }

  click() {
    this.activeScreen.click();
  }

  activateStartScreen() {
    this.activateScreen(this.startScreen);
  }
  activateGameScreen() {
    this.startGameTime = new Date().getTime();
    this.activateScreen(this.gameScreen);
  }

  activateGameoverScreen() {
    this.endGameTime = new Date().getTime();
    console.log("GAMEPLAY DURATION", (this.endGameTime - this.startGameTime) / 1000, "seconds");
    this.activateScreen(this.gameoverScreen);
  }

  activateScreen(newScreen) {
    this.activeScreen = newScreen;
  }
}

class Start {
  constructor(father) {
    this.speed = 0;
    this.startSound = new Sound("./sounds/smw2_flower_get.wav");
    this.classFather = father;
  }

  update() { }

  render() {
    this.classFather.background.render();
    this.classFather.floor.render();
    this.classFather.char.render();
    this.classFather.messageGetReady.render();
  }

  click() {
    this.startSound.play();
    this.classFather.music.play();
    this.classFather.activateGameScreen();
  }

}

class Game {
  constructor(father) {
    this.speed = 2;
    this.stoped = false;
    this.reset();
    this.impactSound = new Sound("./sounds/SFX_Impact.wav");
    this.topImpactSound = new Sound("./sounds/SFX_Top_Impact.wav");
    this.classFather = father;
    this.clearFase = false;
  }

  update() {
    this.classFather.background.update(this.speed);
    this.classFather.pipesHandler.update(this.speed);
    this.classFather.floor.update(this.speed);
    this.classFather.char.update(this.speed);
    this.iscollided();

    if (this.classFather.pipesHandler.pipeUPList.length < 1) { // FINISH STAGE
      this.clearFase = true;
      if (this.classFather.char.getEndPosY() + 100 > this.classFather.floor.posY && this.classFather.char.speedY > 0) {
        this.classFather.char.speedY = 0;
      }
      this.classFather.char.speedX = this.speed * 2;
      this.classFather.char.gravity = -(this.speed * 0.1);
      return;
    }

    if (this.classFather.pipesHandler.pipeUPList[0].getEndPosX() < 0) {
      this.classFather.pipesHandler.removeFirstPipe();
      this.classFather.score.addScore(1);
      this.classFather.background.darkenGradient(-3);
      if (this.classFather.score.getScore() % 5 === 0) {
        this.speed += 0.5;
        this.classFather.score.addLevel(1, this.classFather.music);
      }
    }
  }

  render() {
    this.classFather.background.render();
    this.classFather.char.render();
    this.classFather.pipesHandler.render();
    this.classFather.floor.render();
    this.classFather.score.render();
  }

  click() {
    if (!this.stoped && !this.clearFase) {
      this.classFather.char.click(this.speed);
    }
  }

  reset() {
    this.speed = 2;
    this.stoped = false;
    this.clearFase = false;
  }

  stopGame() {
    this.impactSound.play();
    this.classFather.music.stop();
    console.log("Speed:", this.speed);
    this.speed = 0;
    this.classFather.char.stop();
    this.stoped = true;

    this.classFather.score.print();

    console.log("PipeUP posX", this.classFather.pipesHandler.pipeUPList[0].posX, "PipeDOWN posX", this.classFather.pipesHandler.pipeDOWNList[0].posX);
    console.log("PipeUP posY", this.classFather.pipesHandler.pipeUPList[0].posY, "pipeDOWN posY", this.classFather.pipesHandler.pipeDOWNList[0].posY);
    console.log("Pipe Total:", this.classFather.pipesHandler.pipeTotalSpawned);
    this.classFather.activateGameoverScreen();
  }

  iscollided() {
    if (this.clearFase) {
      return;
    }
    if (this.classFather.char.posY < 0) {
      this.classFather.char.posY = 0;
      if (this.classFather.char.speedY < 0) {
        this.classFather.char.speedY = 0;
      }
      this.topImpactSound.play();
      console.log("Collision - Collided with the top");
    }

    if (isCollision(this.classFather.char, this.classFather.floor)) {
      this.classFather.char.posY = (this.classFather.floor.posY - this.classFather.char.collisionHeight[this.classFather.char.currentFrame]);
      console.log("Collision - Collided with the ground");
      this.stopGame();
    } else if (this.classFather.pipesHandler.pipeUPList.length < 1) {
      return;
    } else if (isCollision(this.classFather.char, this.classFather.pipesHandler.pipeUPList[0])) {
      console.log("Collision - Collided with the upper pipe");
      this.stopGame();
    } else if (isCollision(this.classFather.char, this.classFather.pipesHandler.pipeDOWNList[0])) {
      console.log("Collision - Collided with the bottom pipe");
      this.stopGame();
    }
  }
}


class Gameover {
  constructor(father) {
    this.speed = 0;
    this.sleepTime = 30;
    this.startSound = new Sound("./sounds/smw2_flower_get.wav");
    this.classFather = father;
  }

  update() { }

  render() {
    this.classFather.background.render();
    this.classFather.char.render();
    this.classFather.pipesHandler.render();
    this.classFather.floor.render();
    this.classFather.messageGameOver.render();
    this.classFather.score.render();
    this.sleepTime -= 1;
  }

  click() {
    if (this.sleepTime > 0) {
      return;
    }
    this.classFather.char.reset();
    this.classFather.background.reset();
    this.classFather.pipesHandler.reset();
    this.classFather.score.reset();
    this.classFather.gameScreen.reset();

    this.startSound.play();
    this.classFather.music.resetSpeed();
    this.classFather.music.play();
    this.sleepTime = 30;
    this.classFather.activateGameScreen();
  }


}

class Win {
  constructor(father) {
    this.winSonund;
    this.classFather = father;
    this.sleepTime = 100;
  }

  click() {

  }

  render() {

  }

  update() {

  }
}