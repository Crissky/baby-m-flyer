import { isCollision, isMagnetCollision } from "../../utils/Collision.js";
import { Sound } from "../../utils/Sound.js";
import { MessageGetReady } from "../MessageGetReady.js";
import { MessageGameOver } from "../MessageGameOver.js";
import { RedBlockHandler } from "../handler/RedBlockHandler.js";
import { Background2 } from "../scenarios/Backgrounds.js";
import { Lava1 } from "../scenarios/Lavas.js";
import { YellowM } from "../chars/YellowM.js";
import { RockBlock } from "../scenarios/RockBlock.js";
import { ThrowerHandler } from "../handler/ThrowerHandler.js";
import { BillHandler } from "../handler/BillHandler.js";
import { Score2 } from "../hud/Score2.js";

// VARIABLES
const sprites = new Image();
sprites.src = './sprites/sprites.png';

//[Music]
const musicPath = ["https://vgmdownloads.com/soundtracks/super-mario-galaxy-2/adswpizf/1-09%20Starship%20Mario%2C%20Launch%21.mp3",
  "https://vgmdownloads.com/soundtracks/super-mario-galaxy-2/tipltkjj/1-15%20Spin-Dig%20Galaxy.mp3",
  "https://vgmdownloads.com/soundtracks/super-mario-galaxy-2/vwkluwrh/1-18%20Puzzle%20Plank%20Galaxy.mp3",
  "https://vgmdownloads.com/soundtracks/super-mario-galaxy-2/nqyknqbh/1-27%20Slide.mp3",
  "https://vgmdownloads.com/soundtracks/super-mario-galaxy/zwpqednd/1-09%20The%20Honeyhive.mp3",
  "https://vgmdownloads.com/soundtracks/super-mario-galaxy/ktousmhz/1-26%20Purple%20Comet.mp3",
  "https://vgmdownloads.com/soundtracks/super-mario-galaxy/vzcbkbov/2-08%20Dino%20Piranha.mp3",
  "https://vgmdownloads.com/soundtracks/super-mario-galaxy/tocbkowl/2-11%20Big%20Bad%20Bugaboom.mp3",
  "https://vgmdownloads.com/soundtracks/super-mario-galaxy/vgazkpgn/2-31%20Chase%20the%20Bunnies%21.mp3",
  "https://vgmdownloads.com/soundtracks/super-mario-galaxy/plickucc/2-47%20Kamella.mp3",
  "https://vgmdownloads.com/soundtracks/super-mario-galaxy-2/ehicalyw/1-06%20Peewee%20Piranha.mp3",
  "https://vgmdownloads.com/soundtracks/super-mario-galaxy-2/flwjbrmi/1-16%20Digga-Leg.mp3",
  "https://vgmdownloads.com/soundtracks/super-mario-galaxy-2/eufgvyjl/1-29%20Pipe%20Room.mp3",
  "https://vgmdownloads.com/soundtracks/super-mario-galaxy-2/jzhseayk/1-32%20Megahammer.mp3",
  "https://vgmdownloads.com/soundtracks/super-mario-galaxy-2/ktxwlrzr/1-35%20Honeybloom%20Galaxy.mp3",
  "https://vgmdownloads.com/soundtracks/super-mario-galaxy-2/wvkyoqds/2-12%20Bowser%20Jr.%27s%20Fiery%20Flotilla.mp3",
  "https://vgmdownloads.com/soundtracks/super-mario-galaxy-2/staxsgyh/2-18%20Fleet%20Glide%20Galaxy.mp3",
  "https://vgmdownloads.com/soundtracks/super-mario-galaxy-2/ufybnwet/2-25%20Bowser%27s%20Galaxy%20Generator.mp3",
  "https://vgmdownloads.com/soundtracks/super-mario-odyssey-original-soundtrack/oabtcnbzjw/1-15%20Tostarena%20Ruins.mp3",
  "https://vgmdownloads.com/soundtracks/super-mario-odyssey-original-soundtrack/ddzjsakomm/1-18%20Riding%20the%20Jaxi.mp3",
  "https://vgmdownloads.com/soundtracks/super-mario-odyssey-original-soundtrack/zhdbslwrzc/2-17%20Bound%20Bowl%20GP.mp3"];

export class Screen2 {
  constructor(canvas, context, isMobile, debug = false) {
    this.canvas = canvas;
    this.music = new Sound(musicPath[Math.floor(Math.random() * musicPath.length)], true, isMobile);
    this.background = new Background2(canvas);
    this.floor = new Lava1(canvas, 1, debug);
    this.char = new YellowM(canvas, debug);
    this.score = new Score2(canvas);
    // this.score.addLevel(9);
    this.enemy = new RockBlock(canvas, debug)
    this.redBlockHandler = new RedBlockHandler(canvas, debug);
    this.throwerHandler = new ThrowerHandler(canvas, this.char, this.floor, debug);
    this.billHandler = new BillHandler(canvas, this.char, debug);
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
    this.classFather.background.update(this.speed);
    this.classFather.enemy.update(this.speed);
    this.classFather.floor.update(this.speed);
    this.classFather.redBlockHandler.update(this.speed);
  }

  render() {
    this.classFather.background.render();
    this.classFather.enemy.render();
    this.classFather.floor.render();
    this.classFather.char.render();
    this.classFather.redBlockHandler.render();
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
    this.topImpactSound = new Sound("./sounds/SFX_Top_Impact.wav");
    this.classFather = father;
    this.clearFase = false;
    this.currentTimeScore = 0;
    this.waitTimeScore = 5;
    this.reset();
  }

  update() {
    this.classFather.background.update(this.speed);
    this.classFather.enemy.update(this.speed);
    this.classFather.billHandler.update(this.speed);
    this.classFather.throwerHandler.update(this.speed);
    this.classFather.char.update(this.speed);
    this.classFather.redBlockHandler.update(this.speed);
    this.classFather.floor.update(this.speed);

    this.iscollided();

    this.currentTimeScore = ++this.currentTimeScore % this.waitTimeScore;
    if (this.currentTimeScore === 0) {
      this.classFather.score.addScore(1);
      if (this.classFather.score.getScore() % 100 === 0) {
        this.speed += 0.25;
        this.classFather.billHandler.updateRateSpawn(this.classFather.score.getLevel());
        this.classFather.throwerHandler.updateRateSpawn(this.classFather.score.getLevel());
        this.classFather.score.addLevel(1, this.classFather.music);
      }
    }
  }

  render() {
    this.classFather.background.render();
    this.classFather.enemy.render();
    this.classFather.char.render();
    this.classFather.billHandler.render();
    this.classFather.throwerHandler.render();
    this.classFather.redBlockHandler.render();
    this.classFather.floor.render();
    this.classFather.score.render();
  }

  click() {
    if (!this.stoped) {
      this.classFather.char.click();
    }
  }

  reset() {
    this.speed = 2;
    this.stoped = false;
    this.clearFase = false;
    if (this.classFather.canvas.width < this.classFather.canvas.height) {
      this.speed = this.speed / 2;
    }
  }

  stopGame() {
    this.impactSound.play();
    this.classFather.music.stop();
    this.classFather.char.magnetFixingSound.stop();
    console.log("Speed:", this.speed);
    this.speed = 0;
    this.stoped = true;

    this.classFather.score.print();

    this.classFather.activateGameoverScreen();
  }

  iscollided() {
    if (this.classFather.char.posY < 0) {
      this.classFather.char.posY = 0;
      this.classFather.char.setFall();
      if (this.classFather.char.speedY < 0) {
        this.classFather.char.speedY = 0;
      }
      this.topImpactSound.play();
      console.log("Collision - Collided with the top");
    }

    for (let index = 0; index < this.classFather.redBlockHandler.redblockList.length; index++) {
      const element = this.classFather.redBlockHandler.redblockList[index];

      if (element.posX > this.classFather.char.getEndPosX()) {
        break;
      }

      if (isCollision(this.classFather.char, element) && this.classFather.char.isFall()) {
        this.classFather.char.posY = (element.getEndPosY() - 14);
        if (this.classFather.char.speedY < 0) {
          this.classFather.char.speedY = 0;
        }
        this.topImpactSound.play();
        console.log("Collision - Collided with redblock");
        break;
      }

      if (isMagnetCollision(this.classFather.char, element) && !this.classFather.char.isFall()) {
        this.classFather.char.setFixed();
        this.classFather.char.posY = (element.getEndPosY() - 3);
        break;
      }
    }

    if (isCollision(this.classFather.char, this.classFather.floor)) {
      console.log("Collision - Collided with the lava");
      this.stopGame();
    }

    this.classFather.billHandler.billList.forEach(bill => {
      if (isCollision(this.classFather.char, bill)) {
        console.log("Collision - Collided with the bill");
        this.stopGame();
      }
    });

    this.classFather.throwerHandler.throwerList.forEach(thrower => {
      if (isCollision(this.classFather.char, thrower)) {
        console.log("Collision - Collided with the thrower");
        this.stopGame();
      }
    });

    this.classFather.throwerHandler.rockBlockList.forEach(rockBlock => {
      if (isCollision(this.classFather.char, rockBlock)) {
        console.log("Collision - Collided with the rockBlock");
        this.stopGame();
      }
    });

    this.classFather.throwerHandler.largeEggList.forEach(largeEgg => {
      if (isCollision(this.classFather.char, largeEgg)) {
        console.log("Collision - Collided with the largeEgg");
        this.stopGame();
      }
    });
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
    this.classFather.billHandler.render();
    this.classFather.throwerHandler.render();
    this.classFather.redBlockHandler.render();
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
    this.classFather.billHandler.reset();
    this.classFather.throwerHandler.reset();
    this.classFather.gameScreen.reset()

    this.startSound.play();
    this.classFather.music.resetSpeed();
    this.classFather.music.play();
    this.sleepTime = 30;
    this.classFather.activateGameScreen()
  }
}

class Win {
  constructor(father) {
    this.winSonund;
    this.classFather = father;
    this.sleepTime = 100;
  }
  update() { }
  render() { }
  click() { }
}