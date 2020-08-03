import { isCollision, isFloorCollision } from "../../utils/Collision.js";
import { Sound } from "../../utils/Sound.js";
import { MessageGetReady } from "../MessageGetReady.js";
import { MessageGameOver } from "../MessageGameOver.js";
import { Score3 } from "../hud/Score3.js";
import { CastleFloorHandler } from "../handler/CastleFloorHandler.js";
import { Background4 } from "../scenarios/Backgrounds.js";
import { BabyP } from "../chars/BabyP.js";
import { CastleRoofHandler } from "../handler/CastleRoofHandler.js";
import { MuftiShyguy } from "../enemies/MuftiShyguy.js";
import { JumpGuy } from "../enemies/JumpGuy.js";
import { Screen3Handler } from "../handler/Screen3Handler.js";

// VARIABLES
const sprites = new Image();
sprites.src = './sprites/sprites.png';

//[Music]
const musicPath = ["https://vgmdownloads.com/soundtracks/super-mario-galaxy-2/vqggprpl/2-08%20Rightside%20Down%20Galaxy.mp3",
  "https://vgmdownloads.com/soundtracks/super-mario-odyssey-ost/cptrlfzv/1-02%20Opening%20%28In%20the%20Skies%20Above%20Peach%27s%20Castle%E2%80%A6%29.mp3",
  "https://vgmdownloads.com/soundtracks/super-mario-galaxy/xxfgjdka/2-14%20Airship%20Armada.mp3",
  "https://vgmdownloads.com/soundtracks/super-mario-galaxy/bndyddfz/1-06%20Enter%20the%20Galaxy.mp3",
  "https://vgmdownloads.com/soundtracks/super-mario-galaxy/xezzxkpg/1-07%20Egg%20Planet.mp3",
  "https://vgmdownloads.com/soundtracks/super-mario-galaxy/ufxvbjnp/1-11%20Battlerock%20Galaxy.mp3",
  "https://vgmdownloads.com/soundtracks/super-mario-galaxy/psvbcixu/1-14%20Enter%20Bowser%20Jr.%21.mp3",
  "https://vgmdownloads.com/soundtracks/super-mario-galaxy/hrgkmufk/1-16%20Buoy%20Base%20Galaxy.mp3",
  "https://vgmdownloads.com/soundtracks/super-mario-galaxy/ijcfakri/1-19%20King%20Bowser.mp3",
  "https://vgmdownloads.com/soundtracks/super-mario-galaxy/wjhaxpdd/1-21%20The%20Galaxy%20Reactor.mp3",
  "https://vgmdownloads.com/soundtracks/super-mario-galaxy/vuhzysbm/1-22%20Final%20Battle%20with%20Bowser.mp3",
  "https://vgmdownloads.com/soundtracks/super-mario-galaxy/pzwxquar/2-20%20Speedy%20Comet.mp3",
  "https://vgmdownloads.com/soundtracks/super-mario-galaxy/bpdqvluk/2-37%20Kingfin.mp3",
  "https://vgmdownloads.com/soundtracks/super-mario-galaxy-2/nfqhvfym/1-37%20Glamdozer.mp3",
  "https://vgmdownloads.com/soundtracks/super-mario-galaxy-2/awbwwvtb/2-04%20Bowser%27s%20Lava%20Lair.mp3",
  "https://vgmdownloads.com/soundtracks/super-mario-galaxy-2/sxejkgfh/2-15%20Melty%20Monster%20Galaxy.mp3",
  "https://vgmdownloads.com/soundtracks/super-mario-galaxy-2/nefhukec/2-22%20Speed%20Run.mp3",
  "https://vgmdownloads.com/soundtracks/super-mario-galaxy-2/igrlsfqt/2-27%20Fated%20Battle.mp3",
  "https://vgmdownloads.com/soundtracks/super-mario-odyssey-original-soundtrack/fkzifsuemq/1-11%20Capturing%20Tyrannosaurus%21.mp3",
  "https://vgmdownloads.com/soundtracks/super-mario-odyssey-original-soundtrack/rmsytxvcfn/3-04%20Underground%20Moon%20Caverns.mp3"];

export class Screen3 {
  constructor(canvas, context, isMobile, debug = false) {
    this.canvas = canvas;
    this.music = new Sound(musicPath[Math.floor(Math.random() * musicPath.length)], true, isMobile);
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
        this.classFather.score.addLevel(1, this.classFather.music);
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
    if (this.classFather.canvas.width < this.classFather.canvas.height) {
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