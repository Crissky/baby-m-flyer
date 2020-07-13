import { isCollision, isFloorCollision } from "../../utils/Collision.js";
import { Sound } from "../../utils/Sound.js";
import { MessageGetReady } from "../MessageGetReady.js";
import { MessageGameOver } from "../MessageGameOver.js";
import { Bill } from "../enemies/Bill.js";
import { Score3 } from "../hud/Score3.js";
import { CastleFloorHandler } from "../handler/CastleFloorHandler.js";
import { Background4 } from "../scenarios/Backgrounds.js";
import { BabyP } from "../chars/babyP.js";
import { CastleRoofHandler } from "../handler/CastleRoofHandler.js";
import { WoodenLegShyguy } from "../enemies/WoodenLegShyguy.js";
import { FlyShyguy } from "../enemies/FlyShyguy.js";
import { MuftiShyguy } from "../enemies/MuftiShyguy.js";
import { JumpGuy } from "../enemies/JumpGuy.js";
import { FireBall } from "../enemies/FireBall.js";
import { Spike } from "../enemies/Spike.js";
import { StartPlatform, MidPlatform, EndPlatform } from "../scenarios/Platform.js";
import { PlatformHandler } from "../handler/PlatformHandler.js";
import { Screen3Handler } from "../handler/Screen3Handler.js";

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
    this.canvas = canvas;
    this.music = new Sound(musicPath[Math.floor(Math.random() * musicPath.length)], true);
    this.background = new Background4(canvas, 5);
    this.floor = new CastleFloorHandler(canvas, debug);
    this.roof = new CastleRoofHandler(canvas);
    this.char = new BabyP(canvas, debug);
    this.enemy = new Screen3Handler(canvas, this.floor, debug);
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
    this.classFather.roof.update(this.speed);
  }

  render() {
    this.classFather.background.render();
    this.classFather.floor.render();
    this.classFather.roof.render();
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
    this.impactSound = new Sound("./sounds/SFX_Impact.wav");
    this.classFather = father;
    this.clearFase = false;
    this.currentTimeScore = 0;
    this.waitTimeScore = 5;
    this.reset();
    
  }

  update() {
    this.classFather.background.update(this.speed);
    this.classFather.enemy.update(this.speed);
    this.classFather.floor.update(this.speed);
    this.classFather.roof.update(this.speed);
    this.classFather.char.update(this.speed);

    this.iscollided();
    this.landingFloorOrPlatform();

    this.currentTimeScore = ++this.currentTimeScore % this.waitTimeScore;
    if (this.currentTimeScore === 0) {
      this.classFather.score.addScore(1);
      if (this.classFather.score.getScore() % 100 === 0) {
        this.speed += 0.25;
        this.classFather.enemy.updateRateSpawn(this.classFather.score.getLevel());
        this.classFather.score.addLevel(1);
      }
    }
  }

  render() {
    this.classFather.background.render();
    this.classFather.char.render();
    this.classFather.enemy.render();
    this.classFather.floor.render();
    this.classFather.roof.render();
    this.classFather.score.render();
  }

  click() {
    if (!this.stoped && !this.clearFase) {
      this.classFather.char.click(this.speed);
    }
  }

  reset() {
    this.speed = 3;
    this.stoped = false;
    this.clearFase = false;
    if(this.classFather.canvas.width < this.classFather.canvas.height) {
      this.speed = this.speed / 2;
    }
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

    this.classFather.enemy.platformHandler.spikeList.forEach(spike => {
      if (isCollision(this.classFather.char, spike)) {
        console.log("Collision - Collided with the spike");
        this.stopGame();
      }
    });

    this.classFather.enemy.enemyList.forEach(enemy => {
      if (enemy instanceof JumpGuy) {
        this.actionJumpGuy(enemy);
      } else if (enemy instanceof MuftiShyguy) {
        this.actionMuftiShyguy(enemy);
      }

      if (isCollision(this.classFather.char, enemy)) {
        console.log("Collision - Collided with the enemy");
        this.stopGame();
      }
    });
  }

  landingFloorOrPlatform() {
    if (this.clearFase) {
      return;
    }

    if (this.classFather.char.isFall() && isFloorCollision(this.classFather.char, this.classFather.floor)) {
      this.classFather.char.setRun(this.classFather.floor.posY);
      console.log("Collision - Collided with the ground");
      return;
    }

    let isPlatform = false;
    let platformPosY;
    for (let index = 0; index < this.classFather.enemy.platformHandler.platformList.length; index++) {
      const platform = this.classFather.enemy.platformHandler.platformList[index];
      if (this.classFather.char.isJump()) {
        break;
      }
      if (isFloorCollision(this.classFather.char, platform)) {
        isPlatform = true;
        platformPosY = platform.posY;
        break;
      }
    }

    if (this.classFather.char.isFall() && isPlatform) {
      this.classFather.char.setRun(platformPosY);
    }

    if (this.classFather.char.isRun() && !isFloorCollision(this.classFather.char, this.classFather.floor) && !isPlatform) {
      this.classFather.char.setFall();
    }
  }

  actionJumpGuy(jumpGuy) {
    if (jumpGuy.isRun() && jumpGuy.posX - this.classFather.char.posX < (40 * this.speed)) {
      jumpGuy.setJump();
    }

    if (jumpGuy.isFall() && jumpGuy.getEndPosY() > this.classFather.floor.posY) {
      jumpGuy.setSit();
      jumpGuy.setEndPosY(this.classFather.floor.posY);
    }
  }

  actionMuftiShyguy(muftiShyguy) {
    if (muftiShyguy.hide && muftiShyguy.posX - this.classFather.char.posX < (40 * this.speed)) {
      muftiShyguy.show();
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
    this.classFather.enemy.render();
    this.classFather.floor.render();
    this.classFather.roof.render();
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

  click() { }

  render() { }

  update() { }
}