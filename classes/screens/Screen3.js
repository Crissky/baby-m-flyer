import { isCollision, isFloorCollision } from "../../utils/Collision.js";
import { Sound } from "../../utils/Sound.js";
import { GreenM } from "../chars/GreenM.js";
import { MessageGetReady } from "../MessageGetReady.js";
import { MessageGameOver } from "../MessageGameOver.js";
import { Floor1 } from "../scenarios/Floors.js";
import { Bill } from "../enemies/Bill.js";
import { InnerWall } from "../scenarios/InnerWall.js";
import { Score3 } from "../hud/Score3.js";
import { CastleFloorHandler } from "../handler/CastleFloorHandler.js";
import { Background4 } from "../scenarios/Backgrounds.js";
import { BabyP } from "../chars/babyP.js";

// VARIABLES
const sprites = new Image();
sprites.src = './sprites/sprites.png';

//[Music]
const musicPath = ["https://vgmdownloads.com/soundtracks/super-mario-galaxy-2/vvkhxkzc/1-05%20Sky%20Station%20Galaxy.mp3",
  "https://vgmdownloads.com/soundtracks/super-mario-galaxy-2/adswpizf/1-09%20Starship%20Mario%2C%20Launch%21.mp3",
  "https://vgmdownloads.com/soundtracks/super-mario-galaxy-2/kbizspaq/1-11%20Yoshi%20Star%20Galaxy.mp3",
  "https://vgmdownloads.com/soundtracks/super-mario-galaxy-2/vjoxpmda/1-14%20The%20Starship%20Sails.mp3",
  "https://vgmdownloads.com/soundtracks/super-mario-galaxy-2/tipltkjj/1-15%20Spin-Dig%20Galaxy.mp3",
  "https://vgmdownloads.com/soundtracks/super-mario-galaxy-2/vwkluwrh/1-18%20Puzzle%20Plank%20Galaxy.mp3",
  "https://vgmdownloads.com/soundtracks/super-mario-galaxy-2/pzywfsmk/1-21%20Wild%20Glide%20Galaxy.mp3",
  "https://vgmdownloads.com/soundtracks/super-mario-galaxy-2/aihnzipo/1-24%20Hightail%20Falls%20Galaxy.mp3",
  "https://vgmdownloads.com/soundtracks/super-mario-galaxy-2/nqyknqbh/1-27%20Slide.mp3",
  "https://vgmdownloads.com/soundtracks/super-mario-galaxy-2/zqsthneg/1-28%20Freezy%20Flake%20Galaxy.mp3",
  "https://vgmdownloads.com/soundtracks/super-mario-galaxy-2/ptvtbshe/1-31%20Cloudy%20Court%20Galaxy.mp3",
  "https://vgmdownloads.com/soundtracks/super-mario-galaxy-2/waukgbpv/2-01%20Starshine%20Beach%20Galaxy.mp3",
  "https://vgmdownloads.com/soundtracks/super-mario-galaxy-2/vqggprpl/2-08%20Rightside%20Down%20Galaxy.mp3",
  "https://vgmdownloads.com/soundtracks/super-mario-galaxy-2/zqgefyam/2-16%20Throwback%20Galaxy.mp3",
  "https://vgmdownloads.com/soundtracks/super-mario-galaxy-2/ojvqofrs/2-29%20Super%20Mario%20Galaxy%202.mp3",
  "https://vgmdownloads.com/soundtracks/super-mario-galaxy-2/tzhhamdk/2-32%20Theme%20of%20SMG2.mp3",
  "https://vgmdownloads.com/soundtracks/super-mario-odyssey-ost/cptrlfzv/1-02%20Opening%20%28In%20the%20Skies%20Above%20Peach%27s%20Castle%E2%80%A6%29.mp3"];

export class Screen3 {
  constructor(canvas, context, debug = false) {
    this.music = new Sound(musicPath[Math.floor(Math.random() * musicPath.length)], true);
    this.background = new Background4(canvas, 5);
    this.floor = new CastleFloorHandler(canvas, debug);
    this.char = new BabyP(canvas, debug);
    this.enemy = new Bill(canvas, debug);
    this.score = new Score3(canvas);
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

  update() { 
    this.classFather.floor.update(this.speed);
    
  }

  render() {
    this.classFather.background.render();
    this.classFather.floor.render();
    this.classFather.char.render();
    this.classFather.enemy.render();
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
    this.classFather.enemy.update(this.speed);
    this.classFather.floor.update(this.speed);
    this.classFather.char.update(this.speed);
    this.iscollided();
    
  }

  render() {
    this.classFather.background.render();
    this.classFather.char.render();
    this.classFather.enemy.render();
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

    if (this.classFather.char.isFall() && isFloorCollision(this.classFather.char, this.classFather.floor)) {
      this.classFather.char.setRun(this.classFather.floor.posY);
      console.log("Collision - Collided with the ground");
      // this.stopGame();
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

  update() {}

  render() {
    this.classFather.background.render();
    this.classFather.char.render();
    this.classFather.enemy.render();
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
    this.classFather.enemy.reset();
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

  click() {}

  render() {}

  update() {}
}